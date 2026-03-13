import type { DslNode, AutoLayoutConfig } from '../../dsl-core/src/types.js';
import type { TextMeasurer } from './text-measurer.js';

export interface ResolvedNode extends DslNode {
  _resolvedPosition?: { x: number; y: number };
  size?: { x: number; y: number };
  children?: readonly ResolvedNode[];
}

function resolvePadding(config: AutoLayoutConfig) {
  return {
    top: config.padTop ?? config.padY ?? 0,
    right: config.padRight ?? config.padX ?? 0,
    bottom: config.padBottom ?? config.padY ?? 0,
    left: config.padLeft ?? config.padX ?? 0,
  };
}

function isHugParent(node: DslNode): boolean {
  if (!node.autoLayout) return false;
  const al = node.autoLayout;
  // If no explicit size, default to HUG
  if (!node.size) return true;
  // If explicit sizing mode is HUG
  if (al.sizing === 'HUG') return true;
  return false;
}

function isHorizontal(config: AutoLayoutConfig): boolean {
  return config.direction === 'HORIZONTAL';
}

function isFillOnPrimary(child: DslNode, horizontal: boolean): boolean {
  return horizontal
    ? child.layoutSizingHorizontal === 'FILL'
    : child.layoutSizingVertical === 'FILL';
}

function isFillOnCounter(child: DslNode, horizontal: boolean): boolean {
  return horizontal
    ? child.layoutSizingVertical === 'FILL'
    : child.layoutSizingHorizontal === 'FILL';
}

/**
 * Pass 1: Bottom-up measurement — compute intrinsic sizes for all nodes.
 * Returns a new node tree with resolved sizes.
 */
function measurePass(node: DslNode, measurer: TextMeasurer): ResolvedNode {
  // Text nodes: measure using font metrics
  if (node.type === 'TEXT' && node.characters) {
    const m = measurer.measure(node.characters, node.textStyle ?? {});
    return { ...node, size: { x: m.width, y: m.height } };
  }

  // Leaf nodes with explicit size
  if (!node.children || node.children.length === 0) {
    return { ...node, size: node.size ?? { x: 0, y: 0 } };
  }

  // Recursively measure children first
  const measuredChildren = node.children.map((c) => measurePass(c, measurer));

  // If no auto-layout, just pass through
  if (!node.autoLayout) {
    return { ...node, children: measuredChildren, size: node.size ?? { x: 0, y: 0 } };
  }

  const al = node.autoLayout;
  const horiz = isHorizontal(al);
  const pad = resolvePadding(al);
  const spacing = al.spacing ?? 0;
  const isHug = isHugParent(node);

  if (isHug) {
    // Compute size from children
    let primaryTotal = 0;
    let counterMax = 0;
    const visibleChildren = measuredChildren.filter((c) => c.visible !== false);
    const childCount = visibleChildren.length;

    for (const child of visibleChildren) {
      const cs = child.size ?? { x: 0, y: 0 };
      const childPrimary = horiz ? cs.x : cs.y;
      const childCounter = horiz ? cs.y : cs.x;

      // FILL children in HUG parents are treated as HUG (use intrinsic size)
      primaryTotal += childPrimary;
      counterMax = Math.max(counterMax, childCounter);
    }

    // Add spacing between children
    const totalSpacing = childCount > 1 ? spacing * (childCount - 1) : 0;

    const primarySize = pad.left + primaryTotal + totalSpacing + pad.right;
    const counterSize = pad.top + counterMax + pad.bottom;

    const width = horiz ? primarySize : counterSize;
    const height = horiz ? counterSize : primarySize;

    // Check per-axis sizing overrides
    const widthSizing = al.widthSizing ?? al.sizing;
    const heightSizing = al.heightSizing ?? al.sizing;

    return {
      ...node,
      children: measuredChildren,
      size: {
        x: (widthSizing === 'FIXED' && node.size) ? node.size.x : width,
        y: (heightSizing === 'FIXED' && node.size) ? node.size.y : height,
      },
    };
  }

  // FIXED sizing: use explicit size
  return {
    ...node,
    children: measuredChildren,
    size: node.size ?? { x: 0, y: 0 },
  };
}

/**
 * Pass 2: Top-down positioning — distribute children and compute positions.
 */
