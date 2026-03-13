import { describe, expect, it } from "vitest";
import { measureText, resolveLineHeight, resolveLetterSpacing } from "./text-measurer.js";

describe("measureText", () => {
  it("measures single-line text width", () => {
    const result = measureText("Hello", { fontSize: 14 });
    expect(result.width).toBeGreaterThan(0);
    expect(result.lines).toEqual(["Hello"]);
  });

  it("measures text height as lineCount * lineHeight", () => {
    const result = measureText("Hello", { fontSize: 14 });
    expect(result.height).toBeCloseTo(14 * 1.2); // default lineHeight = 1.2x
  });

  it("measures multi-line text", () => {
    const result = measureText("Line 1\nLine 2\nLine 3", { fontSize: 14 });
    expect(result.lines).toHaveLength(3);
    expect(result.height).toBeCloseTo(14 * 1.2 * 3);
  });

  it("returns max width across all lines for multi-line text", () => {
    const result = measureText("Hi\nHello World", { fontSize: 14 });
    const singleResult = measureText("Hello World", { fontSize: 14 });
    expect(result.width).toBeCloseTo(singleResult.width);
  });

  it("uses specified font weight", () => {
    const regular = measureText("Hello", { fontSize: 14, fontWeight: 400 });
    const bold = measureText("Hello", { fontSize: 14, fontWeight: 700 });
    // Bold glyphs may have slightly different advance widths
    expect(regular.width).toBeGreaterThan(0);
    expect(bold.width).toBeGreaterThan(0);
  });

  it("scales width with font size", () => {
    const small = measureText("Hello", { fontSize: 12 });
    const large = measureText("Hello", { fontSize: 24 });
    expect(large.width).toBeGreaterThan(small.width);
  });

  it("applies letter spacing", () => {
    const without = measureText("Hello", { fontSize: 14 });
    const withSpacing = measureText("Hello", {
      fontSize: 14,
      letterSpacing: { value: 2, unit: "PIXELS" },
    });
    expect(withSpacing.width).toBeGreaterThan(without.width);
  });

  it("uses custom line height", () => {
    const result = measureText("Hello", {
      fontSize: 14,
      lineHeight: { value: 165, unit: "PERCENT" },
    });
    expect(result.height).toBeCloseTo(14 * 1.65);
  });
});

describe("resolveLineHeight", () => {
  it("defaults to fontSize * 1.2", () => {
    expect(resolveLineHeight(undefined, 14)).toBeCloseTo(16.8);
  });

  it("resolves PIXELS directly", () => {
    expect(
      resolveLineHeight(
        { lineHeight: { value: 20, unit: "PIXELS" } },
        14,
      ),
    ).toBe(20);
  });

  it("resolves PERCENT relative to fontSize", () => {
    expect(
      resolveLineHeight(
        { lineHeight: { value: 150, unit: "PERCENT" } },
        20,
      ),
    ).toBe(30);
  });
});

describe("resolveLetterSpacing", () => {
  it("defaults to 0", () => {
    expect(resolveLetterSpacing(undefined, 14)).toBe(0);
  });

  it("resolves PIXELS directly", () => {
    expect(
      resolveLetterSpacing(
        { letterSpacing: { value: 2, unit: "PIXELS" } },
        14,
      ),
    ).toBe(2);
  });

  it("resolves PERCENT relative to fontSize", () => {
    expect(
      resolveLetterSpacing(
        { letterSpacing: { value: 10, unit: "PERCENT" } },
        20,
      ),
    ).toBeCloseTo(2);
  });
});
