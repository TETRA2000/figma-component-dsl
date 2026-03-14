// --- Changeset Schema Types ---
// Shared across plugin, applicator skills, and verification skills.

export type ChangeType = 'modified' | 'added' | 'removed';

export interface PropertyChange {
  readonly propertyPath: string;
  readonly changeType: ChangeType;
  readonly oldValue?: unknown;
  readonly newValue?: unknown;
  readonly description: string;
}

export interface ComponentChangeEntry {
  readonly componentName: string;
  readonly componentId: string;
  readonly changes: ReadonlyArray<PropertyChange>;
}

export interface ChangesetSource {
  readonly pluginVersion: string;
  readonly figmaFileName: string;
}

export interface ChangesetDocument {
  readonly schemaVersion: string;
  readonly timestamp: string;
  readonly source: ChangesetSource;
  readonly components: ReadonlyArray<ComponentChangeEntry>;
}
