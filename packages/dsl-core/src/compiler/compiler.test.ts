import { describe, expect, it } from "vitest";
import { compile } from "./compiler.js";
import { frame, text, rectangle, ellipse, group } from "../nodes/factories.js";
import { solid } from "../colors/index.js";
import { horizontal, vertical } from "../nodes/layout.js";
import type { CompiledNode } from "./types.js";

describe("compile — GUID assignment", () => {
  it("assigns GUID [0, 0] to the root node", () => {
    const result = compile(frame("Root"));
    expect(result.root.guid).toEqual([0, 0]);
  });

  it("assigns incrementing GUIDs depth-first", () => {
    const tree = frame("Parent", {
      children: [
        rectangle("A"),
        rectangle("B"),
      ],
    });
    const result = compile(tree);
    expect(result.root.guid).toEqual([0, 0]);
    expect(result.root.children[0]!.guid).toEqual([0, 1]);
    expect(result.root.children[1]!.guid).toEqual([0, 2]);
  });

  it("assigns GUIDs depth-first for nested children", () => {
    const tree = frame("Root", {
      children: [
        frame("Child1", {
          children: [rectangle("Grandchild1")],
        }),
        rectangle("Child2"),
      ],
    });
    const result = compile(tree);
    expect(result.root.guid).toEqual([0, 0]); // Root
    expect(result.root.children[0]!.guid).toEqual([0, 1]); // Child1
    expect(result.root.children[0]!.children[0]!.guid).toEqual([0, 2]); // Grandchild1
    expect(result.root.children[1]!.guid).toEqual([0, 3]); // Child2
  });

  it("generates deterministic GUIDs across multiple compilations", () => {
    const tree = frame("Root", { children: [rectangle("A")] });
    const result1 = compile(tree);
    const result2 = compile(tree);
    expect(result1.root.guid).toEqual(result2.root.guid);
    expect(result1.root.children[0]!.guid).toEqual(result2.root.children[0]!.guid);
  });
});

describe("compile — parent references", () => {
  it("root node has no parentIndex", () => {
    const result = compile(frame("Root"));
    expect(result.root.parentIndex).toBeUndefined();
  });

  it("children have parentIndex referencing parent GUID", () => {
    const tree = frame("Parent", {
      children: [rectangle("A"), rectangle("B")],
    });
    const result = compile(tree);
    expect(result.root.children[0]!.parentIndex).toEqual({
      guid: [0, 0],
      position: "0",
    });
    expect(result.root.children[1]!.parentIndex).toEqual({
      guid: [0, 0],
      position: "1",
    });
  });

  it("nested children reference their immediate parent", () => {
    const tree = frame("Root", {
      children: [
        frame("Inner", {
          children: [rectangle("Leaf")],
        }),
      ],
    });
    const result = compile(tree);
    const inner = result.root.children[0]!;
    const leaf = inner.children[0]!;
    expect(inner.parentIndex?.guid).toEqual([0, 0]);
    expect(leaf.parentIndex?.guid).toEqual([0, 1]);
    expect(leaf.parentIndex?.position).toBe("0");
  });
});

describe("compile — CompileResult structure", () => {
  it("produces correct nodeCount for single node", () => {
    const result = compile(frame("Root"));
    expect(result.nodeCount).toBe(1);
  });

  it("produces correct nodeCount for tree", () => {
    const tree = frame("Root", {
      children: [
        frame("A", { children: [rectangle("A1"), rectangle("A2")] }),
        rectangle("B"),
      ],
    });
    const result = compile(tree);
    expect(result.nodeCount).toBe(5);
  });

  it("starts with empty errors array", () => {
    const result = compile(frame("Root"));
    expect(result.errors).toEqual([]);
  });
});

