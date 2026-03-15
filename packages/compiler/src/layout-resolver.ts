import type { DslNode, AutoLayoutConfig } from '@figma-dsl/core';
import type { TextMeasurer } from './types.js';

interface ResolvedSize {
  width: number;
  height: number;
}

interface LayoutResult {
  sizes: Map<DslNode, ResolvedSize>;
  offsets: Map<DslNode, { x: number; y: number }>;
}

function getPadding(al: AutoLayoutConfig) {
  return {
    top: al.padTop ?? al.padY ?? 0,
    bottom: al.padBottom ?? al.padY ?? 0,
    left: al.padLeft ?? al.padX ?? 0,
    right: al.padRight ?? al.padX ?? 0,
  };
}

function getChildSizing(child: DslNode, axis: 'horizontal' | 'vertical'): 'FIXED' | 'HUG' | 'FILL' {
  if (axis === 'horizontal') {
    return child.layoutSizingHorizontal ?? (child.size?.x ? 'FIXED' : 'HUG');
  }
  return child.layoutSizingVertical ?? (child.size?.y ? 'FIXED' : 'HUG');
}

export function resolveLayout(
  root: DslNode,
  measurer: TextMeasurer,
): LayoutResult {
  const sizes = new Map<DslNode, ResolvedSize>();
  const offsets = new Map<DslNode, { x: number; y: number }>();

  // Pass 1: Bottom-up — compute intrinsic sizes
  measureNode(root, sizes, measurer);

  // Pass 2: Top-down — position children
  offsets.set(root, { x: 0, y: 0 });
  positionChildren(root, sizes, offsets, measurer);

  return { sizes, offsets };
}

function measureNode(
  node: DslNode,
  sizes: Map<DslNode, ResolvedSize>,
  measurer: TextMeasurer,
): ResolvedSize {
  // Leaf node: TEXT
  if (node.type === 'TEXT' && node.characters) {
    const textAutoResize = node.textAutoResize ?? node.textStyle?.textAutoResize;
    const explicitWidth = node.size?.x;

    // If textAutoResize is 'HEIGHT' and explicit width given, measure with wrapping
    if (textAutoResize === 'HEIGHT' && explicitWidth && explicitWidth > 0) {
      const measurement = measurer.measureWrapped(node.characters, explicitWidth, {
        fontFamily: node.textStyle?.fontFamily,
        fontWeight: node.textStyle?.fontWeight,
        fontSize: node.textStyle?.fontSize,
        lineHeight: node.textStyle?.lineHeight,
        letterSpacing: node.textStyle?.letterSpacing,
      });
      const size = { width: explicitWidth, height: measurement.height };
      sizes.set(node, size);
      return size;
    }

    // Default: auto-size from content (WIDTH_AND_HEIGHT or no setting)
    const measurement = measurer.measure(node.characters, {
      fontFamily: node.textStyle?.fontFamily,
      fontWeight: node.textStyle?.fontWeight,
      fontSize: node.textStyle?.fontSize,
      lineHeight: node.textStyle?.lineHeight,
      letterSpacing: node.textStyle?.letterSpacing,
    });
    const size = { width: measurement.width, height: measurement.height };
    sizes.set(node, size);
    return size;
  }

  // LINE: leaf node with height always 0
  if (node.type === 'LINE') {
    const size = { width: node.size?.x ?? 0, height: 0 };
    sizes.set(node, size);
    return size;
  }

  // Leaf node: shapes with explicit size
  if (!node.children?.length) {
    const size = {
      width: node.size?.x ?? 0,
      height: node.size?.y ?? 0,
    };
    sizes.set(node, size);
    return size;
  }

  // Recurse children first
  for (const child of node.children) {
    measureNode(child, sizes, measurer);
  }

  // SECTION: absolute-positioned container, no auto-layout
  if (node.type === 'SECTION') {
    const size = { width: node.size?.x ?? 0, height: node.size?.y ?? 0 };
    sizes.set(node, size);
    return size;
  }

  // BOOLEAN_OPERATION: compute union bounding box of children (like GROUP)
  if (node.type === 'BOOLEAN_OPERATION') {
    let maxWidth = 0;
    let maxHeight = 0;
    for (const child of node.children!) {
      const childSize = sizes.get(child);
      if (childSize) {
        if (childSize.width > maxWidth) maxWidth = childSize.width;
        if (childSize.height > maxHeight) maxHeight = childSize.height;
      }
    }
    const size = { width: node.size?.x ?? maxWidth, height: node.size?.y ?? maxHeight };
    sizes.set(node, size);
    return size;
  }

  // If this node has explicit FIXED size, use it
  if (node.size && !node.autoLayout) {
    const size = { width: node.size.x, height: node.size.y };
    sizes.set(node, size);
    return size;
  }

  // Auto-layout HUG sizing
  if (node.autoLayout) {
    const al = node.autoLayout;
    const pad = getPadding(al);
    const visibleChildren = (node.children ?? []).filter(c => c.visible !== false);
    const spacing = al.spacing ?? 0;

    const isHorizontal = al.direction === 'HORIZONTAL';

    // Determine container sizing mode
    const widthSizing = al.widthSizing ?? al.sizing ?? (node.size?.x ? 'FIXED' : 'HUG');
    const heightSizing = al.heightSizing ?? al.sizing ?? (node.size?.y ? 'FIXED' : 'HUG');

    let width: number;
    let height: number;

    if (widthSizing === 'FIXED' && node.size?.x) {
      width = node.size.x;
    } else if (widthSizing === 'HUG' || (!node.size?.x && widthSizing !== 'FILL')) {
      if (isHorizontal) {
        // Primary axis: sum of children + spacing + padding
        let sum = 0;
        for (const child of visibleChildren) {
          const childSize = sizes.get(child);
          sum += childSize?.width ?? 0;
        }
        const totalSpacing = visibleChildren.length > 1 ? spacing * (visibleChildren.length - 1) : 0;
        width = sum + totalSpacing + pad.left + pad.right;
      } else {
        // Counter axis: max child width + padding
        let maxWidth = 0;
        for (const child of visibleChildren) {
          const childSize = sizes.get(child);
          if ((childSize?.width ?? 0) > maxWidth) maxWidth = childSize?.width ?? 0;
        }
        width = maxWidth + pad.left + pad.right;
      }
    } else {
      width = node.size?.x ?? 0;
    }

    if (heightSizing === 'FIXED' && node.size?.y) {
      height = node.size.y;
    } else if (heightSizing === 'HUG' || (!node.size?.y && heightSizing !== 'FILL')) {
      if (!isHorizontal) {
        // Primary axis: sum of children + spacing + padding
        let sum = 0;
        for (const child of visibleChildren) {
          const childSize = sizes.get(child);
          sum += childSize?.height ?? 0;
        }
        const totalSpacing = visibleChildren.length > 1 ? spacing * (visibleChildren.length - 1) : 0;
        height = sum + totalSpacing + pad.top + pad.bottom;
      } else {
        // Counter axis: max child height + padding
        let maxHeight = 0;
        for (const child of visibleChildren) {
          const childSize = sizes.get(child);
          if ((childSize?.height ?? 0) > maxHeight) maxHeight = childSize?.height ?? 0;
        }
        height = maxHeight + pad.top + pad.bottom;
      }
    } else {
      height = node.size?.y ?? 0;
    }

    const size = { width, height };
    sizes.set(node, size);
    return size;
  }

  // No auto-layout, use explicit size or compute from children
  const size = {
    width: node.size?.x ?? 0,
    height: node.size?.y ?? 0,
  };
  sizes.set(node, size);
  return size;
}

