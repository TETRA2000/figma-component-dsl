import { describe, expect, it } from "vitest";
import { render } from "./renderer.js";
import {
  compile,
  frame,
  text,
  rectangle,
  ellipse,
  solid,
  gradient,
  horizontal,
  vertical,
  stroke,
} from "@figma-dsl/core";

describe("render", () => {
  it("renders a simple colored frame", () => {
    const tree = frame("Box", {
      size: { x: 100, y: 50 },
      fills: [solid("#7c3aed")],
    });
    const compiled = compile(tree);
    const result = render(compiled.root, { backgroundColor: "#ffffff" });
    expect(result.buffer.length).toBeGreaterThan(0);
    expect(result.width).toBe(100);
    expect(result.height).toBe(50);
    expect(result.errors).toHaveLength(0);
  });

  it("renders text with font", () => {
    const tree = frame("Button", {
      autoLayout: horizontal({ padX: 16, padY: 8 }),
      fills: [solid("#7c3aed")],
      children: [
        text("Click me", { fontSize: 14, fontWeight: 500, color: "#ffffff" }),
      ],
    });
    const compiled = compile(tree);
    const result = render(compiled.root, { backgroundColor: "#ffffff" });
    expect(result.buffer.length).toBeGreaterThan(0);
    expect(result.width).toBeGreaterThan(40);
    expect(result.errors).toHaveLength(0);
  });

  it("renders nested frames with auto-layout", () => {
    const tree = frame("Card", {
      size: { x: 300, y: 200 },
      autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
      fills: [solid("#ffffff")],
      strokes: [{ color: { r: 0.9, g: 0.9, b: 0.9, a: 1 }, weight: 1 }],
      cornerRadius: 16,
      children: [
        text("Title", { fontSize: 24, fontWeight: 700, color: "#111827" }),
        text("Description text", { fontSize: 14, color: "#6b7280" }),
      ],
    });
    const compiled = compile(tree);
    const result = render(compiled.root, { backgroundColor: "#f3f4f6" });
    expect(result.buffer.length).toBeGreaterThan(0);
    expect(result.errors).toHaveLength(0);
  });

  it("renders gradient fills", () => {
    const tree = frame("Gradient", {
      size: { x: 200, y: 100 },
      fills: [
        gradient(
          [
            { hex: "#7c3aed", position: 0 },
            { hex: "#4f46e5", position: 1 },
          ],
          90,
        ),
      ],
    });
    const compiled = compile(tree);
    const result = render(compiled.root);
    expect(result.buffer.length).toBeGreaterThan(0);
    expect(result.errors).toHaveLength(0);
  });

  it("renders ellipses", () => {
    const tree = frame("Root", {
      size: { x: 100, y: 100 },
      children: [
        ellipse("Circle", {
          size: { x: 40, y: 40 },
          fills: [solid("#ef4444")],
        }),
      ],
    });
    const compiled = compile(tree);
    const result = render(compiled.root);
    expect(result.errors).toHaveLength(0);
  });

  it("renders with scale factor", () => {
    const tree = frame("Box", {
      size: { x: 100, y: 50 },
      fills: [solid("#000000")],
    });
    const compiled = compile(tree);
    const result = render(compiled.root, { scale: 2 });
    expect(result.width).toBe(200);
    expect(result.height).toBe(100);
  });

  it("skips invisible nodes", () => {
    const tree = frame("Root", {
      size: { x: 100, y: 100 },
      children: [
        rectangle("Hidden", {
          size: { x: 50, y: 50 },
          fills: [solid("#ff0000")],
          visible: false,
        }),
      ],
    });
    const compiled = compile(tree);
    const result = render(compiled.root);
    expect(result.errors).toHaveLength(0);
  });

  it("handles empty root gracefully", () => {
    const tree = frame("Empty");
    const compiled = compile(tree);
    const result = render(compiled.root);
    // Zero-size frame should produce an error
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("renders per-corner radii", () => {
    const tree = frame("Rounded", {
      size: { x: 100, y: 50 },
      fills: [solid("#000000")],
      cornerRadii: {
        topLeft: 16,
        topRight: 16,
        bottomLeft: 0,
        bottomRight: 0,
      },
    });
    const compiled = compile(tree);
    const result = render(compiled.root);
    expect(result.errors).toHaveLength(0);
  });

  it("renders multiple fills in order", () => {
    const tree = frame("MultiFill", {
      size: { x: 100, y: 50 },
      fills: [solid("#ff0000"), solid("#00ff00", 0.5)],
    });
    const compiled = compile(tree);
    const result = render(compiled.root);
    expect(result.errors).toHaveLength(0);
  });

  it("renders strokes with alignment", () => {
    const tree = frame("Stroked", {
      size: { x: 100, y: 50 },
      fills: [solid("#ffffff")],
      strokes: [stroke("#e5e7eb", 1, "INSIDE")],
    });
    const compiled = compile(tree);
    const result = render(compiled.root);
    expect(result.errors).toHaveLength(0);
  });
});
