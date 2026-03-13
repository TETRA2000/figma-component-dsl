import { describe, expect, it } from "vitest";
import {
  component,
  componentSet,
  ellipse,
  frame,
  group,
  instance,
  rectangle,
  text,
} from "./factories.js";
import { solid } from "../colors/index.js";
import { horizontal, vertical } from "./layout.js";

describe("frame", () => {
  it("creates a basic frame", () => {
    const node = frame("Container");
    expect(node.type).toBe("FRAME");
    expect(node.name).toBe("Container");
  });

  it("creates a frame with size and fills", () => {
    const node = frame("Box", {
      size: { x: 100, y: 50 },
      fills: [solid("#ff0000")],
    });
    expect(node.size).toEqual({ x: 100, y: 50 });
    expect(node.fills).toHaveLength(1);
    expect(node.fills![0]!.type).toBe("SOLID");
  });

  it("creates a frame with auto-layout", () => {
    const node = frame("Row", {
      autoLayout: horizontal({ spacing: 8 }),
    });
    expect(node.autoLayout?.direction).toBe("HORIZONTAL");
    expect(node.autoLayout?.spacing).toBe(8);
  });

  it("creates a frame with children", () => {
    const child = rectangle("Rect", { size: { x: 50, y: 50 } });
    const parent = frame("Parent", { children: [child] });
    expect(parent.children).toHaveLength(1);
    expect(parent.children![0]!.name).toBe("Rect");
  });

  it("defensively copies children array", () => {
    const children = [rectangle("A", { size: { x: 10, y: 10 } })];
    const node = frame("Parent", { children });
    expect(node.children).not.toBe(children);
    expect(node.children).toEqual(children);
  });

  it("supports corner radius", () => {
    const node = frame("Rounded", { cornerRadius: 16 });
    expect(node.cornerRadius).toBe(16);
  });

  it("supports per-corner radii", () => {
    const radii = { topLeft: 8, topRight: 8, bottomLeft: 0, bottomRight: 0 };
    const node = frame("PartialRound", { cornerRadii: radii });
    expect(node.cornerRadii).toEqual(radii);
  });

  it("supports opacity and visibility", () => {
    const node = frame("Transparent", { opacity: 0.5, visible: false });
    expect(node.opacity).toBe(0.5);
    expect(node.visible).toBe(false);
  });

  it("supports clipContent", () => {
    const node = frame("Clipped", { clipContent: true });
    expect(node.clipContent).toBe(true);
  });

  it("supports layoutGrow and sizing overrides", () => {
    const node = frame("Flex", {
      layoutGrow: 1,
      layoutSizingHorizontal: "FILL",
      layoutSizingVertical: "HUG",
    });
    expect(node.layoutGrow).toBe(1);
    expect(node.layoutSizingHorizontal).toBe("FILL");
    expect(node.layoutSizingVertical).toBe("HUG");
  });

  it("throws on empty name", () => {
    expect(() => frame("")).toThrow("non-empty");
  });

  it("throws on non-positive size", () => {
    expect(() => frame("Bad", { size: { x: 0, y: 100 } })).toThrow(
      "positive",
    );
    expect(() => frame("Bad", { size: { x: 100, y: -5 } })).toThrow(
      "positive",
    );
  });
});

describe("text", () => {
  it("creates a text node", () => {
    const node = text("Hello World");
    expect(node.type).toBe("TEXT");
    expect(node.characters).toBe("Hello World");
    expect(node.name).toBe("Hello World");
  });

  it("truncates long names", () => {
    const long = "A".repeat(50);
    const node = text(long);
    expect(node.name).toHaveLength(31); // 30 + "…"
    expect(node.characters).toBe(long);
  });

  it("creates a text node with style", () => {
    const node = text("Styled", {
      fontWeight: 700,
      fontSize: 24,
      color: "#000000",
    });
    expect(node.textStyle?.fontWeight).toBe(700);
    expect(node.textStyle?.fontSize).toBe(24);
    expect(node.textStyle?.color).toBe("#000000");
  });

  it("throws on empty characters", () => {
    expect(() => text("")).toThrow("non-empty");
  });
});

describe("rectangle", () => {
  it("creates a rectangle", () => {
    const node = rectangle("Rect", { size: { x: 100, y: 100 } });
    expect(node.type).toBe("RECTANGLE");
    expect(node.size).toEqual({ x: 100, y: 100 });
  });

  it("does not allow auto-layout", () => {
    // Rectangle should not have autoLayout property in its props type
    const node = rectangle("Rect");
    expect(node.autoLayout).toBeUndefined();
  });

  it("does not allow children", () => {
    const node = rectangle("Rect");
    expect(node.children).toBeUndefined();
  });
});

