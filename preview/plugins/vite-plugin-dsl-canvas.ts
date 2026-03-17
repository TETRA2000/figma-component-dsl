import type { Plugin } from 'vite';
import { createHash } from 'crypto';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname2 = dirname(fileURLToPath(import.meta.url));

interface CanvasRenderResponse {
  dataUrl: string;
  width: number;
  height: number;
}

export function dslCanvasPlugin(): Plugin {
  let rendererInitialized = false;
  const renderCache = new Map<string, CanvasRenderResponse>();

  async function ensureRenderer(): Promise<void> {
    if (rendererInitialized) return;
    const { initializeRenderer } = await import('@figma-dsl/renderer');
    const fontDir = join(__dirname2, '../../packages/dsl-core/fonts');
    initializeRenderer(fontDir);
    rendererInitialized = true;
  }

  return {
    name: 'vite-plugin-dsl-canvas',

    configureServer(server) {
      server.middlewares.use('/api/dsl-canvas/render', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk: Buffer) => { body += chunk.toString(); });
        req.on('end', async () => {
          try {
            const { dsl, scale = 1 } = JSON.parse(body);
            if (!dsl || !dsl.type || !dsl.size) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Invalid DSL JSON' }));
              return;
            }

            await ensureRenderer();

            // Check cache
            const cacheKey = createHash('sha256').update(body).digest('hex');
            const cached = renderCache.get(cacheKey);
            if (cached) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(cached));
              return;
            }

            const { render } = await import('@figma-dsl/renderer');
            const result = render(dsl, { scale });
            const dataUrl = `data:image/png;base64,${result.pngBuffer.toString('base64')}`;

            const response: CanvasRenderResponse = {
              dataUrl,
              width: result.width,
              height: result.height,
            };

            renderCache.set(cacheKey, response);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response));
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err instanceof Error ? err.message : String(err) }));
          }
        });
      });
    },

    handleHotUpdate({ file }) {
      if (file.endsWith('.dsl.ts')) {
        // Invalidate cache when DSL files change
        renderCache.clear();
      }
    },
  };
}
