import { describe, expect, it } from "vitest";
import { defineTokens, gradient, hex, solid, stroke, token } from "./index.js";

describe("hex", () => {
  it("parses a hex color string", () => {
    const color = hex("#7c3aed");
    expect(color.r).toBeCloseTo(124 / 255);
    expect(color.g).toBeCloseTo(58 / 255);
    expect(color.b).toBeCloseTo(237 / 255);
    expect(color.a).toBe(1);
  });

  it("parses without hash prefix", () => {
    const color = hex("000000");
    expect(color.r).toBe(0);
    expect(color.g).toBe(0);
    expect(color.b).toBe(0);
  });

  it("parses white", () => {
    const color = hex("#ffffff");
    expect(color.r).toBeCloseTo(1);
    expect(color.g).toBeCloseTo(1);
    expect(color.b).toBeCloseTo(1);
  });

  it("throws on invalid hex", () => {
    expect(() => hex("#xyz")).toThrow("Invalid hex");
    expect(() => hex("#12345")).toThrow("Invalid hex");
    expect(() => hex("")).toThrow("Invalid hex");
  });
});

describe("solid", () => {
  it("creates a solid fill", () => {
    const fill = solid("#ff0000");
    expect(fill.type).toBe("SOLID");
    expect(fill.color.r).toBeCloseTo(1);
    expect(fill.color.g).toBe(0);
    expect(fill.color.b).toBe(0);
    expect(fill.opacity).toBe(1);
    expect(fill.visible).toBe(true);
  });

  it("supports custom opacity", () => {
    const fill = solid("#000000", 0.5);
    expect(fill.opacity).toBe(0.5);
  });
});

describe("gradient", () => {
  it("creates a linear gradient with two stops", () => {
    const fill = gradient([
      { hex: "#7c3aed", position: 0 },
      { hex: "#4f46e5", position: 1 },
    ]);
    expect(fill.type).toBe("GRADIENT_LINEAR");
    expect(fill.gradientStops).toHaveLength(2);
    expect(fill.gradientStops[0]!.position).toBe(0);
    expect(fill.gradientStops[1]!.position).toBe(1);
    expect(fill.opacity).toBe(1);
    expect(fill.visible).toBe(true);
  });

  it("creates a gradient with angle", () => {
    const fill = gradient(
      [
        { hex: "#000000", position: 0 },
        { hex: "#ffffff", position: 1 },
      ],
      90,
    );
    // At 90°, the transform should represent top-to-bottom
    expect(fill.gradientTransform).toBeDefined();
    expect(fill.gradientTransform[0]).toHaveLength(3);
    expect(fill.gradientTransform[1]).toHaveLength(3);
  });

  it("supports 3-stop gradients", () => {
    const fill = gradient([
      { hex: "#4338ca", position: 0 },
      { hex: "#7c3aed", position: 0.5 },
      { hex: "#a855f7", position: 1 },
    ]);
    expect(fill.gradientStops).toHaveLength(3);
  });

  it("throws on fewer than 2 stops", () => {
    expect(() => gradient([{ hex: "#000000", position: 0 }])).toThrow(
      "at least 2",
    );
  });
});

describe("stroke", () => {
  it("creates a stroke paint", () => {
    const s = stroke("#e5e7eb", 1);
    expect(s.weight).toBe(1);
    expect(s.color.r).toBeCloseTo(229 / 255);
  });

  it("supports stroke alignment", () => {
    const s = stroke("#000000", 2, "INSIDE");
    expect(s.align).toBe("INSIDE");
  });
});

describe("defineTokens and token", () => {
  it("creates a color token map", () => {
    const tokens = defineTokens({
      primary: "#7c3aed",
      danger: "#ef4444",
    });
    expect(tokens.primary).toBeDefined();
    expect(tokens.danger).toBeDefined();
  });

  it("resolves a token to a SolidFill", () => {
    const tokens = defineTokens({ primary: "#7c3aed" });
    const fill = token(tokens, "primary");
    expect(fill.type).toBe("SOLID");
    expect(fill.color.r).toBeCloseTo(124 / 255);
  });

  it("throws on unknown token", () => {
    const tokens = defineTokens({ primary: "#7c3aed" });
    expect(() => token(tokens, "nonexistent")).toThrow("Unknown color token");
  });
});
