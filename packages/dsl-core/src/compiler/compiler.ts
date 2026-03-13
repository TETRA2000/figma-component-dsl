import type { DslNode, Fill, StrokePaint } from "../nodes/types.js";
import type {
  CompileError,
  CompileResult,
  CompiledNode,
  Guid,
  ResolvedFill,
  ResolvedStroke,
  ResolvedTextStyle,
  Transform,
} from "./types.js";
import { ComponentRegistry } from "./component-registry.js";
import { computeLayout, type LayoutData } from "./yoga-mapper.js";

const IDENTITY_TRANSFORM: Transform = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];

/**
 * Compile a DslNode tree into a CompiledNode tree with GUIDs,
 * parent references, transform matrices, and resolved components.
 */
export function compile(node: DslNode): CompileResult {
  const errors: CompileError[] = [];
  let guidCounter = 0;

  // Phase 1: Register all components
  const registry = new ComponentRegistry();
  registry.registerAll(node);

  // Phase 2: Compute Yoga layout
  const layoutData = computeLayout(node);

  function nextGuid(): Guid {
    return [0, guidCounter++] as const;
  }

  function resolveFill(fill: Fill): ResolvedFill {
    if (fill.type === "SOLID") {
      return {
        type: "SOLID",
        color: fill.color,
        opacity: fill.opacity,
      };
    }
    return {
      type: "GRADIENT_LINEAR",
      gradientStops: fill.gradientStops,
      gradientTransform: fill.gradientTransform,
      opacity: fill.opacity,
    };
  }

  function resolveStroke(stroke: StrokePaint): ResolvedStroke {
    return {
      color: stroke.color,
      weight: stroke.weight,
      align: stroke.align ?? "CENTER",
    };
  }

  function resolvePadding(dslNode: DslNode): {
    paddingTop?: number;
    paddingRight?: number;
    paddingBottom?: number;
    paddingLeft?: number;
  } {
    const al = dslNode.autoLayout;
    if (al === undefined) return {};

    const padTop = al.padTop ?? al.padY ?? 0;
    const padRight = al.padRight ?? al.padX ?? 0;
    const padBottom = al.padBottom ?? al.padY ?? 0;
    const padLeft = al.padLeft ?? al.padX ?? 0;

    return {
      ...(padTop > 0 && { paddingTop: padTop }),
      ...(padRight > 0 && { paddingRight: padRight }),
      ...(padBottom > 0 && { paddingBottom: padBottom }),
      ...(padLeft > 0 && { paddingLeft: padLeft }),
    };
  }

  function validateVariantNaming(dslNode: DslNode, path: string): void {
    if (dslNode.type !== "COMPONENT_SET" || !dslNode.children) return;
    const keyValuePattern = /^[^=]+=.+$/;
    for (const child of dslNode.children) {
      if (child.type === "COMPONENT") {
        const parts = child.name.split(",").map((s) => s.trim());
        const valid = parts.every((part) => keyValuePattern.test(part));
        if (!valid) {
          errors.push({
            message: `Variant "${child.name}" does not follow Key=Value naming convention`,
            nodePath: `${path} > ${child.name}`,
            nodeType: child.type,
          });
        }
      }
    }
  }

  function compileNode(
    dslNode: DslNode,
    parentGuid: Guid | undefined,
    childIndex: number,
    parentTransform: Transform,
    path: string,
  ): CompiledNode {
    const guid = nextGuid();

    // Handle INSTANCE resolution
    if (dslNode.type === "INSTANCE" && dslNode.componentRef) {
      const resolved = registry.resolve(dslNode.componentRef);
      if (!resolved) {
        errors.push({
          message: `Unresolved component reference: '${dslNode.componentRef}'`,
          nodePath: path,
          nodeType: dslNode.type,
        });
      }
    }

    // Validate COMPONENT_SET variant naming
    validateVariantNaming(dslNode, path);

    // Use Yoga-computed layout if available, fall back to DSL size
    const layout = layoutData.layouts.get(dslNode);
    const position = layout
      ? { x: layout.x, y: layout.y }
      : { x: 0, y: 0 };
    const size = layout
      ? { x: layout.width, y: layout.height }
      : dslNode.size ?? { x: 0, y: 0 };

    const transform: Transform =
      parentGuid === undefined
        ? IDENTITY_TRANSFORM
        : composeTransform(parentTransform, position.x, position.y);

    const fills: ResolvedFill[] = dslNode.fills
      ? dslNode.fills.map(resolveFill)
      : [];

    const strokes: ResolvedStroke[] | undefined = dslNode.strokes
      ? dslNode.strokes.map(resolveStroke)
      : undefined;

    const al = dslNode.autoLayout;
    const padding = resolvePadding(dslNode);

    const children: CompiledNode[] = dslNode.children
      ? dslNode.children.map((child, i) =>
          compileNode(child, guid, i, transform, `${path} > ${child.name}`),
        )
      : [];

    // Determine componentId for COMPONENT and INSTANCE nodes
    const componentId =
      dslNode.type === "COMPONENT" || dslNode.type === "COMPONENT_SET"
        ? dslNode.name
        : dslNode.componentRef;

    return {
      guid,
      type: dslNode.type,
      name: dslNode.name,
      size,
      position,
      transform,
      fills,
      ...(strokes !== undefined && { strokes }),
      ...(dslNode.cornerRadius !== undefined && {
        cornerRadius: dslNode.cornerRadius,
      }),
      ...(dslNode.cornerRadii !== undefined && {
        cornerRadii: dslNode.cornerRadii,
      }),
      opacity: dslNode.opacity ?? 1,
      visible: dslNode.visible ?? true,
      ...(dslNode.clipContent !== undefined && {
        clipContent: dslNode.clipContent,
      }),
      children,
      ...(parentGuid !== undefined && {
        parentIndex: {
          guid: parentGuid,
          position: String(childIndex),
        },
      }),

      // Auto-layout passthrough
      ...(al !== undefined && {
        stackMode: al.direction,
        ...(al.spacing !== undefined && { itemSpacing: al.spacing }),
        ...padding,
        ...(al.align !== undefined && { primaryAxisAlignItems: al.align }),
        ...(al.counterAlign !== undefined && {
          counterAxisAlignItems: al.counterAlign,
        }),
      }),
      ...(dslNode.layoutSizingHorizontal !== undefined && {
        layoutSizingHorizontal: dslNode.layoutSizingHorizontal,
      }),
      ...(dslNode.layoutSizingVertical !== undefined && {
        layoutSizingVertical: dslNode.layoutSizingVertical,
      }),

      // Text
      ...(dslNode.characters !== undefined && {
        characters: dslNode.characters,
      }),
      ...(layoutData.textStyles.has(dslNode) && {
        textStyle: layoutData.textStyles.get(dslNode),
      }),
      ...(layoutData.textLines.has(dslNode) && {
        textLines: layoutData.textLines.get(dslNode),
      }),

      // Component properties
      ...(dslNode.componentProperties !== undefined && {
        componentProperties: Object.fromEntries(
          dslNode.componentProperties.map((p) => [
            p.name,
            { type: p.type, defaultValue: p.defaultValue },
          ]),
        ),
      }),

      // Component/Instance ID
      ...(componentId !== undefined && { componentId }),

      // Instance overrides
      ...(dslNode.propertyOverrides !== undefined && {
        overriddenProperties: { ...dslNode.propertyOverrides },
      }),
    };
  }

  const root = compileNode(node, undefined, 0, IDENTITY_TRANSFORM, node.name);

  return {
    root,
    nodeCount: guidCounter,
    errors,
  };
}

function composeTransform(
  parent: Transform,
  dx: number,
  dy: number,
): Transform {
  return [
    [
      parent[0][0],
      parent[0][1],
      parent[0][0] * dx + parent[0][1] * dy + parent[0][2],
    ],
    [
      parent[1][0],
      parent[1][1],
      parent[1][0] * dx + parent[1][1] * dy + parent[1][2],
    ],
    [0, 0, 1],
  ] as const;
}
