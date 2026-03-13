import { describe, expect, it } from "vitest";
import { computeLayout } from "./yoga-mapper.js";
import { frame, text, rectangle } from "../nodes/factories.js";
import { solid } from "../colors/index.js";
import { horizontal, vertical } from "../nodes/layout.js";

describe("computeLayout", () => {
  it("computes layout for a fixed-size frame", () => {
    const root = frame("Root", { size: { x: 200, y: 100 } });
    const { layouts } = computeLayout(root);
    const layout = layouts.get(root)!;
    expect(layout.width).toBe(200);
    expect(layout.height).toBe(100);
    expect(layout.x).toBe(0);
    expect(layout.y).toBe(0);
  });

  it("computes horizontal layout with spacing", () => {
    const child1 = rectangle("A", { size: { x: 40, y: 20 } });
    const child2 = rectangle("B", { size: { x: 40, y: 20 } });
    const root = frame("Row", {
      size: { x: 200, y: 60 },
      autoLayout: horizontal({ spacing: 8 }),
      children: [child1, child2],
    });
    const { layouts } = computeLayout(root);
    expect(layouts.get(child1)!.x).toBe(0);
    expect(layouts.get(child2)!.x).toBe(48); // 40 + 8 spacing
  });

  it("computes vertical layout with padding", () => {
    const child = rectangle("A", { size: { x: 40, y: 20 } });
    const root = frame("Col", {
      size: { x: 200, y: 100 },
      autoLayout: vertical({ padX: 16, padY: 12 }),
      children: [child],
    });
    const { layouts } = computeLayout(root);
    expect(layouts.get(child)!.x).toBe(16);
    expect(layouts.get(child)!.y).toBe(12);
  });

  it("computes center alignment", () => {
    const child = rectangle("A", { size: { x: 40, y: 20 } });
    const root = frame("Center", {
      size: { x: 200, y: 100 },
      autoLayout: horizontal({ align: "CENTER", counterAlign: "CENTER" }),
      children: [child],
    });
    const { layouts } = computeLayout(root);
    expect(layouts.get(child)!.x).toBe(80); // (200 - 40) / 2
    expect(layouts.get(child)!.y).toBe(40); // (100 - 20) / 2
  });

  it("computes FILL sizing (flexGrow)", () => {
    const fixed = rectangle("Fixed", { size: { x: 40, y: 20 } });
    const filling = rectangle("Fill", {
      layoutSizingHorizontal: "FILL",
    });
    const root = frame("Row", {
      size: { x: 200, y: 60 },
      autoLayout: horizontal({ spacing: 8 }),
      children: [fixed, filling],
    });
    const { layouts } = computeLayout(root);
    expect(layouts.get(filling)!.width).toBe(152); // 200 - 40 - 8
  });

  it("computes layoutGrow for spacers", () => {
    const left = rectangle("Left", { size: { x: 40, y: 20 } });
    const spacer = frame("Spacer", { layoutGrow: 1 });
    const right = rectangle("Right", { size: { x: 40, y: 20 } });
    const root = frame("Row", {
      size: { x: 200, y: 40 },
      autoLayout: horizontal(),
      children: [left, spacer, right],
    });
    const { layouts } = computeLayout(root);
    expect(layouts.get(spacer)!.width).toBe(120); // 200 - 40 - 40
    expect(layouts.get(right)!.x).toBe(160); // 40 + 120
  });

  it("measures text and uses dimensions for layout", () => {
    const label = text("Hello", { fontSize: 14 });
    const root = frame("Button", {
      autoLayout: horizontal({ padX: 16, padY: 8 }),
      children: [label],
    });
    const { layouts, textStyles } = computeLayout(root);
    const textLayout = layouts.get(label)!;
    expect(textLayout.width).toBeGreaterThan(0);
    expect(textLayout.height).toBeGreaterThan(0);
    expect(textStyles.has(label)).toBe(true);
    expect(textStyles.get(label)!.fontSize).toBe(14);
  });

  it("HUG sizing auto-sizes container", () => {
    const label = text("Click me", { fontSize: 14, fontWeight: 500 });
    const root = frame("Button", {
      autoLayout: horizontal({ spacing: 8, padX: 16, padY: 8 }),
      children: [label],
    });
    const { layouts } = computeLayout(root);
    const rootLayout = layouts.get(root)!;
    const textLayout = layouts.get(label)!;
    // Container should auto-size (HUG) around text + padding
    expect(rootLayout.width).toBeCloseTo(textLayout.width + 32); // padX * 2
    expect(rootLayout.height).toBeCloseTo(textLayout.height + 16); // padY * 2
  });

  // Design doc worked example 1: Button with label
  it("worked example: horizontal button with label", () => {
    const label = text("Click me", { fontSize: 14, fontWeight: 500 });
    const root = frame("Button", {
      autoLayout: horizontal({ spacing: 8, padX: 16, padY: 8 }),
      fills: [solid("#7c3aed")],
      children: [label],
    });
    const { layouts } = computeLayout(root);
    const rootLayout = layouts.get(root)!;
    const textLayout = layouts.get(label)!;
    // Text should be at padding offset
    expect(textLayout.x).toBe(16);
    expect(textLayout.y).toBe(8);
    // Container should HUG content
    expect(rootLayout.width).toBeGreaterThan(40); // at least text + padding
    expect(rootLayout.height).toBeGreaterThan(20);
  });
});
