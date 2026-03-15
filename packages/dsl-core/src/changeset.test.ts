import { describe, it, expect } from 'vitest';
import type {
  ChangeType,
  PropertyChange,
  ComponentChangeEntry,
  ChangesetSource,
  ChangesetDocument,
  WarningSeverity,
  ChangesetWarning,
} from './changeset.js';

describe('Changeset Types', () => {
  it('ChangeType accepts valid values', () => {
    const types: ChangeType[] = ['modified', 'added', 'removed'];
    expect(types).toHaveLength(3);
  });

  it('PropertyChange has required fields', () => {
    const change: PropertyChange = {
      propertyPath: 'fills.0.color.r',
      changeType: 'modified',
      oldValue: 0.5,
      newValue: 1.0,
      description: 'Change fill red channel from 0.5 to 1.0',
    };
    expect(change.propertyPath).toBe('fills.0.color.r');
    expect(change.changeType).toBe('modified');
    expect(change.description).toBeTruthy();
  });

  it('PropertyChange allows omitting oldValue for added changes', () => {
    const change: PropertyChange = {
      propertyPath: 'strokes.0',
      changeType: 'added',
      newValue: { color: { r: 0, g: 0, b: 0, a: 1 }, weight: 1 },
      description: 'Add stroke',
    };
    expect(change.oldValue).toBeUndefined();
    expect(change.newValue).toBeDefined();
  });

  it('PropertyChange allows omitting newValue for removed changes', () => {
    const change: PropertyChange = {
      propertyPath: 'fills.1',
      changeType: 'removed',
      oldValue: { type: 'SOLID', color: { r: 1, g: 0, b: 0, a: 1 }, opacity: 1 },
      description: 'Remove second fill',
    };
    expect(change.newValue).toBeUndefined();
    expect(change.oldValue).toBeDefined();
  });

  it('ComponentChangeEntry has required fields', () => {
    const entry: ComponentChangeEntry = {
      componentName: 'Button',
      componentId: 'node-123',
      changes: [
        {
          propertyPath: 'fontSize',
          changeType: 'modified',
          oldValue: 14,
          newValue: 16,
          description: 'Increase font size from 14px to 16px',
        },
      ],
    };
    expect(entry.componentName).toBe('Button');
    expect(entry.componentId).toBe('node-123');
    expect(entry.changes).toHaveLength(1);
  });

  it('ChangesetSource has required fields', () => {
    const source: ChangesetSource = {
      pluginVersion: '1.0.0',
      figmaFileName: 'Design System.fig',
    };
    expect(source.pluginVersion).toBe('1.0.0');
    expect(source.figmaFileName).toBe('Design System.fig');
  });

  it('ChangesetDocument has all required fields', () => {
    const doc: ChangesetDocument = {
      schemaVersion: '1.0',
      timestamp: '2026-03-14T00:00:00.000Z',
      source: {
        pluginVersion: '1.0.0',
        figmaFileName: 'Design System.fig',
      },
      components: [
        {
          componentName: 'Button',
          componentId: 'node-123',
          changes: [
            {
              propertyPath: 'fills.0.color.r',
              changeType: 'modified',
              oldValue: 0.2,
              newValue: 0.8,
              description: 'Change primary color',
            },
          ],
        },
      ],
    };
    expect(doc.schemaVersion).toBe('1.0');
    expect(doc.timestamp).toBeTruthy();
    expect(doc.source.pluginVersion).toBe('1.0.0');
    expect(doc.components).toHaveLength(1);
    expect(doc.components[0].changes).toHaveLength(1);
  });

  it('ChangesetDocument supports empty components array', () => {
    const doc: ChangesetDocument = {
      schemaVersion: '1.0',
      timestamp: '2026-03-14T00:00:00.000Z',
      source: {
        pluginVersion: '1.0.0',
        figmaFileName: 'test.fig',
      },
      components: [],
    };
    expect(doc.components).toHaveLength(0);
  });

  it('WarningSeverity accepts valid values', () => {
    const severities: WarningSeverity[] = ['info', 'warning', 'error'];
    expect(severities).toHaveLength(3);
  });

  it('ChangesetWarning has required fields', () => {
    const warning: ChangesetWarning = {
      propertyPath: 'effects.0',
      severity: 'warning',
      description: 'Drop shadow effect has no DSL equivalent',
    };
    expect(warning.propertyPath).toBe('effects.0');
    expect(warning.severity).toBe('warning');
    expect(warning.description).toBeTruthy();
    expect(warning.unsupportedValue).toBeUndefined();
  });

  it('ChangesetWarning supports optional unsupportedValue', () => {
    const warning: ChangesetWarning = {
      propertyPath: 'blendMode',
      severity: 'info',
      description: 'Blend mode MULTIPLY has no DSL equivalent',
      unsupportedValue: 'MULTIPLY',
    };
    expect(warning.unsupportedValue).toBe('MULTIPLY');
  });

  it('ChangesetDocument supports optional warnings array', () => {
    const doc: ChangesetDocument = {
      schemaVersion: '1.0',
      timestamp: '2026-03-14T00:00:00.000Z',
      source: {
        pluginVersion: '1.0.0',
        figmaFileName: 'test.fig',
      },
      components: [],
      warnings: [
        {
          propertyPath: 'effects.0',
          severity: 'warning',
          description: 'Drop shadow not supported',
        },
      ],
    };
    expect(doc.warnings).toHaveLength(1);
    expect(doc.warnings![0].severity).toBe('warning');
  });

  it('ChangesetDocument without warnings is backward compatible', () => {
    const doc: ChangesetDocument = {
      schemaVersion: '1.0',
      timestamp: '2026-03-14T00:00:00.000Z',
      source: {
        pluginVersion: '1.0.0',
        figmaFileName: 'test.fig',
      },
      components: [],
    };
    expect(doc.warnings).toBeUndefined();
  });
});
