import Yoga from "yoga-layout";
import type { DslNode } from "../nodes/types.js";
import { measureText, resolveLineHeight, resolveLetterSpacing } from "./text-measurer.js";
import type { ResolvedTextStyle } from "./types.js";
import { hex } from "../colors/index.js";

type YogaNode = ReturnType<typeof Yoga.Node.create>;

export interface LayoutResult {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

export interface LayoutData {
  readonly layouts: Map<DslNode, LayoutResult>;
  readonly textStyles: Map<DslNode, ResolvedTextStyle>;
  readonly textLines: Map<DslNode, readonly string[]>;
}

/**
 * Build a Yoga node tree from a DslNode tree, compute layout,
 * and extract computed positions.
 */
export function computeLayout(root: DslNode): LayoutData {
  const layouts = new Map<DslNode, LayoutResult>();
  const textStyles = new Map<DslNode, ResolvedTextStyle>();
  const textLines = new Map<DslNode, readonly string[]>();
  const yogaNodes: YogaNode[] = [];

  function buildYogaNode(dslNode: DslNode): YogaNode {
    const yogaNode = Yoga.Node.create();
    yogaNodes.push(yogaNode);

    // Set explicit size if defined (FIXED sizing)
    if (dslNode.size) {
      yogaNode.setWidth(dslNode.size.x);
      yogaNode.setHeight(dslNode.size.y);
    }

    // Auto-layout mapping
    const al = dslNode.autoLayout;
    if (al) {
      yogaNode.setFlexDirection(
        al.direction === "HORIZONTAL"
          ? Yoga.FLEX_DIRECTION_ROW
          : Yoga.FLEX_DIRECTION_COLUMN,
      );

      if (al.spacing !== undefined) {
        yogaNode.setGap(Yoga.GUTTER_ALL, al.spacing);
      }

      const padTop = al.padTop ?? al.padY ?? 0;
      const padRight = al.padRight ?? al.padX ?? 0;
      const padBottom = al.padBottom ?? al.padY ?? 0;
      const padLeft = al.padLeft ?? al.padX ?? 0;
      if (padTop > 0) yogaNode.setPadding(Yoga.EDGE_TOP, padTop);
      if (padRight > 0) yogaNode.setPadding(Yoga.EDGE_RIGHT, padRight);
      if (padBottom > 0) yogaNode.setPadding(Yoga.EDGE_BOTTOM, padBottom);
      if (padLeft > 0) yogaNode.setPadding(Yoga.EDGE_LEFT, padLeft);

      if (al.align) {
        const justifyMap: Record<string, number> = {
          MIN: Yoga.JUSTIFY_FLEX_START,
          CENTER: Yoga.JUSTIFY_CENTER,
          MAX: Yoga.JUSTIFY_FLEX_END,
          SPACE_BETWEEN: Yoga.JUSTIFY_SPACE_BETWEEN,
        };
        const justify = justifyMap[al.align];
        if (justify !== undefined) yogaNode.setJustifyContent(justify);
      }

      if (al.counterAlign) {
        const alignMap: Record<string, number> = {
          MIN: Yoga.ALIGN_FLEX_START,
          CENTER: Yoga.ALIGN_CENTER,
          MAX: Yoga.ALIGN_FLEX_END,
        };
        const align = alignMap[al.counterAlign];
        if (align !== undefined) yogaNode.setAlignItems(align);
      }

      const widthSizing = al.widthSizing ?? al.sizing;
      const heightSizing = al.heightSizing ?? al.sizing;

      if (widthSizing === "FILL") {
        yogaNode.setFlexGrow(1);
        yogaNode.setFlexBasis(0);
      }
      if (heightSizing === "HUG" || widthSizing === "HUG") {
        if (widthSizing === "HUG" && dslNode.size) {
          yogaNode.setWidth(undefined as unknown as number);
        }
        if (heightSizing === "HUG" && dslNode.size) {
          yogaNode.setHeight(undefined as unknown as number);
        }
      }
    }

    // Per-child sizing overrides
    if (dslNode.layoutSizingHorizontal === "FILL") {
      yogaNode.setFlexGrow(1);
      yogaNode.setFlexBasis(0);
      yogaNode.setWidth(undefined as unknown as number);
    }
    if (dslNode.layoutSizingVertical === "FILL") {
      yogaNode.setAlignSelf(Yoga.ALIGN_STRETCH);
    }

    // layoutGrow (spacer/flex-grow)
    if (dslNode.layoutGrow !== undefined && dslNode.layoutGrow > 0) {
      yogaNode.setFlexGrow(dslNode.layoutGrow);
      yogaNode.setFlexBasis(0);
    }

    // Text node measure function
    if (dslNode.type === "TEXT" && dslNode.characters) {
      const measurement = measureText(dslNode.characters, dslNode.textStyle);
      textLines.set(dslNode, measurement.lines);

      const fontSize = dslNode.textStyle?.fontSize ?? 14;
      const fontWeight = dslNode.textStyle?.fontWeight ?? 400;
      const lineHeight = resolveLineHeight(dslNode.textStyle, fontSize);
      const letterSpacing = resolveLetterSpacing(dslNode.textStyle, fontSize);
      const textColor = dslNode.textStyle?.color
        ? hex(dslNode.textStyle.color)
        : { r: 0, g: 0, b: 0, a: 1 };

      textStyles.set(dslNode, {
        fontFamily: dslNode.textStyle?.fontFamily ?? "Inter",
        fontWeight,
        fontSize,
        lineHeight,
        letterSpacing,
        textAlignHorizontal:
          dslNode.textStyle?.textAlignHorizontal ?? "LEFT",
        color: textColor,
      });

      yogaNode.setMeasureFunc(() => ({
        width: measurement.width,
        height: measurement.height,
      }));
    }

    // Build children
    if (dslNode.children) {
      for (let i = 0; i < dslNode.children.length; i++) {
        const childYoga = buildYogaNode(dslNode.children[i]!);
        yogaNode.insertChild(childYoga, i);
      }
    }

    return yogaNode;
  }

  const yogaRoot = buildYogaNode(root);
  yogaRoot.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

  function extractLayout(dslNode: DslNode, yogaNode: YogaNode): void {
    layouts.set(dslNode, {
      x: yogaNode.getComputedLeft(),
      y: yogaNode.getComputedTop(),
      width: yogaNode.getComputedWidth(),
      height: yogaNode.getComputedHeight(),
    });

    if (dslNode.children) {
      for (let i = 0; i < dslNode.children.length; i++) {
        extractLayout(dslNode.children[i]!, yogaNode.getChild(i));
      }
    }
  }

  extractLayout(root, yogaRoot);

  for (const node of yogaNodes) {
    node.free();
  }

  return { layouts, textStyles, textLines };
}
