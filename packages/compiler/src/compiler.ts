import type { DslSceneNode, DslFrameNode, DslTextNode, DslPaint } from '@figma-dsl/core';
import type { FigmaNodeDict, CompileResult, CompileError } from './types.js';

interface ComponentPropertyDef {
  name: string;
  type: string;
  defaultValue: string | boolean;
}

function isFrameLike(node: DslSceneNode): node is DslFrameNode {
  return (
    node.type === 'FRAME' ||
    node.type === 'COMPONENT' ||
    node.type === 'COMPONENT_SET' ||
    node.type === 'INSTANCE'
  );
}

function isTextNode(node: DslSceneNode): node is DslTextNode {
  return node.type === 'TEXT';
}

export class Compiler {
  private counter = 0;
  private componentGuids = new Map<DslSceneNode, string>();
  private errors: CompileError[] = [];

  compile(rootNode: DslSceneNode): CompileResult {
    this.counter = 0;
    this.componentGuids.clear();
    this.errors = [];

    // First pass: register components
    this.registerComponents(rootNode);

    const root = this.compileNode(rootNode, '', undefined);

    return {
      root,
      nodeCount: this.counter,
      errors: [...this.errors],
    };
  }

  compileToJson(rootNode: DslSceneNode): string {
    const result = this.compile(rootNode);
    return JSON.stringify(result.root, null, 2);
  }

  private registerComponents(node: DslSceneNode): void {
    if (node.type === 'COMPONENT') {
      const guid = `${this.componentGuids.size}`;
      this.componentGuids.set(node, guid);
    }
    for (const child of node.children) {
      this.registerComponents(child);
    }
  }

  private nextGuid(): [number, number] {
    return [0, this.counter++];
  }

  private compileNode(
    node: DslSceneNode,
    path: string,
    parentGuid: [number, number] | undefined,
    childIndex?: number,
  ): FigmaNodeDict {
    const guid = this.nextGuid();
    const nodePath = path ? `${path}/${node.name || node.type}` : (node.name || node.type);

    const compiled: FigmaNodeDict = {
      guid,
      type: node.type,
      name: node.name,
      size: { x: node.width, y: node.height },
      transform: [
        [1, 0, node.x],
        [0, 1, node.y],
        [0, 0, 1],
      ],
      fillPaints: [...node.fills] as DslPaint[],
      opacity: node.opacity,
      visible: node.visible,
      children: [],
    };

    // Optional fields
    if (node.strokes.length > 0) {
      compiled.strokes = [...node.strokes] as DslPaint[];
    }
    if (node.strokeWeight > 0) {
      compiled.strokeWeight = node.strokeWeight;
    }
    if (node.cornerRadius !== 0) {
      compiled.cornerRadius = node.cornerRadius;
    }
    if (node.clipContent) {
      compiled.clipContent = true;
    }

    // Parent reference
    if (parentGuid !== undefined) {
      compiled.parentIndex = {
        guid: parentGuid,
        position: String(childIndex ?? 0),
      };
    }

    // Auto-layout passthrough for frame-like nodes
    if (isFrameLike(node)) {
      if (node.layoutMode !== 'NONE') {
        compiled.stackMode = node.layoutMode;
        compiled.itemSpacing = node.itemSpacing;
        compiled.paddingTop = node.paddingTop;
        compiled.paddingRight = node.paddingRight;
        compiled.paddingBottom = node.paddingBottom;
        compiled.paddingLeft = node.paddingLeft;
        compiled.primaryAxisAlignItems = node.primaryAxisAlignItems;
        compiled.counterAxisAlignItems = node.counterAxisAlignItems;
      }
    }

    // Text node expansion
    if (isTextNode(node)) {
      const lines = node.characters.split('\n');
      const estimatedWidth = node.fontSize * node.characters.length * 0.6;
      const lineHeightPx = this.resolveLineHeight(node);
      const estimatedHeight = lines.length * lineHeightPx;

      compiled.textData = {
        characters: node.characters,
        lines,
        computedWidth: estimatedWidth,
        computedHeight: estimatedHeight,
      };
      compiled.fontSize = node.fontSize;
      compiled.fontFamily = node.fontFamily;
      compiled.fontWeight = node.fontWeight;
      compiled.textAlignHorizontal = node.textAlignHorizontal;
      compiled.lineHeight = node.lineHeight;
      compiled.letterSpacing = node.letterSpacing;
    }

    // Component property definitions
    if (node.type === 'COMPONENT') {
      const props = (node as unknown as { _componentProperties?: ComponentPropertyDef[] })._componentProperties;
      if (props && props.length > 0) {
        compiled.componentPropertyDefinitions = {};
        for (const prop of props) {
          compiled.componentPropertyDefinitions[prop.name] = {
            type: prop.type,
            defaultValue: prop.defaultValue,
          };
        }
      }
    }

    // Instance component reference
    if (node.type === 'INSTANCE') {
      const instanceNode = node as unknown as { mainComponent?: DslSceneNode };
      if (instanceNode.mainComponent) {
        const compGuid = this.componentGuids.get(instanceNode.mainComponent);
        if (compGuid !== undefined) {
          compiled.componentId = compGuid;
        }
      }
    }

    // Recurse children
    compiled.children = node.children.map((child, i) =>
      this.compileNode(child, nodePath, guid, i),
    );

    return compiled;
  }

  private resolveLineHeight(node: DslTextNode): number {
    if ('value' in node.lineHeight) {
      if (node.lineHeight.unit === 'PIXELS') {
        return node.lineHeight.value;
      }
      if (node.lineHeight.unit === 'PERCENT') {
        return (node.lineHeight.value / 100) * node.fontSize;
      }
    }
    // AUTO: default to fontSize * 1.2
    return node.fontSize * 1.2;
  }
}
