import type { PluginNodeDef, ComponentIdentity, SourceSnapshots } from '@figma-dsl/core';

export interface CodegenPreferences {
  readonly unit: 'px' | 'rem';
  readonly scaleFactor: number;
  readonly naming: 'camelCase' | 'kebab-case';
}

export interface CodegenContext {
  readonly node: PluginNodeDef;
  readonly identity: ComponentIdentity | null;
  readonly baseline: PluginNodeDef | null;
  readonly sources: SourceSnapshots | null;
  readonly preferences: CodegenPreferences;
  readonly truncated: boolean;
}

export interface CodegenResultEntry {
  readonly title: string;
  readonly language: string;
  readonly code: string;
}
