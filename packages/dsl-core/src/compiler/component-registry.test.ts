import { describe, expect, it } from "vitest";
import { ComponentRegistry, resolveInstance } from "./component-registry.js";
import { compile } from "./compiler.js";
import {
  component,
  componentSet,
  frame,
  instance,
  rectangle,
  text,
} from "../nodes/factories.js";
import { gradient, solid } from "../colors/index.js";
import { horizontal, vertical } from "../nodes/layout.js";

describe("ComponentRegistry", () => {
  it("registers and resolves a component by name", () => {
    const registry = new ComponentRegistry();
    const btn = component("Button", {
      children: [text("Click")],
    });
    registry.register("Button", btn);
    expect(registry.resolve("Button")).toBe(btn);
  });

  it("returns undefined for unregistered components", () => {
    const registry = new ComponentRegistry();
    expect(registry.resolve("NonExistent")).toBeUndefined();
  });

  it("lists all registered names", () => {
    const registry = new ComponentRegistry();
    registry.register("A", component("A"));
    registry.register("B", component("B"));
    expect(registry.names()).toEqual(["A", "B"]);
  });

  it("registerAll walks tree and registers COMPONENT nodes", () => {
    const tree = frame("Root", {
      children: [
        component("Button", {
          children: [text("Click")],
        }),
        component("Badge"),
      ],
    });
    const registry = new ComponentRegistry();
    registry.registerAll(tree);
    expect(registry.names()).toContain("Button");
    expect(registry.names()).toContain("Badge");
  });

  it("registerAll registers COMPONENT_SET variant children", () => {
    const tree = frame("Root", {
      children: [
        componentSet("Button", {
          children: [
            component("Style=Primary, Size=Medium"),
            component("Style=Secondary, Size=Medium"),
          ],
          variantAxes: {
            Style: ["Primary", "Secondary"],
            Size: ["Medium"],
          },
        }),
      ],
    });
    const registry = new ComponentRegistry();
    registry.registerAll(tree);
    expect(registry.names()).toContain("Style=Primary, Size=Medium");
    expect(registry.names()).toContain("Style=Secondary, Size=Medium");
  });
});

describe("resolveInstance", () => {
  it("clones component subtree without overrides", () => {
    const btn = component("Button", {
      children: [text("Click")],
    });
    const resolved = resolveInstance(btn, undefined);
    expect(resolved.name).toBe("Button");
    expect(resolved.children?.[0]?.characters).toBe("Click");
    // Verify it's a clone, not the same object
    expect(resolved).not.toBe(btn);
  });

  it("applies TEXT property override", () => {
    const btn = component("Button", {
      componentProperties: [
        { name: "Label", type: "TEXT", defaultValue: "Click" },
      ],
      children: [text("Click")],
    });
    const resolved = resolveInstance(btn, { Label: "Submit" });
    expect(resolved.children?.[0]?.characters).toBe("Submit");
  });

  it("applies BOOLEAN property override to toggle visibility", () => {
    const btn = component("Button", {
      componentProperties: [
        { name: "Icon", type: "BOOLEAN", defaultValue: true },
      ],
      children: [
        rectangle("Icon", { size: { x: 16, y: 16 } }),
        text("Label"),
      ],
    });
    const resolved = resolveInstance(btn, { Icon: false });
    expect(resolved.children?.[0]?.visible).toBe(false);
  });
});

describe("compile — component registry integration", () => {
  it("resolves INSTANCE nodes using registered components", () => {
    const tree = frame("Root", {
      children: [
        component("Button", {
          fills: [solid("#7c3aed")],
          children: [text("Default")],
        }),
        instance("Button", { Label: "Submit" }),
      ],
    });
    const result = compile(tree);
    // The instance should be compiled (it references a defined component)
    expect(result.root.children).toHaveLength(2);
    expect(result.root.children[1]!.type).toBe("INSTANCE");
    expect(result.root.children[1]!.componentId).toBe("Button");
  });

  it("reports error for unresolved component references", () => {
    const tree = frame("Root", {
      children: [instance("NonExistent")],
    });
    const result = compile(tree);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]!.message).toContain("NonExistent");
  });

  it("compiles unresolved INSTANCE as empty frame with warning", () => {
    const tree = frame("Root", {
      children: [instance("Missing")],
    });
    const result = compile(tree);
    const instanceNode = result.root.children[0]!;
    // Should still be compiled as INSTANCE type but with error
    expect(instanceNode.type).toBe("INSTANCE");
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("component properties are mapped to componentPropertyDefinitions format", () => {
    const tree = component("Button", {
      componentProperties: [
        { name: "Label", type: "TEXT", defaultValue: "Click" },
        { name: "Disabled", type: "BOOLEAN", defaultValue: false },
      ],
    });
    const result = compile(tree);
    expect(result.root.componentProperties).toEqual({
      Label: { type: "TEXT", defaultValue: "Click" },
      Disabled: { type: "BOOLEAN", defaultValue: false },
    });
  });

  it("validates COMPONENT_SET variant naming", () => {
    const tree = componentSet("Button", {
      children: [
        component("Style=Primary"),
        component("Style=Secondary"),
      ],
      variantAxes: { Style: ["Primary", "Secondary"] },
    });
    const result = compile(tree);
    // Should compile without errors for valid naming
    expect(result.root.type).toBe("COMPONENT_SET");
    expect(result.root.children).toHaveLength(2);
  });

  it("reports error for invalid variant naming", () => {
    const tree = componentSet("Button", {
      children: [
        component("InvalidName"), // Missing Key=Value format
      ],
    });
    const result = compile(tree);
    expect(result.errors.some((e) => e.message.includes("Key=Value"))).toBe(
      true,
    );
  });

  it("sets componentId on COMPONENT nodes", () => {
    const tree = component("Button");
    const result = compile(tree);
    expect(result.root.componentId).toBe("Button");
  });

  it("gradient fills are properly resolved", () => {
    const tree = frame("F", {
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
    const result = compile(tree);
    expect(result.root.fills[0]!.type).toBe("GRADIENT_LINEAR");
    expect(result.root.fills[0]!.gradientStops).toHaveLength(2);
    expect(result.root.fills[0]!.gradientTransform).toBeDefined();
  });
});