describe("compile — transform matrices", () => {
  it("assigns identity transform to root node", () => {
    const result = compile(frame("Root"));
    expect(result.root.transform).toEqual([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);
  });

  it("root position is (0, 0)", () => {
    const result = compile(frame("Root", { size: { x: 100, y: 50 } }));
    expect(result.root.position).toEqual({ x: 0, y: 0 });
  });
});

describe("compile — node property passthrough", () => {
  it("passes through name and type", () => {
    const result = compile(frame("MyFrame"));
    expect(result.root.name).toBe("MyFrame");
    expect(result.root.type).toBe("FRAME");
  });

  it("passes through size", () => {
    const result = compile(frame("F", { size: { x: 200, y: 100 } }));
    expect(result.root.size).toEqual({ x: 200, y: 100 });
  });

  it("defaults size to 0x0 when not specified", () => {
    const result = compile(frame("F"));
    expect(result.root.size).toEqual({ x: 0, y: 0 });
  });

  it("defaults opacity to 1 and visible to true", () => {
    const result = compile(frame("F"));
    expect(result.root.opacity).toBe(1);
    expect(result.root.visible).toBe(true);
  });

  it("passes through opacity and visible", () => {
    const result = compile(frame("F", { opacity: 0.5, visible: false }));
    expect(result.root.opacity).toBe(0.5);
    expect(result.root.visible).toBe(false);
  });

  it("passes through cornerRadius", () => {
    const result = compile(frame("F", { cornerRadius: 16 }));
    expect(result.root.cornerRadius).toBe(16);
  });

  it("passes through cornerRadii", () => {
    const radii = { topLeft: 8, topRight: 8, bottomLeft: 0, bottomRight: 0 };
    const result = compile(frame("F", { cornerRadii: radii }));
    expect(result.root.cornerRadii).toEqual(radii);
  });

  it("passes through clipContent", () => {
    const result = compile(frame("F", { clipContent: true }));
    expect(result.root.clipContent).toBe(true);
  });

  it("resolves solid fills to ResolvedFill format", () => {
    const result = compile(
      frame("F", { fills: [solid("#ff0000")] }),
    );
    expect(result.root.fills).toHaveLength(1);
    expect(result.root.fills[0]!.type).toBe("SOLID");
    expect(result.root.fills[0]!.color?.r).toBeCloseTo(1);
    expect(result.root.fills[0]!.opacity).toBe(1);
  });

  it("resolves strokes to ResolvedStroke format", () => {
    const result = compile(
      frame("F", {
        strokes: [{ color: { r: 0, g: 0, b: 0, a: 1 }, weight: 2 }],
      }),
    );
    expect(result.root.strokes).toHaveLength(1);
    expect(result.root.strokes![0]!.weight).toBe(2);
    expect(result.root.strokes![0]!.align).toBe("CENTER");
  });

  it("passes through auto-layout as stackMode and layout properties", () => {
    const result = compile(
      frame("F", {
        autoLayout: horizontal({ spacing: 8, padX: 16, padY: 12 }),
      }),
    );
    expect(result.root.stackMode).toBe("HORIZONTAL");
    expect(result.root.itemSpacing).toBe(8);
    expect(result.root.paddingLeft).toBe(16);
    expect(result.root.paddingRight).toBe(16);
    expect(result.root.paddingTop).toBe(12);
    expect(result.root.paddingBottom).toBe(12);
  });

  it("passes through text properties", () => {
    const result = compile(
      text("Hello", { fontSize: 14, fontWeight: 700, color: "#000000" }),
    );
    expect(result.root.characters).toBe("Hello");
    expect(result.root.type).toBe("TEXT");
  });

  it("compiles all node types", () => {
    const types: string[] = [];
    const tree = frame("Root", {
      children: [
        text("T"),
        rectangle("R"),
        ellipse("E"),
        group("G", [rectangle("Inner")]),
      ],
    });
    const result = compile(tree);
    for (const child of result.root.children) {
      types.push(child.type);
    }
    expect(types).toEqual(["TEXT", "RECTANGLE", "ELLIPSE", "GROUP"]);
  });

  it("preserves multiple fills in order", () => {
    const result = compile(
      frame("F", {
        fills: [solid("#ff0000"), solid("#00ff00", 0.5)],
      }),
    );
    expect(result.root.fills).toHaveLength(2);
    expect(result.root.fills[0]!.color?.r).toBeCloseTo(1);
    expect(result.root.fills[1]!.color?.g).toBeCloseTo(1);
    expect(result.root.fills[1]!.opacity).toBe(0.5);
  });
});
