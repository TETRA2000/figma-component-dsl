import type { DslSceneNode, DslFrameNode, DslTextNode } from '@figma-dsl/core';
import type { TextMeasurer } from './text-measurer.js';

function isFrameLike(node: DslSceneNode): node is DslFrameNode {
  return (
    node.type === 'FRAME' ||
    node.type === 'COMPONENT' ||
    node.type === 'COMPONENT_SET' ||
    node.type === 'INSTANCE'
  );
}

function isTextNode(node: DslSceneNode): node is DslTextNode {
  return node.type === 'TEXT';
}

function hasAutoLayout(node: DslFrameNode): boolean {
  return node.layoutMode !== 'NONE';
}

export class LayoutResolver {
  constructor(private measurer: TextMeasurer) {}

  resolve(root: DslSceneNode): void {
    // Pass 1: bottom-up measurement
    this.measureBottomUp(root);
    // Pass 2: top-down positioning
    this.positionTopDown(root);
  }

  private measureBottomUp(node: DslSceneNode): void {
    // Recurse children first
    for (const child of node.children) {
      this.measureBottomUp(child);
    }

    if (isTextNode(node)) {
      this.measureText(node);
      return;
    }

    if (!isFrameLike(node) || !hasAutoLayout(node)) return;

    const isHorizontal = node.layoutMode === 'HORIZONTAL';
    const isHugW = node.layoutSizingHorizontal === 'HUG';
    const isHugH = node.layoutSizingVertical === 'HUG';

    if (!isHugW && !isHugH) return;

    const children = [...node.children].filter(
      (c): c is DslSceneNode => c.visible !== false,
    );

    // For HUG parent, FILL children are treated as HUG
    let primarySum = 0;
    let counterMax = 0;

    for (const child of children) {
      const childW = child.width;
      const childH = child.height;

      if (isHorizontal) {
        primarySum += childW;
        counterMax = Math.max(counterMax, childH);
      } else {
        primarySum += childH;
        counterMax = Math.max(counterMax, childW);
      }
    }

    const spacing = children.length > 1 ? node.itemSpacing * (children.length - 1) : 0;

    if (isHorizontal) {
      if (isHugW) {
        node.width = primarySum + spacing + node.paddingLeft + node.paddingRight;
      }
      if (isHugH) {
        node.height = counterMax + node.paddingTop + node.paddingBottom;
      }
    } else {
      if (isHugW) {
        node.width = counterMax + node.paddingLeft + node.paddingRight;
      }
      if (isHugH) {
        node.height = primarySum + spacing + node.paddingTop + node.paddingBottom;
      }
    }
  }

  private positionTopDown(node: DslSceneNode): void {
    if (!isFrameLike(node) || !hasAutoLayout(node)) {
      // For non-auto-layout, just recurse
      for (const child of node.children) {
        this.positionTopDown(child);
      }
      return;
    }

    const isHorizontal = node.layoutMode === 'HORIZONTAL';
    const children = [...node.children] as DslSceneNode[];

    // Available space
    const availW = node.width - node.paddingLeft - node.paddingRight;
    const availH = node.height - node.paddingTop - node.paddingBottom;

    // Resolve FILL children sizes
    const fillChildren: DslSceneNode[] = [];
    let fixedTotal = 0;

    for (const child of children) {
      const childFrame = isFrameLike(child) ? child : null;
      const isFillPrimary = isHorizontal
        ? childFrame?.layoutSizingHorizontal === 'FILL'
        : childFrame?.layoutSizingVertical === 'FILL';

      // FILL inside HUG = treat as HUG
      const parentIsHugPrimary = isHorizontal
        ? node.layoutSizingHorizontal === 'HUG'
        : node.layoutSizingVertical === 'HUG';

      if (isFillPrimary && !parentIsHugPrimary) {
        fillChildren.push(child);
      } else {
        fixedTotal += isHorizontal ? child.width : child.height;
      }

      // Counter-axis FILL
      const isFillCounter = isHorizontal
        ? childFrame?.layoutSizingHorizontal === 'FILL'
          ? false
          : childFrame?.layoutSizingVertical === 'FILL'
        : childFrame?.layoutSizingHorizontal === 'FILL';

      if (isFillCounter) {
        if (isHorizontal) {
          child.height = availH;
        } else {
          child.width = availW;
        }
      }

      // Counter-axis FILL for non-frame children (text with FILL)
      if (!childFrame && isTextNode(child)) {
        const textFrame = child as unknown as { layoutSizingHorizontal?: string; layoutSizingVertical?: string };
        if (isHorizontal && textFrame.layoutSizingVertical === 'FILL') {
          child.height = availH;
        }
        if (!isHorizontal && textFrame.layoutSizingHorizontal === 'FILL') {
          child.width = availW;
        }
      }
    }

    // Distribute remaining space to FILL children on primary axis
    if (fillChildren.length > 0) {
      const totalSpacing = children.length > 1 ? node.itemSpacing * (children.length - 1) : 0;
      const remaining = (isHorizontal ? availW : availH) - fixedTotal - totalSpacing;
      const perFill = remaining / fillChildren.length;

      for (const child of fillChildren) {
        if (isHorizontal) {
          child.width = perFill;
        } else {
          child.height = perFill;
        }
      }
    }

    // Position children
    this.positionChildren(node, children, isHorizontal, availW, availH);

    // Recurse
    for (const child of children) {
      this.positionTopDown(child);
    }
  }

