import type { DslNode } from "../nodes/types.js";

/**
 * Registry for tracking COMPONENT definitions within a compilation unit.
 * Scoped to a single compile() call.
 */
export class ComponentRegistry {
  private readonly components = new Map<string, DslNode>();

  /** Register a component definition by name */
  register(name: string, node: DslNode): void {
    this.components.set(name, node);
  }

  /** Resolve a component reference by name */
  resolve(componentRef: string): DslNode | undefined {
    return this.components.get(componentRef);
  }

  /** Get all registered component names */
  names(): string[] {
    return [...this.components.keys()];
  }

  /**
   * Perform a depth-first registration pass over the DslNode tree.
   * Registers COMPONENT nodes by name and COMPONENT_SET variant
   * children with their full Key=Value names.
   */
  registerAll(root: DslNode): void {
    this.walkAndRegister(root);
  }

  private walkAndRegister(node: DslNode): void {
    if (node.type === "COMPONENT") {
      this.register(node.name, node);
    }

    if (node.type === "COMPONENT_SET" && node.children) {
      // Register variant children with their full names
      for (const child of node.children) {
        if (child.type === "COMPONENT") {
          this.register(child.name, child);
        }
      }
    }

    if (node.children) {
      for (const child of node.children) {
        this.walkAndRegister(child);
      }
    }
  }
}

/**
 * Clone a component's subtree and apply property overrides.
 */
export function resolveInstance(
  componentNode: DslNode,
  overrides: Readonly<Record<string, string | boolean>> | undefined,
): DslNode {
  if (overrides === undefined || Object.keys(overrides).length === 0) {
    return cloneNode(componentNode);
  }

  return applyOverrides(cloneNode(componentNode), overrides);
}

function cloneNode(node: DslNode): DslNode {
  return {
    ...node,
    ...(node.children !== undefined && {
      children: node.children.map(cloneNode),
    }),
    ...(node.fills !== undefined && {
      fills: [...node.fills],
    }),
    ...(node.strokes !== undefined && {
      strokes: [...node.strokes],
    }),
  };
}

function applyOverrides(
  node: DslNode,
  overrides: Readonly<Record<string, string | boolean>>,
): DslNode {
  // Apply TEXT overrides: replace characters on TEXT nodes matching property name
  // Apply BOOLEAN overrides: toggle visibility
  // Apply INSTANCE_SWAP overrides: handled at compile time

  if (node.componentProperties) {
    for (const prop of node.componentProperties) {
      const overrideValue = overrides[prop.name];
      if (overrideValue === undefined) continue;

      if (prop.type === "TEXT" && typeof overrideValue === "string") {
        // Find first TEXT child and replace characters
        return replaceTextInTree(node, prop.name, overrideValue);
      }

      if (prop.type === "BOOLEAN" && typeof overrideValue === "boolean") {
        // Toggle visibility of named child
        return toggleVisibilityInTree(node, prop.name, overrideValue);
      }
    }
  }

  return node;
}

function replaceTextInTree(
  node: DslNode,
  _propName: string,
  newText: string,
): DslNode {
  if (node.type === "TEXT") {
    return {
      ...node,
      characters: newText,
      name: newText.length > 30 ? newText.slice(0, 30) + "…" : newText,
    };
  }

  if (node.children) {
    return {
      ...node,
      children: node.children.map((child) => {
        if (child.type === "TEXT") {
          return {
            ...child,
            characters: newText,
            name: newText.length > 30 ? newText.slice(0, 30) + "…" : newText,
          };
        }
        return child;
      }),
    };
  }

  return node;
}

function toggleVisibilityInTree(
  node: DslNode,
  propName: string,
  visible: boolean,
): DslNode {
  if (node.children) {
    return {
      ...node,
      children: node.children.map((child) => {
        if (child.name === propName) {
          return { ...child, visible };
        }
        return child;
      }),
    };
  }
  return node;
}
