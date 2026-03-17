import type { PluginNodeDef, ComponentIdentity, SourceSnapshots } from '@figma-dsl/core';
import type { CapturedCanvasImage } from './image-capture.js';

export interface CodegenPreferences {
  readonly unit: 'px' | 'rem';
  readonly scaleFactor: number;
  readonly naming: 'camelCase' | 'kebab-case';
}

/** Simplified canvas region info for generators (no Figma node reference) */
export interface CanvasRegionInfo {
  readonly canvasName: string;
  readonly nodeId: string;
  readonly width: number;
  readonly height: number;
}

export interface CodegenContext {
  readonly node: PluginNodeDef;
  readonly identity: ComponentIdentity | null;
  readonly baseline: PluginNodeDef | null;
  readonly sources: SourceSnapshots | null;
  readonly preferences: CodegenPreferences;
  readonly truncated: boolean;
  readonly canvasRegions: readonly CanvasRegionInfo[];
  readonly canvasImages: ReadonlyMap<string, CapturedCanvasImage> | null;
}

export interface CodegenResultEntry {
  readonly title: string;
  readonly language: string;
  readonly code: string;
}