  private positionChildren(
    node: DslFrameNode,
    children: DslSceneNode[],
    isHorizontal: boolean,
    availW: number,
    availH: number,
  ): void {
    const totalChildSize = children.reduce(
      (sum, c) => sum + (isHorizontal ? c.width : c.height),
      0,
    );
    const totalSpacing = children.length > 1 ? node.itemSpacing * (children.length - 1) : 0;

    let primaryOffset: number;
    let dynamicSpacing = node.itemSpacing;

    if (node.primaryAxisAlignItems === 'SPACE_BETWEEN' && children.length > 1) {
      primaryOffset = 0;
      const totalAvail = isHorizontal ? availW : availH;
      dynamicSpacing = (totalAvail - totalChildSize) / (children.length - 1);
    } else if (node.primaryAxisAlignItems === 'CENTER') {
      const totalAvail = isHorizontal ? availW : availH;
      primaryOffset = (totalAvail - totalChildSize - totalSpacing) / 2;
    } else if (node.primaryAxisAlignItems === 'MAX') {
      const totalAvail = isHorizontal ? availW : availH;
      primaryOffset = totalAvail - totalChildSize - totalSpacing;
    } else {
      // MIN
      primaryOffset = 0;
    }

    for (const child of children) {
      if (isHorizontal) {
        child.x = node.paddingLeft + primaryOffset;
        primaryOffset += child.width + dynamicSpacing;

        // Counter-axis alignment
        child.y = this.counterAlign(
          node.counterAxisAlignItems,
          node.paddingTop,
          availH,
          child.height,
        );
      } else {
        child.y = node.paddingTop + primaryOffset;
        primaryOffset += child.height + dynamicSpacing;

        // Counter-axis alignment
        child.x = this.counterAlign(
          node.counterAxisAlignItems,
          node.paddingLeft,
          availW,
          child.width,
        );
      }
    }
  }

  private counterAlign(
    alignment: 'MIN' | 'CENTER' | 'MAX',
    padding: number,
    available: number,
    childSize: number,
  ): number {
    switch (alignment) {
      case 'CENTER':
        return padding + (available - childSize) / 2;
      case 'MAX':
        return padding + available - childSize;
      default:
        return padding;
    }
  }

  private measureText(node: DslTextNode): void {
    const result = this.measurer.measure(node.characters, {
      fontSize: node.fontSize,
      fontFamily: node.fontFamily,
      fontWeight: node.fontWeight,
      lineHeight: 'value' in node.lineHeight
        ? { value: node.lineHeight.value, unit: node.lineHeight.unit }
        : undefined,
    });
    node.width = result.width;
    node.height = result.height;
  }
}
