import type { FigmaNodeDict, CompileResult, FigmaPaint } from '@figma-dsl/compiler';
import type { PluginNodeDef, PluginInput } from '@figma-dsl/core';
import { writeFileSync, mkdirSync, readFileSync } from 'fs';
import { dirname, resolve, extname, isAbsolute } from 'path';

export type { PluginNodeDef, PluginInput } from '@figma-dsl/core';

const SIZE_WARNING_THRESHOLD = 4 * 1024 * 1024; // 4 MB

export interface ExportOptions {
  assetDir?: string;
}

function resolveImagePath(src: string, assetDir: string): string {
  if (src.startsWith('https://') || src.startsWith('http://')) {
    return src;
  }
  if (isAbsolute(src)) {
    return src;
  }
  return resolve(assetDir, src);
}

function embedImageData(
  src: string,
  assetDir: string,
): { imageData?: string; imageDimensions?: { width: number; height: number }; imageFormat?: string; imageError?: string } {
  if (src.startsWith('https://') || src.startsWith('http://')) {
    // URLs can't be embedded synchronously — include reference only
    return { imageError: 'URL images not embedded; use local files for embedding' };
  }

  const resolved = resolveImagePath(src, assetDir);

  try {
    const buffer = readFileSync(resolved);
    const ext = extname(resolved).toLowerCase().replace('.', '');
    const format = ext === 'jpg' ? 'jpeg' : ext;
    const base64 = buffer.toString('base64');
    const dataUri = `data:image/${format};base64,${base64}`;

    if (buffer.length > SIZE_WARNING_THRESHOLD) {
      console.warn(`Warning: Image ${src} is ${(buffer.length / 1024 / 1024).toFixed(1)} MB — consider optimizing`);
    }

    return {
      imageData: dataUri,
      imageFormat: format.toUpperCase(),
    };
  } catch {
    return { imageError: `Failed to read image: ${src}` };
  }
}

function convertFillForPlugin(
  p: FigmaPaint,
  assetDir: string,
): Record<string, unknown> {
  const fill: Record<string, unknown> = {
    type: p.type,
    color: p.color,
    opacity: p.opacity,
    gradientStops: p.gradientStops,
    gradientTransform: p.gradientTransform,
  };

  if (p.type === 'IMAGE' && p.imageSrc) {
    fill.imageSrc = p.imageSrc;
    fill.imageScaleMode = p.imageScaleMode;
    const embedded = embedImageData(p.imageSrc, assetDir);
    if (embedded.imageData) fill.imageData = embedded.imageData;
    if (embedded.imageFormat) fill.imageFormat = embedded.imageFormat;
    if (embedded.imageDimensions) fill.imageDimensions = embedded.imageDimensions;
    if (embedded.imageError) fill.imageError = embedded.imageError;
  }

  return fill;
}

