import type { FigmaNodeDict, CompileResult } from '@figma-dsl/compiler';

interface PluginInput {
  schemaVersion: number;
  pageName: string;
  nodes: FigmaNodeDict[];
}

export class Exporter {
  export(result: CompileResult, pageName: string = 'Component Library'): PluginInput {
    return {
      schemaVersion: 1,
      pageName,
      nodes: [result.root],
    };
  }

  exportToJson(result: CompileResult, pageName?: string): string {
    return JSON.stringify(this.export(result, pageName), null, 2);
  }
}
