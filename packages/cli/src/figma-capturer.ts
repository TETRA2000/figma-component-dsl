import { mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join, resolve } from 'path';
import { PNG } from 'pngjs';

export interface FigmaCaptureOptions {
  outputDir: string;
  fileKey: string;
  token: string;
  nodeIdMap: Record<string, string>;
  scale?: number;
}

export interface FigmaCaptureResult {
  capturedImages: Array<{
    componentName: string;
    imagePath: string;
    dimensions: { width: number; height: number };
  }>;
  missingComponents: string[];
}

async function fetchWithRetry(
  url: string,
  headers: Record<string, string>,
  maxRetries = 3,
): Promise<Response> {
  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, { headers });

      if (response.status === 403) {
        throw new Error(`Figma API auth error (403): Check your personal access token`);
      }

      if (response.status === 429) {
        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt + 1) * 1000;
          console.log(`  [figma] Rate limited, retrying in ${delay / 1000}s...`);
          await new Promise(r => setTimeout(r, delay));
          continue;
        }
        throw new Error('Figma API rate limit exceeded after retries');
      }

      if (!response.ok) {
        throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
      }

      return response;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (err instanceof Error && err.message.includes('auth error')) {
        throw err;
      }
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt + 1) * 1000;
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
    }
  }

  throw lastError ?? new Error('Fetch failed');
}

export async function captureFigmaImages(
  options: FigmaCaptureOptions,
): Promise<FigmaCaptureResult> {
  mkdirSync(options.outputDir, { recursive: true });

  const entries = Object.entries(options.nodeIdMap);
  if (entries.length === 0) {
    throw new Error('nodeIdMap is empty — no components to capture');
  }

  const headers = {
    'X-Figma-Token': options.token,
  };

  // Batch all node IDs in one request
  const nodeIds = entries.map(([, id]) => id).join(',');
  const scale = options.scale ?? 1;
  const apiUrl = `https://api.figma.com/v1/images/${options.fileKey}?ids=${encodeURIComponent(nodeIds)}&format=png&scale=${scale}`;

  console.log(`  [figma] Requesting ${entries.length} images from Figma API...`);
  const response = await fetchWithRetry(apiUrl, headers);
  const data = await response.json() as {
    images: Record<string, string | null>;
    err: string | null;
  };

  if (data.err) {
    throw new Error(`Figma API returned error: ${data.err}`);
  }

  const capturedImages: FigmaCaptureResult['capturedImages'] = [];
  const missingComponents: string[] = [];

  for (const [componentName, nodeId] of entries) {
    const imageUrl = data.images[nodeId];
    if (!imageUrl) {
      missingComponents.push(componentName);
      console.log(`  [figma] Missing: ${componentName} (node ${nodeId})`);
      continue;
    }

    try {
      const imgResponse = await fetchWithRetry(imageUrl, {});
      const buffer = Buffer.from(await imgResponse.arrayBuffer());
      const imagePath = join(options.outputDir, `${componentName}.png`);
      writeFileSync(imagePath, buffer);

      // Read dimensions from PNG
      const png = PNG.sync.read(buffer);

      capturedImages.push({
        componentName,
        imagePath,
        dimensions: { width: png.width, height: png.height },
      });

      console.log(`  [figma] Captured: ${componentName} (${png.width}×${png.height})`);
    } catch (err) {
      missingComponents.push(componentName);
      console.error(`  [figma] Error downloading ${componentName}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  return { capturedImages, missingComponents };
}

export function loadNodeIdMap(path: string): Record<string, string> {
  const content = readFileSync(resolve(path), 'utf-8');
  return JSON.parse(content) as Record<string, string>;
}
