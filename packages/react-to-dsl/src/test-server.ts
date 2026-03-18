/**
 * Minimal HTTP server that serves generated test pages as rendered React
 * components. Each `.tsx` test page is transformed to JS via esbuild and
 * wrapped in a self-contained HTML shell that loads React from a CDN.
 */

import { createServer, type IncomingMessage, type ServerResponse } from 'http';
import type { Server } from 'http';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { transformSync } from 'esbuild';
import { buildRegistry, type TestPageEntry } from './test-registry.js';

export interface TestServerOptions {
  /** Directory containing test page .tsx files */
  testPagesDir: string;
  /** Port to listen on (default: 3456) */
  port?: number;
}

// ---------------------------------------------------------------------------
// HTML templates
// ---------------------------------------------------------------------------

/**
 * Inline minimal React shim that creates real DOM elements.
 * This avoids needing to load React from a CDN, making the test
 * server work in offline / sandboxed environments.
 */
const REACT_SHIM = `
var React = {
  createElement: function(tag, props) {
    var children = Array.prototype.slice.call(arguments, 2);
    if (typeof tag === 'function') {
      var p = props || {};
      p.children = children.length === 1 ? children[0] : children.length ? children : undefined;
      return tag(p);
    }
    var el = document.createElement(tag);
    if (props) {
      Object.keys(props).forEach(function(key) {
        if (key === 'style' && typeof props[key] === 'object') {
          var unitless = {opacity:1,flexGrow:1,flexShrink:1,fontWeight:1,lineHeight:1,zIndex:1,order:1,orphans:1,widows:1,columns:1,flex:1};
          var styleObj = props[key];
          Object.keys(styleObj).forEach(function(sk) {
            var sv = styleObj[sk];
            el.style[sk] = (typeof sv === 'number' && !unitless[sk]) ? sv + 'px' : sv;
          });
        } else if (key === 'className') {
          el.className = props[key];
        } else if (key === 'dangerouslySetInnerHTML') {
          el.innerHTML = props[key].__html;
        } else if (key.startsWith('on')) {
          // skip event handlers
        } else if (key === 'children') {
          // handled below
        } else {
          el.setAttribute(key === 'htmlFor' ? 'for' : key.replace(/([A-Z])/g, function(m) { return '-' + m.toLowerCase(); }), props[key]);
        }
      });
    }
    function appendChildren(parent, ch) {
      if (ch == null || ch === false || ch === true) return;
      if (Array.isArray(ch)) {
        ch.forEach(function(c) { appendChildren(parent, c); });
      } else if (typeof ch === 'object' && ch.nodeType) {
        parent.appendChild(ch);
      } else {
        parent.appendChild(document.createTextNode(String(ch)));
      }
    }
    appendChildren(el, children);
    return el;
  },
  Fragment: function(props) {
    var frag = document.createDocumentFragment();
    if (props && props.children) {
      var ch = Array.isArray(props.children) ? props.children : [props.children];
      ch.forEach(function(c) {
        if (c != null && c !== false && c !== true) {
          if (typeof c === 'object' && (c.nodeType === 1 || c.nodeType === 11)) {
            frag.appendChild(c);
          } else {
            frag.appendChild(document.createTextNode(String(c)));
          }
        }
      });
    }
    return frag;
  }
};
var ReactDOM = {
  createRoot: function(container) {
    return {
      render: function(element) {
        if (element && element.nodeType) {
          container.appendChild(element);
        }
      }
    };
  }
};
`;

function buildPageHtml(componentCode: string, title: string): string {
  return `<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<style>* { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: Inter, system-ui, sans-serif; }</style>
</head><body>
<div id="root"></div>
<script>
${REACT_SHIM}
${componentCode}
var root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(Component));
</script>
</body></html>`;
}

