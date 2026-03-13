import type { DslNode, Fill, StrokePaint } from "../nodes/types.js";
import type {
  CompileError,
  CompileResult,
  CompiledNode,
  Guid,
  ResolvedFill,
  ResolvedStroke,
  Transform,
} from "./types.js";

const IDENTITY_TRANSFORM: Transform = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];

/**
 * Compile a DslNode tree into a CompiledNode tree with GUIDs,
 * parent references, and transform matrices.
 *
 * Note: This initial implementation handles GUID assignment, parent
 * references, property passthrough, and transform composition.
 * Yoga layout and text measurement will be added in Tasks 5.1–5.2.
 */
export function compile(node: DslNode): CompileResult {
  const errors: CompileError[] = [];
  let guidCounter = 0;

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
    // GRADIENT_LINEAR
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

  function resolvePadding(node: DslNode): {
    paddingTop?: number;
    paddingRight?: number;
    paddingBottom?: number;
    paddingLeft?: number;
  } {
    const al = node.autoLayout;
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

  function compileNode(
    dslNode: DslNode,
    parentGuid: Guid | undefined,
    childIndex: number,
    parentTransform: Transform,
    path: string,
  ): CompiledNode {
    const guid = nextGuid();

    // Position: for now, (0,0) since Yoga layout is not yet integrated
    const position = { x: 0, y: 0 };
    const size = dslNode.size ?? { x: 0, y: 0 };

    // Compose transform: parent transform × child offset translation
    // Until Yoga provides computed positions, children are at (0,0) offset
    const transform: Transform = parentGuid === undefined
      ? IDENTITY_TRANSFORM
      : composeTransform(parentTransform, position.x, position.y);

    // Resolve fills
    const fills: ResolvedFill[] = dslNode.fills
      ? dslNode.fills.map(resolveFill)
      : [];

    // Resolve strokes
    const strokes: ResolvedStroke[] | undefined = dslNode.strokes
      ? dslNode.strokes.map(resolveStroke)
      : undefined;

    // Auto-layout passthrough
    const al = dslNode.autoLayout;
    const padding = resolvePadding(dslNode);

    // Compile children
    const children: CompiledNode[] = dslNode.children
      ? dslNode.children.map((child, i) =>
          compileNode(
            child,
            guid,
            i,
            transform,
            `${path} > ${child.name}`,
          ),
        )
      : [];

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

      // Component properties
      ...(dslNode.componentProperties !== undefined && {
        componentProperties: Object.fromEntries(
          dslNode.componentProperties.map((p) => [
            p.name,
            { type: p.type, defaultValue: p.defaultValue },
          ]),
        ),
      }),

      // Instance
      ...(dslNode.componentRef !== undefined && {
        componentId: dslNode.componentRef,
      }),
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

/**
 * Compose a parent transform with a child translation offset.
 * Result = parent × translate(dx, dy)
 */
function composeTransform(
  parent: Transform,
  dx: number,
  dy: number,
): Transform {
  // For a pure translation, the child transform matrix is:
  // [1, 0, dx]
  // [0, 1, dy]
  // [0, 0, 1]
  // Multiplied by parent:
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
