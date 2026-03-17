import { describe, it, expect } from 'vitest';
import { generateCodeConnect } from './code-connect.js';
import type { CodeConnectOptions } from './code-connect.js';

describe('generateCodeConnect()', () => {
  it('maps TEXT properties to figma.string()', () => {
    const options: CodeConnectOptions = {
      fileKey: 'abc123',
      componentName: 'Button',
      nodeId: '2:2',
      properties: [{ name: 'Label', type: 'TEXT' }],
    };
    const result = generateCodeConnect(options);
    expect(result).toContain("label: figma.string('Label')");
  });

  it('maps BOOLEAN properties to figma.boolean()', () => {
    const options: CodeConnectOptions = {
      fileKey: 'abc123',
      componentName: 'Button',
      nodeId: '2:2',
      properties: [{ name: 'Disabled', type: 'BOOLEAN' }],
    };
    const result = generateCodeConnect(options);
    expect(result).toContain("disabled: figma.boolean('Disabled')");
  });

  it('maps INSTANCE_SWAP properties to figma.instance()', () => {
    const options: CodeConnectOptions = {
      fileKey: 'abc123',
      componentName: 'Button',
      nodeId: '2:2',
      properties: [{ name: 'Icon', type: 'INSTANCE_SWAP' }],
    };
    const result = generateCodeConnect(options);
    expect(result).toContain("icon: figma.instance('Icon')");
  });

  it('includes Figma URL in figma.connect() call', () => {
    const options: CodeConnectOptions = {
      fileKey: 'fileABC',
      componentName: 'Card',
      nodeId: '10:20',
      properties: [],
    };
    const result = generateCodeConnect(options);
    expect(result).toContain('https://www.figma.com/design/fileABC?node-id=10-20');
  });

  it('generates complete Code Connect file', () => {
    const options: CodeConnectOptions = {
      fileKey: 'abc',
      componentName: 'Card',
      nodeId: '1:1',
      properties: [
        { name: 'Title', type: 'TEXT' },
        { name: 'ShowBadge', type: 'BOOLEAN' },
      ],
    };
    const result = generateCodeConnect(options);
    expect(result).toContain("import figma from '@figma/code-connect'");
    expect(result).toContain("import { Card } from './Card'");
    expect(result).toContain("figma.connect(Card, 'https://www.figma.com/design/abc?node-id=1-1'");
    expect(result).toContain("title: figma.string('Title')");
    expect(result).toContain("showBadge: figma.boolean('ShowBadge')");
    expect(result).toContain('example: (props) => <Card {...props} />');
  });
});
