import type {
  DslSceneNode,
  DslFrameNode,
  DslTextNode,
  DslComponentNode,
  DslInstanceNode,
  DslPaint,
  DslSolidPaint,
  DslGradientPaint,
  DslLineHeight,
} from './types.js';

// --- Output Types ---

export interface FigmaPaintOut {
  type: string;
  color?: { r: number; g: number; b: number; a: number };
  gradientStops?: Array<{ color: { r: number; g: number; b: number; a: number }; position: number }>;
  gradientTransform?: [[number, number, number], [number, number, number]];
  opacity?: number;
}

export interface Baseline {
  lineY: number;
  lineHeight: number;
  firstCharIndex: number;
  endCharIndex: number;
}

export interface FontMeta {
  fontFamily: string;
  fontStyle: string;
  fontWeight: number;
  fontSize: number;
}

export interface FigmaNodeDict {
  guid: [number, number];
  type: string;
  name: string;
  size: { x: number; y: number };
  transform: [[number, number, number], [number, number, number], [number, number, number]];
  fillPaints: FigmaPaintOut[];
  strokes?: FigmaPaintOut[];
  strokeWeight?: number;
  cornerRadius?: number;
  topLeftRadius?: number;
  topRightRadius?: number;
  bottomLeftRadius?: number;
  bottomRightRadius?: number;
  opacity: number;
  visible: boolean;
  clipContent?: boolean;
  children: FigmaNodeDict[];
  parentIndex?: { guid: [number, number]; position: string };

  stackMode?: 'HORIZONTAL' | 'VERTICAL';
  itemSpacing?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  primaryAxisAlignItems?: 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN';
  counterAxisAlignItems?: 'MIN' | 'CENTER' | 'MAX';

  textData?: { characters: string; lines: string[] };
  derivedTextData?: { baselines: Baseline[]; fontMetaData: FontMeta[] };
  fontSize?: number;
  fontFamily?: string;
  textAlignHorizontal?: 'LEFT' | 'CENTER' | 'RIGHT';
  letterSpacing?: { value: number; unit: string };

  componentPropertyDefinitions?: Record<string, { type: string; defaultValue: string | boolean }>;
  componentId?: string;
  overriddenProperties?: Record<string, string | boolean>;
}

export interface CompileError {
  message: string;
  nodePath: string;
  nodeType: string;
}

export interface CompileResult {
  root: FigmaNodeDict;
  nodeCount: number;
  errors: CompileError[];
}

// --- Helpers ---

type Transform3x3 = [[number, number, number], [number, number, number], [number, number, number]];

