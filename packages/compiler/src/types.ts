import type { DslPaint } from '@figma-dsl/core';

export interface FigmaNodeDict {
  guid: [number, number];
  type: string;
  name: string;
  size: { x: number; y: number };
  transform: [[number, number, number], [number, number, number], [number, number, number]];
  fillPaints: DslPaint[];
  strokes?: DslPaint[];
  strokeWeight?: number;
  cornerRadius?: number;
  opacity: number;
  visible: boolean;
  clipContent?: boolean;
  children: FigmaNodeDict[];
  parentIndex?: { guid: [number, number]; position: string };

  // Auto-layout passthrough
  stackMode?: 'HORIZONTAL' | 'VERTICAL';
  itemSpacing?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  primaryAxisAlignItems?: 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN';
  counterAxisAlignItems?: 'MIN' | 'CENTER' | 'MAX';

  // Text
  textData?: {
    characters: string;
    lines: string[];
    computedWidth: number;
    computedHeight: number;
  };
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number;
  textAlignHorizontal?: 'LEFT' | 'CENTER' | 'RIGHT';
  lineHeight?: { value: number; unit: 'PERCENT' | 'PIXELS' } | { unit: 'AUTO' };
  letterSpacing?: { value: number; unit: 'PERCENT' | 'PIXELS' };

  // Component
  componentPropertyDefinitions?: Record<string, { type: string; defaultValue: string | boolean }>;
  componentId?: string;
  overriddenProperties?: Record<string, string | boolean>;
}

export interface CompileResult {
  root: FigmaNodeDict;
  nodeCount: number;
  errors: CompileError[];
}

export interface CompileError {
  message: string;
  nodePath: string;
  nodeType: string;
}