function convertToPluginNode(node: FigmaNodeDict, assetDir: string): PluginNodeDef {
  // Build a mutable record then return as readonly PluginNodeDef
  const result: Record<string, unknown> = {
    type: node.type,
    name: node.name,
    size: node.size,
    opacity: node.opacity,
    visible: node.visible,
    children: node.children.map(c => convertToPluginNode(c, assetDir)),
  };

  if (node.fillPaints.length > 0) {
    result.fills = node.fillPaints.map(p => convertFillForPlugin(p, assetDir));
  }

  if (node.strokes?.length) {
    result.strokes = node.strokes.map(s => ({
      color: s.color,
      weight: s.weight,
      align: s.align,
    }));
  }

  if (node.cornerRadius !== undefined) {
    // Clamp corner radius to half the smallest dimension.
    // Canvas 2D roundRect() does this automatically, but Figma does not.
    const maxRadius = Math.min(node.size.x, node.size.y) / 2;
    result.cornerRadius = Math.min(node.cornerRadius, maxRadius);
  }
  if (node.clipContent) result.clipContent = node.clipContent;

  // Auto-layout
  if (node.stackMode) {
    result.stackMode = node.stackMode;
    result.itemSpacing = node.itemSpacing;
    result.paddingTop = node.paddingTop;
    result.paddingRight = node.paddingRight;
    result.paddingBottom = node.paddingBottom;
    result.paddingLeft = node.paddingLeft;
    result.primaryAxisAlignItems = node.primaryAxisAlignItems;
    result.counterAxisAlignItems = node.counterAxisAlignItems;
  }

  if (node.layoutSizingHorizontal) result.layoutSizingHorizontal = node.layoutSizingHorizontal;
  if (node.layoutSizingVertical) result.layoutSizingVertical = node.layoutSizingVertical;

  // Text
  if (node.textData) {
    result.characters = node.textData.characters;
    result.fontSize = node.fontSize;
    result.fontFamily = node.fontFamily;
    result.textAlignHorizontal = node.textAlignHorizontal;
    if (node.textAutoResize) {
      result.textAutoResize = node.textAutoResize;
    }
    if (node.derivedTextData?.fontMetaData[0]) {
      const meta = node.derivedTextData.fontMetaData[0];
      result.fontWeight = meta.fontWeight;
      result.fontStyle = meta.fontStyle;
    }
  }

  // Image node passthrough — embed image data just like IMAGE fills
  if (node.type === 'IMAGE' && node.imageSrc) {
    result.imageSrc = node.imageSrc;
    result.imageScaleMode = node.imageScaleMode;
    const embedded = embedImageData(node.imageSrc, assetDir);
    if (embedded.imageData) result.imageData = embedded.imageData;
    if (embedded.imageFormat) result.imageFormat = embedded.imageFormat;
    if (embedded.imageDimensions) result.imageDimensions = embedded.imageDimensions;
    if (embedded.imageError) result.imageError = embedded.imageError;
  }

  // SVG node passthrough — embed SVG content as text
  if (node.type === 'SVG') {
    if (node.svgContent) {
      result.svgContent = node.svgContent;
    } else if (node.svgSrc) {
      // Read SVG file and embed content
      try {
        const resolvedPath = resolve(assetDir, node.svgSrc);
        result.svgContent = readFileSync(resolvedPath, 'utf-8');
      } catch {
        result.svgContent = undefined;
      }
    }
    if (node.svgScaleMode) result.svgScaleMode = node.svgScaleMode;
  }

  // Component properties
  // Filter out VARIANT properties for standalone COMPONENT nodes — Figma only
  // allows VARIANT properties on COMPONENT_SET nodes.
  if (node.componentPropertyDefinitions) {
    if (node.type === 'COMPONENT') {
      const filtered = Object.fromEntries(
        Object.entries(node.componentPropertyDefinitions).filter(
          ([, v]) => v.type !== 'VARIANT',
        ),
      );
      if (Object.keys(filtered).length > 0) {
        result.componentPropertyDefinitions = filtered;
      }
    } else {
      result.componentPropertyDefinitions = node.componentPropertyDefinitions;
    }
  }

  // Instance
  if (node.componentId) {
    result.componentId = node.componentId;
    result.overriddenProperties = node.overriddenProperties;
  }

  // New node type properties
  if (node.pointCount !== undefined) result.pointCount = node.pointCount;
  if (node.innerRadius !== undefined) result.innerRadius = node.innerRadius;
  if (node.rotation !== undefined) result.rotation = node.rotation;
  if (node.booleanOperation) result.booleanOperation = node.booleanOperation;
  if (node.strokeCap) result.strokeCap = node.strokeCap;
  if (node.sectionContentsHidden !== undefined) result.sectionContentsHidden = node.sectionContentsHidden;

  // Canvas Mode: effects
  if (node.effects?.length) {
    result.effects = node.effects.map(effect => {
      if (effect.type === 'DROP_SHADOW') {
        return {
          type: 'DROP_SHADOW',
          visible: true,
          color: { r: effect.color.r, g: effect.color.g, b: effect.color.b, a: effect.color.a },
          offset: { x: effect.offsetX, y: effect.offsetY },
          radius: effect.blur,
          spread: effect.spread ?? 0,
        };
      }
      // LAYER_BLUR
      return {
        type: 'LAYER_BLUR',
        visible: true,
        radius: effect.radius,
      };
    });
  }

  // Canvas Mode: blendMode
  if (node.blendMode) {
    result.blendMode = node.blendMode;
  }

  // Canvas Mode: text style extensions
  if (node.textTransform) result.textTransform = node.textTransform;
  if (node.textStroke) result.textStroke = node.textStroke;
  if (node.textShadow) result.textShadow = node.textShadow;

  return result as unknown as PluginNodeDef;
}

export function generatePluginInput(
  compileResult: CompileResult,
  pageName = 'Component Library',
  options?: ExportOptions,
): PluginInput {
  const assetDir = options?.assetDir ?? process.cwd();
  const rootNode = convertToPluginNode(compileResult.root, assetDir);

  // Extract top-level components or treat root as single component
  const components = rootNode.type === 'COMPONENT_SET'
    ? [rootNode]
    : rootNode.type === 'COMPONENT'
      ? [rootNode]
      : [rootNode];

  const result: PluginInput = {
    schemaVersion: '1.0.0',
    targetPage: pageName,
    components,
    mode: compileResult.mode === 'canvas' ? 'canvas' : undefined,
  };

  return result;
}

export function exportToFile(
  compileResult: CompileResult,
  outputPath: string,
  pageName?: string,
  options?: ExportOptions,
): PluginInput {
  const pluginInput = generatePluginInput(compileResult, pageName, options);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, JSON.stringify(pluginInput, null, 2));
  return pluginInput;
}