function buildIndexHtml(entries: TestPageEntry[]): string {
  const byCategory = new Map<string, TestPageEntry[]>();
  for (const entry of entries) {
    let list = byCategory.get(entry.category);
    if (!list) {
      list = [];
      byCategory.set(entry.category, list);
    }
    list.push(entry);
  }

  const sections: string[] = [];
  for (const [category, items] of byCategory) {
    const links = items
      .map(
        (e) =>
          `<li><a href="${escapeHtml(e.urlPath)}">${escapeHtml(e.name)}</a> — ${escapeHtml(e.description)}</li>`,
      )
      .join('\n');
    sections.push(
      `<h2>${escapeHtml(category)} (${items.length})</h2>\n<ul>${links}</ul>`,
    );
  }

  return `<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
<title>Test Pages Index</title>
<style>
  body { font-family: Inter, system-ui, sans-serif; max-width: 960px; margin: 2rem auto; padding: 0 1rem; }
  h1 { margin-bottom: 1rem; }
  h2 { margin-top: 1.5rem; margin-bottom: 0.5rem; }
  ul { list-style: none; padding: 0; }
  li { padding: 0.2rem 0; }
  a { color: #0066cc; text-decoration: none; }
  a:hover { text-decoration: underline; }
</style>
</head><body>
<h1>React-to-DSL Test Pages (${entries.length})</h1>
${sections.join('\n')}
</body></html>`;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Transform a TSX source file to an IIFE that exposes the default export as
 * `Component`.
 */
function transformTsx(tsxCode: string): string {
  const result = transformSync(tsxCode, {
    loader: 'tsx',
    format: 'iife',
    globalName: '__module',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    // Avoid referencing node built-ins; test pages are browser-only
    platform: 'browser',
    target: 'es2020',
  });

  // The IIFE assigns to `var __module = ...`.  The default export lives at
  // `__module.default` (esbuild IIFE convention).  Provide a top-level
  // `Component` binding that works with our HTML template.
  return `${result.code}\nvar Component = __module && __module.default ? __module.default : __module;`;
}

function send(
  res: ServerResponse,
  status: number,
  contentType: string,
  body: string,
): void {
  res.writeHead(status, {
    'Content-Type': contentType,
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

// ---------------------------------------------------------------------------
// Server
// ---------------------------------------------------------------------------

/**
 * Start a test server that serves generated test pages as rendered React.
 */
export async function startTestServer(
  options: TestServerOptions,
): Promise<{ server: Server; port: number; stop: () => Promise<void> }> {
  const { testPagesDir, port = 3456 } = options;

  // Build the registry once at startup.
  const registry = buildRegistry();
  const byName = new Map<string, TestPageEntry>();
  for (const entry of registry) {
    byName.set(entry.name, entry);
  }

  const indexHtml = buildIndexHtml(registry);

  function handleRequest(req: IncomingMessage, res: ServerResponse): void {
    const url = req.url ?? '/';

    // ----- Health check -----
    if (url === '/health') {
      send(res, 200, 'text/plain', 'OK');
      return;
    }

    // ----- Index page -----
    if (url === '/' || url === '/index.html') {
      send(res, 200, 'text/html; charset=utf-8', indexHtml);
      return;
    }

    // ----- Test page: /test/:name -----
    const match = /^\/test\/([a-z0-9-]+)$/.exec(url);
    if (match) {
      const name = match[1]!;
      const entry = byName.get(name);
      if (!entry) {
        send(res, 404, 'text/plain', `Unknown test page: ${name}`);
        return;
      }

      const filePath = join(testPagesDir, entry.filePath);
      if (!existsSync(filePath)) {
        send(
          res,
          404,
          'text/plain',
          `Test page file not found: ${entry.filePath}`,
        );
        return;
      }

      try {
        const tsxCode = readFileSync(filePath, 'utf-8');
        const jsCode = transformTsx(tsxCode);
        const html = buildPageHtml(jsCode, entry.name);
        send(res, 200, 'text/html; charset=utf-8', html);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : String(err);
        send(
          res,
          500,
          'text/plain',
          `Failed to transform ${entry.filePath}: ${message}`,
        );
      }
      return;
    }

    send(res, 404, 'text/plain', 'Not found');
  }

  const server = createServer(handleRequest);

  const actualPort = await new Promise<number>((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, () => {
      const addr = server.address();
      if (addr && typeof addr === 'object') {
        resolve(addr.port);
      } else {
        resolve(port);
      }
    });
  });

  const stop = (): Promise<void> =>
    new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });

  return { server, port: actualPort, stop };
}