describe("ellipse", () => {
  it("creates an ellipse", () => {
    const node = ellipse("Circle", { size: { x: 40, y: 40 } });
    expect(node.type).toBe("ELLIPSE");
    expect(node.size).toEqual({ x: 40, y: 40 });
  });
});

describe("group", () => {
  it("creates a group with children", () => {
    const a = rectangle("A", { size: { x: 10, y: 10 } });
    const b = rectangle("B", { size: { x: 20, y: 20 } });
    const node = group("Group1", [a, b]);
    expect(node.type).toBe("GROUP");
    expect(node.children).toHaveLength(2);
  });

  it("throws on empty name", () => {
    expect(() => group("", [])).toThrow("non-empty");
  });
});

describe("component", () => {
  it("creates a component node", () => {
    const node = component("Button", {
      autoLayout: horizontal({ spacing: 8, align: "CENTER" }),
      fills: [solid("#7c3aed")],
      children: [text("Click me")],
    });
    expect(node.type).toBe("COMPONENT");
    expect(node.autoLayout?.direction).toBe("HORIZONTAL");
    expect(node.children).toHaveLength(1);
  });

  it("supports component properties", () => {
    const node = component("Button", {
      componentProperties: [
        { name: "Label", type: "TEXT", defaultValue: "Button" },
        { name: "Disabled", type: "BOOLEAN", defaultValue: false },
      ],
    });
    expect(node.componentProperties).toHaveLength(2);
    expect(node.componentProperties![0]!.name).toBe("Label");
  });
});

describe("componentSet", () => {
  it("creates a component set with variant children", () => {
    const primary = component("Style=Primary, Size=Medium");
    const secondary = component("Style=Secondary, Size=Medium");
    const node = componentSet("Button", {
      children: [primary, secondary],
      variantAxes: {
        Style: ["Primary", "Secondary"],
        Size: ["Medium"],
      },
    });
    expect(node.type).toBe("COMPONENT_SET");
    expect(node.children).toHaveLength(2);
    expect(node.variantAxes?.Style).toEqual(["Primary", "Secondary"]);
  });

  it("throws when children are not components", () => {
    expect(() =>
      componentSet("Bad", {
        children: [rectangle("NotAComponent")],
      }),
    ).toThrow("COMPONENT");
  });
});

describe("instance", () => {
  it("creates an instance referencing a component", () => {
    const node = instance("Button");
    expect(node.type).toBe("INSTANCE");
    expect(node.componentRef).toBe("Button");
    expect(node.name).toBe("Button");
  });

  it("creates an instance with property overrides", () => {
    const node = instance("Button", {
      Label: "Submit",
      Disabled: true,
    });
    expect(node.propertyOverrides?.Label).toBe("Submit");
    expect(node.propertyOverrides?.Disabled).toBe(true);
  });

  it("defensively copies overrides", () => {
    const overrides = { Label: "Test" };
    const node = instance("Button", overrides);
    expect(node.propertyOverrides).not.toBe(overrides);
  });

  it("throws on empty componentRef", () => {
    expect(() => instance("")).toThrow("non-empty");
  });
});

describe("layout helpers", () => {
  it("horizontal creates horizontal layout", () => {
    const layout = horizontal();
    expect(layout.direction).toBe("HORIZONTAL");
  });

  it("vertical creates vertical layout with config", () => {
    const layout = vertical({
      spacing: 16,
      padX: 24,
      padY: 24,
      align: "CENTER",
      counterAlign: "CENTER",
      sizing: "HUG",
    });
    expect(layout.direction).toBe("VERTICAL");
    expect(layout.spacing).toBe(16);
    expect(layout.padX).toBe(24);
    expect(layout.align).toBe("CENTER");
    expect(layout.sizing).toBe("HUG");
  });

  it("supports per-side padding", () => {
    const layout = horizontal({
      padTop: 8,
      padRight: 16,
      padBottom: 8,
      padLeft: 16,
    });
    expect(layout.padTop).toBe(8);
    expect(layout.padRight).toBe(16);
  });

  it("supports per-axis sizing", () => {
    const layout = horizontal({
      widthSizing: "FILL",
      heightSizing: "HUG",
    });
    expect(layout.widthSizing).toBe("FILL");
    expect(layout.heightSizing).toBe("HUG");
  });
});
