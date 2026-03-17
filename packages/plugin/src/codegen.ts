import type { PluginNodeDef, ComponentIdentity, SourceSnapshots } from '@figma-dsl/core';
import { PLUGIN_DATA_SOURCES } from '@figma-dsl/core';
import type { CodegenContext, CodegenResultEntry, CodegenPreferences, CanvasRegionInfo } from './codegen-types.js';
import { serializeNode as serializeNodeImpl } from './serializer.js';
import type { SerializableNode } from './serializer.js';
import { generateReact } from './codegen-react.js';
import { generateCSS } from './codegen-css.js';
import { generateDSL } from './codegen-dsl.js';
import { generateHTML } from './codegen-html.js';
import { detectCanvasRegions } from './canvas-detector.js';
import type { CanvasRegion } from './canvas-detector.js';
import { captureCanvasImages } from './image-capture.js';
import type { CapturedCanvasImage } from './image-capture.js';

const PLUGIN_DATA_IDENTITY = 'dsl-identity';
const PLUGIN_DATA_BASELINE = 'dsl-baseline';
const PLUGIN_DATA_CANVAS = 'dsl-canvas';
const MAX_DESCENDANTS = 50;

export const MAX_CANVAS_CAPTURES = 3;
export const CANVAS_CAPTURE_SCALE = 1;

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

// --- Canvas detection helpers ---

export function isDslCanvasNode(node: SceneNode): { isCanvas: boolean; canvasName: string | null } {
  if (!('getPluginData' in node)) return { isCanvas: false, canvasName: null };
  try {
    const data = node.getPluginData(PLUGIN_DATA_CANVAS);
    if (!data) return { isCanvas: false, canvasName: null };
    const parsed = JSON.parse(data) as { isCanvas?: boolean; canvasName?: string };
    if (parsed.isCanvas === true) {
      return { isCanvas: true, canvasName: parsed.canvasName ?? null };
    }
  } catch { /* ignore */ }
  return { isCanvas: false, canvasName: null };
}

export function toCanvasRegionInfos(regions: CanvasRegion[]): CanvasRegionInfo[] {
  return regions.map(r => ({
    canvasName: r.canvasName,
    nodeId: r.node.id,
    width: r.node.width,
    height: r.node.height,
  }));
}

/** Convert Uint8Array PNG bytes to a base64 data URI string */
export function pngToDataUri(pngBytes: Uint8Array): string {
  // Build base64 from Uint8Array without relying on figma.base64Encode signature
  let binary = '';
  for (let i = 0; i < pngBytes.length; i++) {
    binary += String.fromCharCode(pngBytes[i]!);
  }
  // Use btoa which is available in the Figma plugin sandbox (V8-based)
  const base64 = btoa(binary);
  return `data:image/png;base64,${base64}`;
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
      unit: unitPref === 'SCALED' ? 'rem' : 'px',
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
    case 'html': return 'HTML Preview';
    default: return language;
  }
}

function routeToGenerator(language: string, context: CodegenContext): CodegenResultEntry[] {
  switch (language) {
    case 'react': return generateReact(context);
    case 'css': return generateCSS(context);
    case 'dsl': return generateDSL(context);
    case 'html': return generateHTML(context);
    default:
      return [{
        title: 'Error',
        language: 'PLAINTEXT',
        code: `Unsupported language: ${language}`,
      }];
  }
}

// --- Main dispatcher ---

export async function handleCodegenEvent(event: CodegenEvent): Promise<CodegenResult[]> {
  try {
    const node = event.node;
    const language = event.language;

    // Tier 1: Source-first path (not applicable to html language)
    const sources = findSourceSnapshots(node);
    if (sources && language !== 'html') {
      const storedSource = getStoredSource(sources, language);
      if (storedSource) {
        return [{
          title: getLanguageLabel(language),
          language: (language === 'css' ? 'CSS' : 'TYPESCRIPT') as CodegenResult['language'],
          code: storedSource,
        }];
      }
    }

    // Detect canvas regions
    const canvasCheck = isDslCanvasNode(node);
    let canvasRegions: CanvasRegionInfo[] = [];
    let detectedRegions: CanvasRegion[] = [];

    if (canvasCheck.isCanvas) {
      // Directly selected node is a DslCanvas
      canvasRegions = [{
        canvasName: canvasCheck.canvasName ?? node.name,
        nodeId: node.id,
        width: 'width' in node ? (node as FrameNode).width : 0,
        height: 'height' in node ? (node as FrameNode).height : 0,
      }];
      detectedRegions = [{
        node: node as unknown as import('./canvas-detector.js').CanvasDetectableNode,
        canvasName: canvasCheck.canvasName ?? node.name,
      }];
    } else if ('children' in node) {
      // Detect canvas regions in children
      detectedRegions = detectCanvasRegions(
        node as unknown as import('./canvas-detector.js').CanvasDetectableComponent,
      );
      canvasRegions = toCanvasRegionInfos(detectedRegions);
    }

    // Capture canvas images for HTML language only
    let canvasImages: ReadonlyMap<string, CapturedCanvasImage> | null = null;
    if (language === 'html' && detectedRegions.length > 0) {
      const regionsToCapture = detectedRegions.slice(0, MAX_CANVAS_CAPTURES);
      canvasImages = await captureCanvasImages(regionsToCapture, {
        scale: CANVAS_CAPTURE_SCALE,
      });
    }

    // Tier 2: Structural inference (fallback)
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
      canvasRegions,
      canvasImages,
    };

    return routeToGenerator(language, context) as CodegenResult[];
  } catch (err) {
    // Error boundary: never throw from generate callback
    const message = err instanceof Error ? err.message : String(err);
    return [{
      title: 'Error',
      language: 'PLAINTEXT' as const,
      code: `Code generation failed: ${message}`,
    }];
  }
}

// --- Registration ---

export function registerCodegenHandler(): void {
  figma.codegen.on('generate', handleCodegenEvent);
}
