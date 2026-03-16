import type { PluginNodeDef, ComponentIdentity, SourceSnapshots } from '@figma-dsl/core';
import { PLUGIN_DATA_SOURCES } from '@figma-dsl/core';
import type { CodegenContext, CodegenResultEntry, CodegenPreferences } from './codegen-types.js';
import { serializeNode as serializeNodeImpl } from './serializer.js';
import type { SerializableNode } from './serializer.js';
import { generateReact } from './codegen-react.js';
import { generateCSS } from './codegen-css.js';
import { generateDSL } from './codegen-dsl.js';

const PLUGIN_DATA_IDENTITY = 'dsl-identity';
const PLUGIN_DATA_BASELINE = 'dsl-baseline';
const MAX_DESCENDANTS = 50;

// --- Source-first path helpers ---

export function findSourceSnapshots(node: SceneNode): SourceSnapshots | null {
  let current: BaseNode | null = node;
  while (current) {
    if ('getPluginData' in current) {
      const data = (current as SceneNode).getPluginData(PLUGIN_DATA_SOURCES);
      if (data) {
        try {
          return JSON.parse(data) as SourceSnapshots;
        } catch {
          // Invalid JSON, continue walking
        }
      }
    }
    current = current.parent;
  }
  return null;
}

export function getStoredSource(sources: SourceSnapshots, language: string): string | undefined {
  switch (language) {
    case 'react': return sources.react;
    case 'css': return sources.css;
    case 'dsl': return sources.dsl;
    default: return undefined;
  }
}

// --- Fallback path helpers ---

export function serializeWithDepthLimit(
  node: SceneNode,
  maxDescendants: number,
): { def: PluginNodeDef; truncated: boolean } {
  let count = 0;
  let truncated = false;

  function serializeRecursive(n: SceneNode): PluginNodeDef {
    count++;
    if (count > maxDescendants) {
      truncated = true;
      // Return a minimal node without children
      return {
        type: n.type,
        name: n.name,
        size: { x: 'width' in n ? (n as FrameNode).width : 0, y: 'height' in n ? (n as FrameNode).height : 0 },
        opacity: 'opacity' in n ? (n as FrameNode).opacity : 1,
        visible: n.visible,
        children: [],
      };
    }
    return serializeNodeImpl(n as unknown as SerializableNode);
  }

  const def = serializeRecursive(node);
  return { def, truncated };
}

function readPreferences(): CodegenPreferences {
  try {
    const prefs = figma.codegen.preferences;
    const unitPref = prefs.unit;
    const scaleFactor = prefs.scaleFactor ?? 16;

    // Determine naming preference from select preferences
    let naming: 'camelCase' | 'kebab-case' = 'camelCase';
    if ('naming' in prefs) {
      const val = (prefs as Record<string, unknown>).naming;
      if (val === 'kebab-case') naming = 'kebab-case';
    }

    return {
      unit: unitPref === 'rem' ? 'rem' : 'px',
      scaleFactor,
      naming,
    };
  } catch {
    return { unit: 'px', scaleFactor: 16, naming: 'camelCase' };
  }
}

function readIdentity(node: SceneNode): ComponentIdentity | null {
  try {
    const data = node.getPluginData(PLUGIN_DATA_IDENTITY);
    if (data) return JSON.parse(data) as ComponentIdentity;
  } catch { /* ignore */ }
  return null;
}

function readBaseline(node: SceneNode): PluginNodeDef | null {
  try {
    const data = node.getPluginData(PLUGIN_DATA_BASELINE);
    if (data) return JSON.parse(data) as PluginNodeDef;
  } catch { /* ignore */ }
  return null;
}

function getLanguageLabel(language: string): string {
  switch (language) {
    case 'react': return 'React TSX';
    case 'css': return 'CSS Module';
    case 'dsl': return 'DSL Definition';
    default: return language;
  }
}

function routeToGenerator(language: string, context: CodegenContext): CodegenResultEntry[] {
  switch (language) {
    case 'react': return generateReact(context);
    case 'css': return generateCSS(context);
    case 'dsl': return generateDSL(context);
    default:
      return [{
        title: 'Error',
        language: 'PLAINTEXT',
        code: `Unsupported language: ${language}`,
      }];
  }
}

// --- Main dispatcher ---

export function handleCodegenEvent(event: CodegenEvent): CodegenResult[] {
  try {
    const node = event.node;
    const language = event.language;

    // Tier 1: Source-first path
    const sources = findSourceSnapshots(node);
    if (sources) {
      const storedSource = getStoredSource(sources, language);
      if (storedSource) {
        return [{
          title: getLanguageLabel(language),
          language: language === 'css' ? 'CSS' : 'TYPESCRIPT',
          code: storedSource,
        }];
      }
    }

    // Tier 2: Structural inference fallback
    const identity = readIdentity(node);
    const baseline = readBaseline(node);
    const preferences = readPreferences();
    const { def, truncated } = serializeWithDepthLimit(node, MAX_DESCENDANTS);

    const context: CodegenContext = {
      node: def,
      identity,
      baseline,
      sources: sources ?? null,
      preferences,
      truncated,
    };

    return routeToGenerator(language, context);
  } catch (err) {
    // Error boundary: never throw from generate callback
    const message = err instanceof Error ? err.message : String(err);
    return [{
      title: 'Error',
      language: 'PLAINTEXT',
      code: `Code generation failed: ${message}`,
    }];
  }
}

// --- Registration ---

export function registerCodegenHandler(): void {
  figma.codegen.on('generate', handleCodegenEvent);
}
