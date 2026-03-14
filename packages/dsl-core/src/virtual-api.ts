import type {
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
  DslPaint,
  DslNodeType,
  DslComponentPropertyType,
  DslLineHeight,
  DslLineHeightAuto,
  DslLetterSpacing,
} from './types.js';

interface ComponentPropertyDef {
  name: string;
  type: DslComponentPropertyType;
  defaultValue: string | boolean;
}

function createBaseNode(type: DslNodeType): DslSceneNode {
  const _children: DslSceneNode[] = [];
  return {
    type,
    name: '',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    rotation: 0,
    opacity: 1,
    visible: true,
    fills: [],
    strokes: [],
    strokeWeight: 0,
    cornerRadius: 0,
    clipContent: false,
    get children(): readonly DslSceneNode[] {
      return _children;
    },
    appendChild(child: DslSceneNode): void {
      _children.push(child);
    },
    resize(w: number, h: number): void {
      this.width = w;
      this.height = h;
    },
  };
}

function createFrameNode(type: DslNodeType = 'FRAME'): DslFrameNode {
  const base = createBaseNode(type);
  return Object.assign(base, {
    layoutMode: 'NONE' as const,
    itemSpacing: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    primaryAxisAlignItems: 'MIN' as const,
    counterAxisAlignItems: 'MIN' as const,
    layoutSizingHorizontal: 'FIXED' as const,
    layoutSizingVertical: 'FIXED' as const,
    layoutGrow: 0,
  }) as DslFrameNode;
}

export class VirtualFigmaApi implements DslFigmaApi {
  createFrame(): DslFrameNode {
    return createFrameNode('FRAME');
  }

  async createText(): Promise<DslTextNode> {
    const base = createBaseNode('TEXT');
    return Object.assign(base, {
      characters: '',
      fontFamily: 'Inter',
      fontWeight: 400,
      fontSize: 16,
      lineHeight: { unit: 'AUTO' } as DslLineHeight | DslLineHeightAuto,
      letterSpacing: { value: 0, unit: 'PIXELS' } as DslLetterSpacing,
      textAlignHorizontal: 'LEFT' as const,
    }) as DslTextNode;
  }

  createRectangle(): DslRectangleNode {
    return createBaseNode('RECTANGLE') as DslRectangleNode;
  }

  createEllipse(): DslEllipseNode {
    return createBaseNode('ELLIPSE') as DslEllipseNode;
  }

  createComponent(): DslComponentNode {
    const frame = createFrameNode('COMPONENT');
    const properties: ComponentPropertyDef[] = [];
    const self = frame as unknown as DslComponentNode;

    Object.assign(frame, {
      addComponentProperty(
        name: string,
        type: DslComponentPropertyType,
        defaultValue: string | boolean,
      ): void {
        properties.push({ name, type, defaultValue });
      },
      createInstance(): DslInstanceNode {
        const instanceFrame = createFrameNode('INSTANCE');
        const overrides: Record<string, string | boolean> = {};
        return Object.assign(instanceFrame, {
          get mainComponent(): DslComponentNode {
            return self;
          },
          setProperties(o: Record<string, string | boolean>): void {
            Object.assign(overrides, o);
          },
        }) as DslInstanceNode;
      },
    });

    // Expose properties for compiler access
    Object.defineProperty(frame, '_componentProperties', {
      value: properties,
      enumerable: false,
    });

    return frame as unknown as DslComponentNode;
  }

  createGroup(
    children: DslSceneNode[],
    _parent: DslSceneNode,
  ): DslGroupNode {
    const group = createBaseNode('GROUP');
    for (const child of children) {
      group.appendChild(child);
    }
    return group as DslGroupNode;
  }

  combineAsVariants(
    components: DslComponentNode[],
    _parent: DslSceneNode,
  ): DslComponentSetNode {
    const setFrame = createFrameNode('COMPONENT_SET');
    for (const comp of components) {
      setFrame.appendChild(comp);
    }
    return setFrame as unknown as DslComponentSetNode;
  }
}