function identityTransform(): Transform3x3 {
  return [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
}

function translateTransform(tx: number, ty: number): Transform3x3 {
  return [[1, 0, tx], [0, 1, ty], [0, 0, 1]];
}

function composeTransforms(parent: Transform3x3, child: Transform3x3): Transform3x3 {
  // Simple 2D translation composition: just add the offsets
  return [
    [1, 0, parent[0][2] + child[0][2]],
    [0, 1, parent[1][2] + child[1][2]],
    [0, 0, 1],
  ];
}

function convertPaint(paint: DslPaint): FigmaPaintOut {
  if (paint.type === 'SOLID') {
    const sp = paint as DslSolidPaint;
    return {
      type: 'SOLID',
      color: { r: sp.color.r, g: sp.color.g, b: sp.color.b, a: 1 },
      opacity: sp.opacity,
    };
  }
  const gp = paint as DslGradientPaint;
  return {
    type: 'GRADIENT_LINEAR',
    gradientStops: gp.gradientStops,
    gradientTransform: gp.gradientTransform,
    opacity: gp.opacity,
  };
}

function isFrameLike(node: DslSceneNode): node is DslFrameNode {
  return node.type === 'FRAME' || node.type === 'COMPONENT' ||
    node.type === 'COMPONENT_SET' || node.type === 'INSTANCE';
}

function isTextNode(node: DslSceneNode): node is DslTextNode {
  return node.type === 'TEXT';
}

function isComponentNode(node: DslSceneNode): node is DslComponentNode {
  return node.type === 'COMPONENT';
}

function isInstanceNode(node: DslSceneNode): node is DslInstanceNode {
  return node.type === 'INSTANCE';
}

function hasAutoLayout(node: DslFrameNode): boolean {
  return node.layoutMode === 'HORIZONTAL' || node.layoutMode === 'VERTICAL';
}

function getEffectiveSizing(
  child: DslSceneNode,
  axis: 'horizontal' | 'vertical',
  parentIsHug: boolean,
): 'FIXED' | 'HUG' | 'FILL' {
  if (!isFrameLike(child)) return 'FIXED';
  const sizing = axis === 'horizontal'
    ? child.layoutSizingHorizontal
    : child.layoutSizingVertical;
  if (sizing === 'FILL' && parentIsHug) return 'HUG';
  return sizing;
}

function weightToStyle(weight: number): string {
  if (weight <= 400) return 'Regular';
  if (weight <= 500) return 'Medium';
  if (weight <= 600) return 'Semi Bold';
  return 'Bold';
}

function resolveLineHeight(lh: DslLineHeight, fontSize: number): number {
  if ('unit' in lh && lh.unit === 'AUTO') return fontSize * 1.2;
  if ('value' in lh && 'unit' in lh) {
    if (lh.unit === 'PIXELS') return lh.value;
    if (lh.unit === 'PERCENT') return (lh.value / 100) * fontSize;
  }
  return fontSize * 1.2;
}

// --- Compiler ---

export class Compiler {
  private guidCounter = 0;
  private componentGuidMap = new Map<DslComponentNode, string>();
  private resolvedSizes = new Map<DslSceneNode, { w: number; h: number }>();

  compile(rootNode: DslSceneNode): CompileResult {
    this.guidCounter = 0;
    this.componentGuidMap.clear();
    this.resolvedSizes.clear();
    const errors: CompileError[] = [];

    // Pass 1: bottom-up size resolution
    this.pass1MeasureSizes(rootNode);

    // Pass 2: top-down positioning + compilation
    const root = this.compileNode(rootNode, identityTransform(), undefined, -1, errors, '');

    return {
      root,
      nodeCount: this.guidCounter,
      errors,
    };
  }

  compileToJson(rootNode: DslSceneNode): string {
    const result = this.compile(rootNode);
    return JSON.stringify(result, null, 2);
  }

  // --- Pass 1: Bottom-up measurement ---

  private pass1MeasureSizes(node: DslSceneNode): { w: number; h: number } {
    // Recurse into children first
    const childSizes: { w: number; h: number }[] = [];
    for (const child of node.children) {
      childSizes.push(this.pass1MeasureSizes(child));
    }

    if (isTextNode(node)) {
      // For text, use explicit size if set, otherwise estimate
      const w = node.width > 0 ? node.width : this.estimateTextWidth(node);
      const lh = resolveLineHeight(node.lineHeight, node.fontSize);
      const lines = node.characters.split('\n');
      const h = node.height > 0 ? node.height : lines.length * lh;
      const size = { w, h };
      this.resolvedSizes.set(node, size);
      return size;
    }

    if (isFrameLike(node) && hasAutoLayout(node)) {
      const frame = node;
      const isH = frame.layoutMode === 'HORIZONTAL';
      const parentHugH = frame.layoutSizingHorizontal === 'HUG';
      const parentHugV = frame.layoutSizingVertical === 'HUG';

      let primarySum = 0;
      let counterMax = 0;
      const visibleChildren = node.children.filter(c => c.visible !== false);
      const spacing = (visibleChildren.length > 1) ? frame.itemSpacing * (visibleChildren.length - 1) : 0;

      for (let i = 0; i < visibleChildren.length; i++) {
        const child = visibleChildren[i];
        const cs = this.resolvedSizes.get(child) ?? { w: child.width, h: child.height };

        if (isH) {
          const effSizing = getEffectiveSizing(child, 'horizontal', parentHugH);
          const childW = effSizing === 'FILL' ? 0 : cs.w;
          primarySum += childW;
          counterMax = Math.max(counterMax, cs.h);
        } else {
          const effSizing = getEffectiveSizing(child, 'vertical', parentHugV);
          const childH = effSizing === 'FILL' ? 0 : cs.h;
          primarySum += childH;
          counterMax = Math.max(counterMax, cs.w);
        }
      }

      let w: number;
      let h: number;

      if (isH) {
        w = parentHugH
          ? primarySum + spacing + frame.paddingLeft + frame.paddingRight
          : (frame.width > 0 ? frame.width : primarySum + spacing + frame.paddingLeft + frame.paddingRight);
        h = parentHugV
          ? counterMax + frame.paddingTop + frame.paddingBottom
          : (frame.height > 0 ? frame.height : counterMax + frame.paddingTop + frame.paddingBottom);
      } else {
        w = parentHugH
          ? counterMax + frame.paddingLeft + frame.paddingRight
          : (frame.width > 0 ? frame.width : counterMax + frame.paddingLeft + frame.paddingRight);
        h = parentHugV
          ? primarySum + spacing + frame.paddingTop + frame.paddingBottom
          : (frame.height > 0 ? frame.height : primarySum + spacing + frame.paddingTop + frame.paddingBottom);
      }

      const size = { w, h };
      this.resolvedSizes.set(node, size);
      return size;
    }

    // Non-auto-layout nodes use explicit size
    const size = { w: node.width, h: node.height };
    this.resolvedSizes.set(node, size);
    return size;
  }

  private estimateTextWidth(text: DslTextNode): number {
    // Simple fallback: ~0.6 * fontSize * characters length per line
    const lines = text.characters.split('\n');
    const maxLineLen = Math.max(...lines.map(l => l.length));
    return maxLineLen * text.fontSize * 0.6;
  }

  // --- Pass 2: Top-down positioning + node compilation ---

  private compileNode(
    node: DslSceneNode,
    parentTransform: Transform3x3,
    parentGuid: [number, number] | undefined,
    positionInParent: number,
    errors: CompileError[],
    path: string,
  ): FigmaNodeDict {
    const guid: [number, number] = [0, this.guidCounter++];
    const resolvedSize = this.resolvedSizes.get(node) ?? { w: node.width, h: node.height };

    // Compute this node's local offset
    let localTx = node.x;
    let localTy = node.y;

    const localTransform = translateTransform(localTx, localTy);
    const absoluteTransform = positionInParent < 0
      ? identityTransform()  // root node
      : composeTransforms(parentTransform, localTransform);

    // Build compiled node (without children yet)
    const compiled: FigmaNodeDict = {
      guid,
      type: node.type,
      name: node.name,
      size: { x: resolvedSize.w, y: resolvedSize.h },
      transform: absoluteTransform,
      fillPaints: node.fills.map(convertPaint),
      opacity: node.opacity,
      visible: node.visible,
      children: [],
    };

    // Optional properties
    if (node.strokes.length > 0) {
      compiled.strokes = node.strokes.map(convertPaint);
    }
    if (node.strokeWeight > 0) compiled.strokeWeight = node.strokeWeight;
    if (node.cornerRadius > 0) compiled.cornerRadius = node.cornerRadius;
    if (node.topLeftRadius !== undefined) compiled.topLeftRadius = node.topLeftRadius;
    if (node.topRightRadius !== undefined) compiled.topRightRadius = node.topRightRadius;
    if (node.bottomLeftRadius !== undefined) compiled.bottomLeftRadius = node.bottomLeftRadius;
    if (node.bottomRightRadius !== undefined) compiled.bottomRightRadius = node.bottomRightRadius;
    if (node.clipContent) compiled.clipContent = true;

    // Parent index
    if (parentGuid) {
      compiled.parentIndex = {
        guid: parentGuid,
        position: String(positionInParent),
      };
    }

    // Frame-like: auto-layout passthrough
    if (isFrameLike(node)) {
      const frame = node;
      if (hasAutoLayout(frame)) {
        compiled.stackMode = frame.layoutMode as 'HORIZONTAL' | 'VERTICAL';
        compiled.itemSpacing = frame.itemSpacing;
        compiled.paddingTop = frame.paddingTop;
        compiled.paddingRight = frame.paddingRight;
        compiled.paddingBottom = frame.paddingBottom;
        compiled.paddingLeft = frame.paddingLeft;
        compiled.primaryAxisAlignItems = frame.primaryAxisAlignItems;
        compiled.counterAxisAlignItems = frame.counterAxisAlignItems;
      }
    }

    // Text node: text data expansion
    if (isTextNode(node)) {
      this.expandTextData(compiled, node);
    }

    // Component: property definitions
    if (isComponentNode(node)) {
      this.componentGuidMap.set(node, `${guid[0]}:${guid[1]}`);
      const props = node.componentProperties;
      if (Object.keys(props).length > 0) {
        compiled.componentPropertyDefinitions = {};
        for (const [name, prop] of Object.entries(props)) {
          compiled.componentPropertyDefinitions[name] = {
            type: prop.type,
            defaultValue: prop.defaultValue,
          };
        }
      }
    }

    // Instance: component reference
    if (isInstanceNode(node)) {
      const mainComp = node.mainComponent;
      // componentId will be resolved if the component was compiled first
      const compId = this.componentGuidMap.get(mainComp);
      if (compId) {
        compiled.componentId = compId;
      }
      const overrides = (node as unknown as { overriddenProperties: Record<string, string | boolean> }).overriddenProperties;
      if (overrides && Object.keys(overrides).length > 0) {
        compiled.overriddenProperties = overrides;
      }
    }

    // Compile children with layout positioning
    if (node.children.length > 0) {
      if (isFrameLike(node) && hasAutoLayout(node)) {
        this.layoutAndCompileChildren(compiled, node, absoluteTransform, guid, errors, path);
      } else {
        // No auto-layout: children use their explicit positions
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          const childPath = path ? `${path}/${child.name}` : child.name;
          const compiledChild = this.compileNode(
            child, absoluteTransform, guid, i, errors, childPath,
          );
          compiled.children.push(compiledChild);
        }
      }
    }

    return compiled;
  }

  private layoutAndCompileChildren(
    compiledParent: FigmaNodeDict,
    parentNode: DslFrameNode,
    parentTransform: Transform3x3,
    parentGuid: [number, number],
    errors: CompileError[],
    path: string,
  ): void {
    const isH = parentNode.layoutMode === 'HORIZONTAL';
    const visibleChildren = parentNode.children.filter(c => c.visible !== false);
    const parentSize = this.resolvedSizes.get(parentNode) ?? { w: parentNode.width, h: parentNode.height };

    const padStart = isH ? parentNode.paddingLeft : parentNode.paddingTop;
    const padEnd = isH ? parentNode.paddingRight : parentNode.paddingBottom;
    const padCrossStart = isH ? parentNode.paddingTop : parentNode.paddingLeft;
    const padCrossEnd = isH ? parentNode.paddingBottom : parentNode.paddingRight;

    const containerPrimarySize = isH ? parentSize.w : parentSize.h;
    const containerCrossSize = isH ? parentSize.h : parentSize.w;
    const availablePrimary = containerPrimarySize - padStart - padEnd;
    const availableCross = containerCrossSize - padCrossStart - padCrossEnd;

    const parentHugPrimary = isH
      ? parentNode.layoutSizingHorizontal === 'HUG'
      : parentNode.layoutSizingVertical === 'HUG';

    // Measure children and identify FILL children
    const childInfos: Array<{
      child: DslSceneNode;
      primarySize: number;
      crossSize: number;
      isFillPrimary: boolean;
      isFillCross: boolean;
    }> = [];

    let totalFixed = 0;
    let fillCount = 0;

    for (const child of visibleChildren) {
      const cs = this.resolvedSizes.get(child) ?? { w: child.width, h: child.height };
      const effPrimary = getEffectiveSizing(
        child,
        isH ? 'horizontal' : 'vertical',
        parentHugPrimary,
      );
      const effCross = getEffectiveSizing(
        child,
        isH ? 'vertical' : 'horizontal',
        isH ? parentNode.layoutSizingVertical === 'HUG' : parentNode.layoutSizingHorizontal === 'HUG',
      );

      const primarySize = isH ? cs.w : cs.h;
      const crossSize = isH ? cs.h : cs.w;
      const isFillPrimary = effPrimary === 'FILL';

      if (isFillPrimary) {
        fillCount++;
      } else {
        totalFixed += primarySize;
      }

      childInfos.push({
        child,
        primarySize,
        crossSize,
        isFillPrimary,
        isFillCross: effCross === 'FILL',
      });
    }

    // Distribute FILL space
    const spacing = visibleChildren.length > 1
      ? parentNode.itemSpacing * (visibleChildren.length - 1)
      : 0;
    const remainingPrimary = availablePrimary - totalFixed - spacing;
    const fillSize = fillCount > 0 ? Math.max(0, remainingPrimary / fillCount) : 0;

    // Resolve final sizes
    for (const info of childInfos) {
      if (info.isFillPrimary) {
        info.primarySize = fillSize;
      }
      if (info.isFillCross) {
        info.crossSize = availableCross;
      }
    }

    // Compute total children primary extent for alignment
    let totalChildrenPrimary = 0;
    for (const info of childInfos) {
      totalChildrenPrimary += info.primarySize;
    }
    totalChildrenPrimary += spacing;

    // Primary axis positioning
    let primaryOffset: number;
    let spaceBetweenGap = parentNode.itemSpacing;

    switch (parentNode.primaryAxisAlignItems) {
      case 'CENTER':
        primaryOffset = padStart + (availablePrimary - totalChildrenPrimary) / 2;
        break;
      case 'MAX':
        primaryOffset = padStart + availablePrimary - totalChildrenPrimary;
        break;
      case 'SPACE_BETWEEN':
        primaryOffset = padStart;
        if (visibleChildren.length > 1) {
          spaceBetweenGap = (availablePrimary - totalChildrenPrimary + spacing) / (visibleChildren.length - 1);
        }
        break;
      default: // MIN
        primaryOffset = padStart;
    }

    // Compile each child with computed position
    let allChildIndex = 0;
    for (let i = 0; i < childInfos.length; i++) {
      const info = childInfos[i];

      // Counter axis alignment
      let crossOffset: number;
      switch (parentNode.counterAxisAlignItems) {
        case 'CENTER':
          crossOffset = padCrossStart + (availableCross - info.crossSize) / 2;
          break;
        case 'MAX':
          crossOffset = padCrossStart + availableCross - info.crossSize;
          break;
        default: // MIN
          crossOffset = padCrossStart;
      }

      // Update resolved size for FILL children
      const resolvedSize = this.resolvedSizes.get(info.child);
      if (resolvedSize) {
        if (isH) {
          resolvedSize.w = info.primarySize;
          if (info.isFillCross) resolvedSize.h = info.crossSize;
        } else {
          resolvedSize.h = info.primarySize;
          if (info.isFillCross) resolvedSize.w = info.crossSize;
        }
      }

      // Set child position
      const origX = info.child.x;
      const origY = info.child.y;
      if (isH) {
        (info.child as { x: number }).x = primaryOffset;
        (info.child as { y: number }).y = crossOffset;
      } else {
        (info.child as { x: number }).x = crossOffset;
        (info.child as { y: number }).y = primaryOffset;
      }

      // Find real index in parent.children
      while (allChildIndex < parentNode.children.length && parentNode.children[allChildIndex] !== info.child) {
        allChildIndex++;
      }

      const childPath = path ? `${path}/${info.child.name}` : info.child.name;
      const compiledChild = this.compileNode(
        info.child, parentTransform, parentGuid, allChildIndex, errors, childPath,
      );
      compiledParent.children.push(compiledChild);

      // Restore original position
      (info.child as { x: number }).x = origX;
      (info.child as { y: number }).y = origY;

      const gap = parentNode.primaryAxisAlignItems === 'SPACE_BETWEEN'
        ? spaceBetweenGap
        : parentNode.itemSpacing;
      primaryOffset += info.primarySize + gap;
      allChildIndex++;
    }
  }

  private expandTextData(compiled: FigmaNodeDict, text: DslTextNode): void {
    const lines = text.characters.split('\n');
    compiled.textData = {
      characters: text.characters,
      lines,
    };

    const lineHeight = resolveLineHeight(text.lineHeight, text.fontSize);
    const baselines: Baseline[] = [];
    let charIndex = 0;
    for (let i = 0; i < lines.length; i++) {
      baselines.push({
        lineY: i * lineHeight,
        lineHeight,
        firstCharIndex: charIndex,
        endCharIndex: charIndex + lines[i].length,
      });
      charIndex += lines[i].length + 1; // +1 for \n
    }

    compiled.derivedTextData = {
      baselines,
      fontMetaData: [{
        fontFamily: text.fontFamily,
        fontStyle: weightToStyle(text.fontWeight),
        fontWeight: text.fontWeight,
        fontSize: text.fontSize,
      }],
    };

    compiled.fontSize = text.fontSize;
    compiled.fontFamily = text.fontFamily;
    compiled.textAlignHorizontal = text.textAlignHorizontal;
  }
}
