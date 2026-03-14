/**
 * Figma plugin entry point.
 * Loads bundled DSL code and executes it with the real Figma Plugin API.
 */

import { createPluginApi } from './shim.js';

// Show the UI
figma.showUI(__html__, { width: 400, height: 300 });

figma.ui.onmessage = async (msg: { type: string; code?: string }) => {
  if (msg.type === 'run-dsl') {
    const api = createPluginApi();
    const errors: Array<{ nodeName: string; nodeType: string; error: string }> = [];

    // Create or find the "Component Library" page
    let libPage = figma.root.findOne(
      (n) => n.type === 'PAGE' && n.name === 'Component Library'
    ) as PageNode | null;
    if (!libPage) {
      libPage = figma.createPage();
      libPage.name = 'Component Library';
    }
    await figma.setCurrentPageAsync(libPage);

    try {
      // Execute the bundled DSL code
      // The bundle is expected to export an async main(api) function
      const fn = new Function('api', 'figma', `return (${msg.code})(api, figma);`);
      const result = await fn(api, figma);

      // Collect created component IDs
      const componentMap: Record<string, string> = {};
      for (const child of libPage.children) {
        if (child.type === 'COMPONENT' || child.type === 'COMPONENT_SET') {
          componentMap[child.name] = child.id;
        }
      }

      figma.ui.postMessage({
        type: 'result',
        componentMap,
        errors,
      });
      figma.notify(`Created ${Object.keys(componentMap).length} components`);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      errors.push({ nodeName: 'root', nodeType: 'PLUGIN', error: errorMsg });
      figma.ui.postMessage({ type: 'error', errors });
      figma.notify(`Error: ${errorMsg}`, { error: true });
    }
  }
};
