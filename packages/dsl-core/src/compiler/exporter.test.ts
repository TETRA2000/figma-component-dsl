import { describe, expect, it } from "vitest";
import { generatePluginInput } from "./exporter.js";
import { compile } from "./compiler.js";
import { frame, text, rectangle, component, componentSet, instance } from "../nodes/factories.js";
import { solid } from "../colors/index.js";
import { horizontal, vertical } from "../nodes/layout.js";

describe("generatePluginInput", () => {
  it("generates basic plugin input structure", () => {
    const tree = frame("Root", { size: { x: 200, y: 100 } });
    const compiled = compile(tree);
    const input = generatePluginInput(compiled);
    expect(input.version).toBe("1.0");
    expect(input.page).toBe("Component Library");
    expect(input.components).toEqual([]);
  });

  it("uses custom page name", () => {
    const tree = frame("Root");
    const compiled = compile(tree);
    const input = generatePluginInput(compiled, "My Components");
    expect(input.page).toBe("My Components");
  });

  it("collects COMPONENT definitions", () => {
    const tree = frame("Root", {
      children: [
        component("Button", {
          size: { x: 100, y: 40 },
          fills: [solid("#7c3aed")],
          children: [text("Click me")],
        }),
      ],
    });
    const compiled = compile(tree);
    const input = generatePluginInput(compiled);
    expect(input.components).toHaveLength(1);
    expect(input.components[0]!.name).toBe("Button");
    expect(input.components[0]!.type).toBe("COMPONENT");
    expect(input.components[0]!.node.fills).toHaveLength(1);
  });

  it("collects COMPONENT_SET with variants", () => {
    const tree = frame("Root", {
      children: [
        componentSet("ButtonSet", {
          size: { x: 200, y: 100 },
          children: [
            component("Style=Primary", {
              size: { x: 100, y: 40 },
              fills: [solid("#7c3aed")],
            }),
            component("Style=Secondary", {
              size: { x: 100, y: 40 },
              fills: [solid("#e5e7eb")],
            }),
          ],
        }),
      ],
    });
    const compiled = compile(tree);
    const input = generatePluginInput(compiled);

    const setDef = input.components.find((c) => c.type === "COMPONENT_SET");
    expect(setDef).toBeDefined();
    expect(setDef!.name).toBe("ButtonSet");
    expect(setDef!.variants).toHaveLength(2);
    expect(setDef!.variants![0]!.axes).toEqual({ Style: "Primary" });
    expect(setDef!.variants![1]!.axes).toEqual({ Style: "Secondary" });
  });

  it("includes component properties", () => {
    const tree = frame("Root", {
      children: [
        component("Card", {
          size: { x: 200, y: 100 },
          componentProperties: [
            { name: "title", type: "TEXT", defaultValue: "Card Title" },
            { name: "showBadge", type: "BOOLEAN", defaultValue: true },
          ],
          children: [text("Card Title")],
        }),
      ],
    });
    const compiled = compile(tree);
    const input = generatePluginInput(compiled);
    expect(input.components[0]!.properties).toHaveLength(2);
    expect(input.components[0]!.properties![0]!.name).toBe("title");
    expect(input.components[0]!.properties![0]!.type).toBe("TEXT");
  });

  it("preserves auto-layout on plugin nodes", () => {
    const tree = frame("Root", {
      children: [
        component("Button", {
          autoLayout: horizontal({ spacing: 8, padX: 16, padY: 8 }),
          children: [text("Label")],
        }),
      ],
    });
    const compiled = compile(tree);
    const input = generatePluginInput(compiled);
    const node = input.components[0]!.node;
    expect(node.autoLayout).toBeDefined();
    expect(node.autoLayout!.direction).toBe("HORIZONTAL");
    expect(node.autoLayout!.spacing).toBe(8);
    expect(node.autoLayout!.paddingLeft).toBe(16);
    expect(node.autoLayout!.paddingTop).toBe(8);
  });

  it("preserves text style on plugin nodes", () => {
    const tree = frame("Root", {
      children: [
        component("Label", {
          autoLayout: horizontal(),
          children: [text("Hello", { fontSize: 16, fontWeight: 700, color: "#ff0000" })],
        }),
      ],
    });
    const compiled = compile(tree);
    const input = generatePluginInput(compiled);
    const textNode = input.components[0]!.node.children[0]!;
    expect(textNode.characters).toBe("Hello");
    expect(textNode.textStyle).toBeDefined();
    expect(textNode.textStyle!.fontSize).toBe(16);
    expect(textNode.textStyle!.fontWeight).toBe(700);
  });
});
