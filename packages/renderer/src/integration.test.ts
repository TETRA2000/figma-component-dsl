import { describe, expect, it } from "vitest";
import { compile, frame, text, rectangle, ellipse, component, componentSet, instance, group } from "@figma-dsl/core";
import { solid, gradient, hex, stroke, defineTokens, token } from "@figma-dsl/core";
import { horizontal, vertical } from "@figma-dsl/core";
import { render } from "./renderer.js";
import { PNG } from "pngjs";

describe("compile → render integration", () => {
  it("renders a simple colored frame", () => {
    const tree = frame("Box", {
      size: { x: 100, y: 50 },
      fills: [solid("#ff0000")],
    });
    const compiled = compile(tree);
    const result = render(compiled.root, { backgroundColor: "#ffffff" });
    expect(result.width).toBe(100);
    expect(result.height).toBe(50);
    expect(result.buffer.length).toBeGreaterThan(0);
    expect(result.errors).toEqual([]);
  });

  it("renders a button with text", () => {
    const label = text("Click me", { fontSize: 14, fontWeight: 500 });
    const tree = frame("Button", {
      autoLayout: horizontal({ spacing: 8, padX: 16, padY: 8 }),
      fills: [solid("#7c3aed")],
      children: [label],
    });
    const compiled = compile(tree);
    const result = render(compiled.root, { backgroundColor: "#ffffff" });
    expect(result.buffer.length).toBeGreaterThan(0);
    expect(result.errors).toEqual([]);
    // Verify button has auto-sized around text
    expect(result.width).toBeGreaterThan(40);
    expect(result.height).toBeGreaterThan(20);
  });

  it("renders nested auto-layout frames", () => {
    const tree = frame("Card", {
      size: { x: 300, y: 200 },
      autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
      fills: [solid("#ffffff")],
      children: [
        text("Title", { fontSize: 24, fontWeight: 700 }),
        text("Subtitle", { fontSize: 14, color: "#6b7280" }),
        frame("Actions", {
          autoLayout: horizontal({ spacing: 8 }),
          children: [
            frame("Btn1", {
              autoLayout: horizontal({ padX: 16, padY: 8 }),
              fills: [solid("#7c3aed")],
              children: [text("Primary", { fontSize: 14, color: "#ffffff" })],
            }),
            frame("Btn2", {
              autoLayout: horizontal({ padX: 16, padY: 8 }),
              fills: [solid("#e5e7eb")],
              children: [text("Secondary", { fontSize: 14 })],
            }),
          ],
        }),
      ],
    });
    const compiled = compile(tree);
    const result = render(compiled.root, { backgroundColor: "#f3f4f6" });
    expect(result.width).toBe(300);
    expect(result.height).toBe(200);
    expect(result.errors).toEqual([]);
  });

  it("renders with gradients", () => {
    const tree = frame("GradientBox", {
      size: { x: 200, y: 100 },
      fills: [gradient([{ hex: "#7c3aed", position: 0 }, { hex: "#4f46e5", position: 1 }], 45)],
    });
    const compiled = compile(tree);
    const result = render(compiled.root, { backgroundColor: "#ffffff" });
    expect(result.buffer.length).toBeGreaterThan(0);
    expect(result.errors).toEqual([]);
  });

  it("renders ellipses", () => {
    const tree = frame("Container", {
      size: { x: 100, y: 100 },
      children: [
        ellipse("Circle", {
          size: { x: 40, y: 40 },
          fills: [solid("#3b82f6")],
        }),
      ],
    });
    const compiled = compile(tree);
    const result = render(compiled.root);
    expect(result.errors).toEqual([]);
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

  it("deterministic output across runs", () => {
    const tree = frame("Box", {
      size: { x: 50, y: 50 },
      fills: [solid("#ff0000")],
      children: [text("A", { fontSize: 14 })],
    });
    const compiled = compile(tree);
    const r1 = render(compiled.root);
    const r2 = render(compiled.root);
    expect(r1.buffer.equals(r2.buffer)).toBe(true);
  });

  it("renders components and instances", () => {
    const btn = component("Button", {
      autoLayout: horizontal({ padX: 16, padY: 8 }),
      fills: [solid("#7c3aed")],
      componentProperties: [
        { name: "label", type: "TEXT", defaultValue: "Click" },
      ],
      children: [text("Click", { fontSize: 14, color: "#ffffff" })],
    });
    const tree = frame("Root", {
      size: { x: 400, y: 200 },
      autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
      children: [
        btn,
        instance("Button"),
      ],
    });
    const compiled = compile(tree);
    expect(compiled.errors).toEqual([]);
    const result = render(compiled.root);
    expect(result.errors).toEqual([]);
  });

  it("renders strokes and corner radii", () => {
    const tree = frame("Card", {
      size: { x: 200, y: 100 },
      fills: [solid("#ffffff")],
      strokes: [{ color: hex("#e5e7eb"), weight: 1 }],
      cornerRadius: 16,
    });
    const compiled = compile(tree);
    const result = render(compiled.root);
    expect(result.errors).toEqual([]);
  });

  it("renders per-corner radii", () => {
    const tree = frame("Badge", {
      size: { x: 80, y: 30 },
      fills: [solid("#3b82f6")],
      cornerRadii: { topLeft: 8, topRight: 8, bottomLeft: 0, bottomRight: 0 },
    });
    const compiled = compile(tree);
    const result = render(compiled.root);
    expect(result.errors).toEqual([]);
  });
});
