export interface DslManifestArtifact {
  componentName: string;
  dslFilePath: string;
  source: string | null;
  compiledJson: string | null;
  sourcePath: string | null;
  jsonPath: string | null;
  pngPath: string | null;
  error: string | null;
}

export interface DslManifestFile {
  generatedAt: string;
  artifacts: Record<string, DslManifestArtifact>;
}

export interface DslStoryParameters {
  source: string | null;
  compiledJson: string | null;
  renderedPngUrl: string | null;
  error: string | null;
}