function positionChildren(
  node: DslNode,
  sizes: Map<DslNode, ResolvedSize>,
  offsets: Map<DslNode, { x: number; y: number }>,
  measurer: TextMeasurer,
): void {
  if (!node.children?.length) return;

  const visibleChildren = node.children.filter(c => c.visible !== false);
  const nodeSize = sizes.get(node)!;

  if (node.autoLayout) {
    const al = node.autoLayout;
    const pad = getPadding(al);
    const spacing = al.spacing ?? 0;
    const isHorizontal = al.direction === 'HORIZONTAL';

    // Resolve FILL children sizes
    const primaryAvailable = isHorizontal
      ? nodeSize.width - pad.left - pad.right
      : nodeSize.height - pad.top - pad.bottom;

    const counterAvailable = isHorizontal
      ? nodeSize.height - pad.top - pad.bottom
      : nodeSize.width - pad.left - pad.right;

    // Calculate total fixed/hug sizes and count fill children
    let fixedTotal = 0;
    let fillCount = 0;
    const totalSpacing = visibleChildren.length > 1 ? spacing * (visibleChildren.length - 1) : 0;

    for (const child of visibleChildren) {
      const childSize = sizes.get(child)!;
      const primarySizing = getChildSizing(child, isHorizontal ? 'horizontal' : 'vertical');

      if (child.layoutGrow && child.layoutGrow > 0) {
        fillCount++;
      } else if (primarySizing === 'FILL') {
        // Inside a HUG parent, FILL is treated as HUG.
        // A parent is considered non-HUG if it has an explicit sizing mode,
        // an explicit size, OR if it itself is FILL-sized by its own parent.
        const parentSizing = isHorizontal
          ? (al.widthSizing ?? al.sizing ?? (node.size?.x ? 'FIXED' : (node.layoutSizingHorizontal === 'FILL' ? 'FILL' : 'HUG')))
          : (al.heightSizing ?? al.sizing ?? (node.size?.y ? 'FIXED' : (node.layoutSizingVertical === 'FILL' ? 'FILL' : 'HUG')));
        if (parentSizing === 'HUG') {
          fixedTotal += isHorizontal ? childSize.width : childSize.height;
        } else {
          fillCount++;
        }
      } else {
        fixedTotal += isHorizontal ? childSize.width : childSize.height;
      }
    }

    const remainingSpace = primaryAvailable - fixedTotal - totalSpacing;
    const fillSize = fillCount > 0 ? Math.max(0, remainingSpace / fillCount) : 0;

    // Update FILL children sizes
    for (const child of visibleChildren) {
      const childSize = sizes.get(child)!;
      const primarySizing = getChildSizing(child, isHorizontal ? 'horizontal' : 'vertical');
      const counterSizing = getChildSizing(child, isHorizontal ? 'vertical' : 'horizontal');

      if (child.layoutGrow && child.layoutGrow > 0) {
        if (isHorizontal) childSize.width = fillSize;
        else childSize.height = fillSize;
      } else if (primarySizing === 'FILL') {
        const parentSizing = isHorizontal
          ? (al.widthSizing ?? al.sizing ?? (node.size?.x ? 'FIXED' : (node.layoutSizingHorizontal === 'FILL' ? 'FILL' : 'HUG')))
          : (al.heightSizing ?? al.sizing ?? (node.size?.y ? 'FIXED' : (node.layoutSizingVertical === 'FILL' ? 'FILL' : 'HUG')));
        if (parentSizing !== 'HUG') {
          if (isHorizontal) childSize.width = fillSize;
          else childSize.height = fillSize;
        }
      }

      // Counter axis FILL
      if (counterSizing === 'FILL') {
        if (isHorizontal) childSize.height = counterAvailable;
        else childSize.width = counterAvailable;
      }
    }

    // Position children along primary axis
    let primaryOffset = isHorizontal ? pad.left : pad.top;
    const counterStart = isHorizontal ? pad.top : pad.left;

    // Primary axis alignment
    const align = al.align ?? 'MIN';
    if (align === 'CENTER') {
      let totalChildSize = 0;
      for (const child of visibleChildren) {
        const cs = sizes.get(child)!;
        totalChildSize += isHorizontal ? cs.width : cs.height;
      }
      const totalWithSpacing = totalChildSize + totalSpacing;
      primaryOffset = (isHorizontal ? pad.left : pad.top) +
        (primaryAvailable - totalWithSpacing) / 2;
    } else if (align === 'MAX') {
      let totalChildSize = 0;
      for (const child of visibleChildren) {
        const cs = sizes.get(child)!;
        totalChildSize += isHorizontal ? cs.width : cs.height;
      }
      const totalWithSpacing = totalChildSize + totalSpacing;
      primaryOffset = (isHorizontal ? pad.left : pad.top) +
        (primaryAvailable - totalWithSpacing);
    }

    // Calculate SPACE_BETWEEN spacing
    let effectiveSpacing = spacing;
    if (align === 'SPACE_BETWEEN' && visibleChildren.length > 1) {
      let totalChildSize = 0;
      for (const child of visibleChildren) {
        const cs = sizes.get(child)!;
        totalChildSize += isHorizontal ? cs.width : cs.height;
      }
      effectiveSpacing = (primaryAvailable - totalChildSize) / (visibleChildren.length - 1);
      primaryOffset = isHorizontal ? pad.left : pad.top;
    }

    for (const child of visibleChildren) {
      const childSize = sizes.get(child)!;

      // Counter axis alignment
      const counterAlign = al.counterAlign ?? 'MIN';
      const childCounterSize = isHorizontal ? childSize.height : childSize.width;
      let counterOffset = counterStart;
      if (counterAlign === 'CENTER') {
        counterOffset = counterStart + (counterAvailable - childCounterSize) / 2;
      } else if (counterAlign === 'MAX') {
        counterOffset = counterStart + (counterAvailable - childCounterSize);
      }

      const childOffset = isHorizontal
        ? { x: primaryOffset, y: counterOffset }
        : { x: counterOffset, y: primaryOffset };

      offsets.set(child, childOffset);
      primaryOffset += (isHorizontal ? childSize.width : childSize.height) + effectiveSpacing;
    }
  } else {
    // No auto-layout: children at (0, 0) relative to parent
    for (const child of node.children) {
      offsets.set(child, { x: 0, y: 0 });
    }
  }

  // Recurse into children
  for (const child of node.children) {
    positionChildren(child, sizes, offsets, measurer);
  }
}
