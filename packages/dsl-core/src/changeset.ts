// --- Changeset Schema Types ---
// Shared across plugin, applicator skills, and verification skills.

export type ChangeType = 'modified' | 'added' | 'removed';

export interface PropertyChange {
  readonly propertyPath: string;
  readonly changeType: ChangeType;
  readonly oldValue?: unknown;
  readonly newValue?: unknown;
  readonly description: string;
  readonly imageData?: string;
  // Slot-specific fields for bidirectional sync
  readonly slotName?: string;
  readonly slotChangeType?: 'child-added' | 'child-removed' | 'child-reordered';
  readonly slotContent?: unknown; // Serialized PluginNodeDef[] of slot's current children
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

// --- Changeset Warning Types ---

export type WarningSeverity = 'info' | 'warning' | 'error';

export interface ChangesetWarning {
  readonly propertyPath: string;
  readonly severity: WarningSeverity;
  readonly description: string;
  readonly unsupportedValue?: unknown;
}

export interface ChangesetDocument {
  readonly schemaVersion: string;
  readonly timestamp: string;
  readonly source: ChangesetSource;
  readonly components: ReadonlyArray<ComponentChangeEntry>;
  readonly warnings?: ReadonlyArray<ChangesetWarning>;
}
