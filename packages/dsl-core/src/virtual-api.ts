import type {
  DslNodeType,
  DslPaint,
  DslSceneNode,
  DslFrameNode,
  DslTextNode,
  DslRectangleNode,
  DslEllipseNode,
  DslGroupNode,
  DslComponentNode,
  DslComponentSetNode,
  DslInstanceNode,
  DslFigmaApi,
  DslComponentProperty,
  DslComponentPropertyType,
  DslLineHeight,
  DslLetterSpacing,
} from './types.js';

// --- Base virtual node with shared properties ---
class VirtualBaseNode {
  name = '';
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  rotation = 0;
  opacity = 1;
  visible = true;
  fills: DslPaint[] = [];
  strokes: DslPaint[] = [];
  strokeWeight = 0;
  cornerRadius = 0;
  clipContent = false;

  protected _children: DslSceneNode[] = [];

  get children(): readonly DslSceneNode[] {
    return this._children;
  }

  appendChild(child: DslSceneNode): void {
    this._children.push(child);
  }

  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }
}

// --- Frame-like base with auto-layout properties ---
class VirtualFrameBase extends VirtualBaseNode {
  layoutMode: 'NONE' | 'HORIZONTAL' | 'VERTICAL' = 'NONE';
  itemSpacing = 0;
  paddingTop = 0;
  paddingRight = 0;
  paddingBottom = 0;
  paddingLeft = 0;
  primaryAxisAlignItems: 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN' = 'MIN';
  counterAxisAlignItems: 'MIN' | 'CENTER' | 'MAX' = 'MIN';
  layoutSizingHorizontal: 'FIXED' | 'HUG' | 'FILL' = 'FIXED';
  layoutSizingVertical: 'FIXED' | 'HUG' | 'FILL' = 'FIXED';
}

// --- Concrete node types ---

class VirtualFrameNode extends VirtualFrameBase implements DslFrameNode {
  readonly type: DslNodeType = 'FRAME';
}

class VirtualTextNode extends VirtualBaseNode implements DslTextNode {
  readonly type: DslNodeType = 'TEXT';
  characters = '';
  fontFamily = 'Inter';
  fontWeight = 400;
  fontSize = 12;
  lineHeight: DslLineHeight = { unit: 'AUTO' };
  letterSpacing: DslLetterSpacing = { value: 0, unit: 'PERCENT' };
  textAlignHorizontal: 'LEFT' | 'CENTER' | 'RIGHT' = 'LEFT';
}

class VirtualRectangleNode extends VirtualBaseNode implements DslRectangleNode {
  readonly type: DslNodeType = 'RECTANGLE';
}

class VirtualEllipseNode extends VirtualBaseNode implements DslEllipseNode {
  readonly type: DslNodeType = 'ELLIPSE';
}

class VirtualGroupNode extends VirtualBaseNode implements DslGroupNode {
  readonly type: DslNodeType = 'GROUP';
}

class VirtualComponentNode extends VirtualFrameBase implements DslComponentNode {
  readonly type: DslNodeType = 'COMPONENT';
  private _componentProperties: Record<string, DslComponentProperty> = {};

  get componentProperties(): Record<string, DslComponentProperty> {
    return this._componentProperties;
  }

  addComponentProperty(name: string, type: DslComponentPropertyType, defaultValue: string | boolean): void {
    this._componentProperties[name] = { type, defaultValue };
  }

  createInstance(): DslInstanceNode {
    return new VirtualInstanceNode(this);
  }
}

class VirtualComponentSetNode extends VirtualFrameBase implements DslComponentSetNode {
  readonly type: DslNodeType = 'COMPONENT_SET';
}

class VirtualInstanceNode extends VirtualFrameBase implements DslInstanceNode {
  readonly type: DslNodeType = 'INSTANCE';
  readonly mainComponent: DslComponentNode;
  private _overrides: Record<string, string | boolean> = {};

  constructor(mainComponent: DslComponentNode) {
    super();
    this.mainComponent = mainComponent;
  }

  setProperties(overrides: Record<string, string | boolean>): void {
    Object.assign(this._overrides, overrides);
  }

  get overriddenProperties(): Record<string, string | boolean> {
    return { ...this._overrides };
  }
}

// --- VirtualFigmaApi ---

export class VirtualFigmaApi implements DslFigmaApi {
  createFrame(): DslFrameNode {
    return new VirtualFrameNode();
  }

  async createText(): Promise<DslTextNode> {
    return new VirtualTextNode();
  }

  createRectangle(): DslRectangleNode {
    return new VirtualRectangleNode();
  }

  createEllipse(): DslEllipseNode {
    return new VirtualEllipseNode();
  }

  createComponent(): DslComponentNode {
    return new VirtualComponentNode();
  }

  createGroup(children: DslSceneNode[], parent: DslSceneNode): DslGroupNode {
    const group = new VirtualGroupNode();
    for (const child of children) {
      group.appendChild(child);
    }
    parent.appendChild(group);
    return group;
  }

  combineAsVariants(components: DslComponentNode[], parent: DslSceneNode): DslComponentSetNode {
    const set = new VirtualComponentSetNode();

    // Remove components from old parent's children
    if (parent.children && '_children' in parent) {
      const parentInternal = parent as unknown as { _children: DslSceneNode[] };
      parentInternal._children = parentInternal._children.filter(
        (c) => !components.includes(c as DslComponentNode)
      );
    }

    // Reparent into component set
    for (const comp of components) {
      set.appendChild(comp);
    }

    // Add component set to parent
    parent.appendChild(set);
    return set;
  }
}