function positionPass(node: ResolvedNode, measurer: TextMeasurer): ResolvedNode {
  if (!node.autoLayout || !node.children || node.children.length === 0) {
    return { ...node, _resolvedPosition: node._resolvedPosition };
  }

  const al = node.autoLayout;
  const horiz = isHorizontal(al);
  const pad = resolvePadding(al);
  const spacing = al.spacing ?? 0;
  const containerSize = node.size ?? { x: 0, y: 0 };
  const isHug = isHugParent(node);

  const visibleChildren = [...node.children].filter((c) => c.visible !== false);

  // Resolve FILL children sizes
  const resolvedChildren: ResolvedNode[] = visibleChildren.map((child) => {
    const cs = child.size ?? { x: 0, y: 0 };
    let newWidth = cs.x;
    let newHeight = cs.y;

    // Counter axis FILL
    if (isFillOnCounter(child, horiz) && !isHug) {
      if (horiz) {
        newHeight = containerSize.y - pad.top - pad.bottom;
      } else {
        newWidth = containerSize.x - pad.left - pad.right;
      }
    }

    return { ...child, size: { x: newWidth, y: newHeight } };
  });

  // Compute available primary space and distribute FILL
  const primaryAvailable = horiz
    ? containerSize.x - pad.left - pad.right
    : containerSize.y - pad.top - pad.bottom;

  const totalSpacing = resolvedChildren.length > 1
    ? spacing * (resolvedChildren.length - 1)
    : 0;

  // Sum of non-FILL children sizes on primary axis
  let nonFillTotal = 0;
  let fillCount = 0;
  for (const child of resolvedChildren) {
    if (isFillOnPrimary(child, horiz) && !isHug) {
      fillCount++;
    } else {
      nonFillTotal += horiz ? (child.size?.x ?? 0) : (child.size?.y ?? 0);
    }
  }

  const remainingSpace = primaryAvailable - totalSpacing - nonFillTotal;
  const fillSize = fillCount > 0 ? Math.max(0, remainingSpace / fillCount) : 0;

  // Apply FILL sizes
  const finalChildren: ResolvedNode[] = resolvedChildren.map((child) => {
    if (isFillOnPrimary(child, horiz) && !isHug) {
      const cs = child.size ?? { x: 0, y: 0 };
      return {
        ...child,
        size: horiz ? { x: fillSize, y: cs.y } : { x: cs.x, y: fillSize },
      };
    }
    return child;
  });

  // Position children on primary axis
  const align = al.align ?? 'MIN';
  const counterAlign = al.counterAlign ?? 'MIN';

  // Calculate total block size for alignment
  let blockSize = 0;
  for (const child of finalChildren) {
    blockSize += horiz ? (child.size?.x ?? 0) : (child.size?.y ?? 0);
  }
  blockSize += totalSpacing;

  // Starting offset on primary axis
  let primaryStart: number;
  let actualSpacing = spacing;

  if (align === 'CENTER') {
    primaryStart = (primaryAvailable - blockSize) / 2;
  } else if (align === 'MAX') {
    primaryStart = primaryAvailable - blockSize;
  } else if (align === 'SPACE_BETWEEN' && finalChildren.length > 1) {
    primaryStart = 0;
    const totalChildSize = blockSize - totalSpacing;
    actualSpacing = (primaryAvailable - totalChildSize) / (finalChildren.length - 1);
  } else {
    primaryStart = 0;
  }

  // Add padding offset
  const primaryOffset = horiz ? pad.left : pad.top;
  const counterOffset = horiz ? pad.top : pad.left;
  const counterAvailable = horiz
    ? containerSize.y - pad.top - pad.bottom
    : containerSize.x - pad.left - pad.right;

  let cursor = primaryOffset + primaryStart;
  const positioned: ResolvedNode[] = finalChildren.map((child) => {
    const cs = child.size ?? { x: 0, y: 0 };
    const childPrimary = horiz ? cs.x : cs.y;
    const childCounter = horiz ? cs.y : cs.x;

    // Counter axis position
    let counterPos: number;
    if (counterAlign === 'CENTER') {
      counterPos = counterOffset + (counterAvailable - childCounter) / 2;
    } else if (counterAlign === 'MAX') {
      counterPos = counterOffset + counterAvailable - childCounter;
    } else {
      counterPos = counterOffset;
    }

    const position = horiz
      ? { x: cursor, y: counterPos }
      : { x: counterPos, y: cursor };

    cursor += childPrimary + actualSpacing;

    // Recursively position nested children
    const positionedChild = positionPass({ ...child, _resolvedPosition: position }, measurer);
    return positionedChild;
  });

  return {
    ...node,
    children: positioned,
  };
}

export function resolveLayout(node: DslNode, measurer: TextMeasurer): ResolvedNode {
  // Pass 1: bottom-up measurement
  const measured = measurePass(node, measurer);
  // Pass 2: top-down positioning
  return positionPass(measured, measurer);
}
