import type { CompileResult, FigmaNodeDict } from '../../../compiler/src/types.js';

// --- PluginInput types ---

export interface PluginInput {
  schemaVersion: string;
  targetPage: string;
  components: PluginComponent[];
}

export interface PluginComponent {
  name: string;
  node: FigmaNodeDict;
  properties?: Record<string, { type: string; defaultValue: string | boolean }>;
  variants?: { axes: Record<string, string[]>; children: PluginComponent[] };
  instances?: { componentRef: string; overrides?: Record<string, string | boolean> }[];
}

export interface ExportOptions {
  targetPage?: string;
}

// --- Helpers ---

/**
 * Check whether a compiled node is a COMPONENT, COMPONENT_SET, or INSTANCE.
 */
function isComponentLike(node: FigmaNodeDict): boolean {
  return (
    node.type === 'COMPONENT' ||
    node.type === 'COMPONENT_SET' ||
    node.type === 'INSTANCE'
  );
}

/**
 * Build a PluginComponent from a COMPONENT node.
 */
function buildComponentEntry(node: FigmaNodeDict): PluginComponent {
  const entry: PluginComponent = {
    name: node.name,
    node,
  };

  if (
    node.componentPropertyDefinitions &&
    Object.keys(node.componentPropertyDefinitions).length > 0
  ) {
    entry.properties = node.componentPropertyDefinitions;
  }

  return entry;
}

/**
 * Derive variant axes from the children of a COMPONENT_SET.
 * Each child COMPONENT is expected to have a name like "Key1=Value1, Key2=Value2".
 */
function deriveVariantAxes(
  children: FigmaNodeDict[],
): Record<string, string[]> {
  const axesMap = new Map<string, Set<string>>();

  for (const child of children) {
    if (child.type !== 'COMPONENT') continue;
    const pairs = child.name.split(',').map((s: string) => s.trim());
    for (const pair of pairs) {
      const eqIndex = pair.indexOf('=');
      if (eqIndex === -1) continue;
      const key = pair.slice(0, eqIndex).trim();
      const value = pair.slice(eqIndex + 1).trim();
      if (!key) continue;
      let set = axesMap.get(key);
      if (!set) {
        set = new Set<string>();
        axesMap.set(key, set);
      }
      set.add(value);
    }
  }

  const axes: Record<string, string[]> = {};
  for (const [key, values] of axesMap) {
    axes[key] = [...values];
  }
  return axes;
}

/**
 * Build a PluginComponent from a COMPONENT_SET node.
 */
function buildComponentSetEntry(node: FigmaNodeDict): PluginComponent {
  const variantChildren = node.children.filter((c: FigmaNodeDict) => c.type === 'COMPONENT');
  const axes = deriveVariantAxes(variantChildren);
  const childEntries = variantChildren.map(buildComponentEntry);

  const entry: PluginComponent = {
    name: node.name,
    node,
    variants: {
      axes,
      children: childEntries,
    },
  };

  return entry;
}

/**
 * Build a PluginComponent from an INSTANCE node.
 * The instance references a component by componentId and may carry overrides.
 */
function buildInstanceEntry(node: FigmaNodeDict): PluginComponent {
  const instance: {
    componentRef: string;
    overrides?: Record<string, string | boolean>;
  } = {
    componentRef: node.componentId ?? '',
  };

  if (
    node.overriddenProperties &&
    Object.keys(node.overriddenProperties).length > 0
  ) {
    instance.overrides = node.overriddenProperties;
  }

  const entry: PluginComponent = {
    name: node.name,
    node,
    instances: [instance],
  };

  return entry;
}

/**
 * Walk the compiled node tree and collect all component-like nodes.
 * COMPONENT_SET children are handled within the set entry, so we skip them
 * when encountered at the top level if they are direct children of a set.
 */
function collectComponents(root: FigmaNodeDict): PluginComponent[] {
  const components: PluginComponent[] = [];
  const visitedGuids = new Set<string>();

  function walk(node: FigmaNodeDict, insideComponentSet: boolean): void {
    const guidKey = `${node.guid[0]},${node.guid[1]}`;

    if (node.type === 'COMPONENT_SET') {
      if (!visitedGuids.has(guidKey)) {
        visitedGuids.add(guidKey);
        components.push(buildComponentSetEntry(node));
        // Mark children as visited so we don't double-collect them
        for (const child of node.children) {
          const childKey = `${child.guid[0]},${child.guid[1]}`;
          visitedGuids.add(childKey);
        }
      }
      return;
    }

    if (node.type === 'COMPONENT' && !insideComponentSet) {
      if (!visitedGuids.has(guidKey)) {
        visitedGuids.add(guidKey);
        components.push(buildComponentEntry(node));
      }
      // Still walk children in case there are nested components
      for (const child of node.children) {
        walk(child, false);
      }
      return;
    }

    if (node.type === 'INSTANCE') {
      if (!visitedGuids.has(guidKey)) {
        visitedGuids.add(guidKey);
        components.push(buildInstanceEntry(node));
      }
      return;
    }

    // For FRAME, GROUP, etc., just recurse into children
    for (const child of node.children) {
      walk(child, false);
    }
  }

  // If the root itself is component-like, handle it
  if (root.type === 'COMPONENT_SET') {
    components.push(buildComponentSetEntry(root));
  } else if (root.type === 'COMPONENT') {
    components.push(buildComponentEntry(root));
    for (const child of root.children) {
      walk(child, false);
    }
  } else if (root.type === 'INSTANCE') {
    components.push(buildInstanceEntry(root));
  } else {
    // Walk children of the root frame
    for (const child of root.children) {
      walk(child, false);
    }
    // If no component-like nodes were found, export the root frame itself
    if (components.length === 0) {
      components.push({
        name: root.name,
        node: root,
      });
    }
  }

  return components;
}

// --- Public API ---

export function exportToPluginInput(
  compileResult: CompileResult,
  options?: ExportOptions,
): PluginInput {
  const targetPage = options?.targetPage ?? 'Component Library';
  const components = collectComponents(compileResult.root);

  return {
    schemaVersion: '1.0',
    targetPage,
    components,
  };
}

export function exportToPluginJson(
  compileResult: CompileResult,
  options?: ExportOptions,
): string {
  const pluginInput = exportToPluginInput(compileResult, options);
  return JSON.stringify(pluginInput, null, 2);
}
