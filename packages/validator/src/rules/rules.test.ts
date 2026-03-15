import { describe, it, expect } from 'vitest';
import { join } from 'path';
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'fs';
import { validateComponent } from '../validator.js';

const FIXTURES_DIR = join(import.meta.dirname, '__fixtures__');

function setupFixture(
  name: string,
  files: Record<string, string>
): string {
  const dir = join(FIXTURES_DIR, name);
  if (existsSync(dir)) rmSync(dir, { recursive: true });
  mkdirSync(dir, { recursive: true });

  for (const [fileName, content] of Object.entries(files)) {
    const filePath = join(
      fileName.includes('/') ? FIXTURES_DIR : dir,
      fileName.includes('/') ? fileName.split('/').pop()! : fileName
    );
    if (fileName.includes('/')) {
      // Write to parent directory (e.g., index.ts, tokens.css)
      writeFileSync(join(FIXTURES_DIR, fileName.replace(`${name}/../`, '')), content);
    } else {
      writeFileSync(join(dir, fileName), content);
    }
  }

  return dir;
}

function cleanFixtures() {
  if (existsSync(FIXTURES_DIR)) rmSync(FIXTURES_DIR, { recursive: true });
}

describe('three-file rule', () => {
  it('passes when all 3 files exist', async () => {
    const dir = setupFixture('GoodComp', {
      'GoodComp.tsx': 'export function GoodComp() { return <div />; }',
      'GoodComp.module.css': '.root {}',
      'GoodComp.figma.tsx': 'import figma from "@figma/code-connect";',
    });

    const result = await validateComponent(dir, { rules: ['three-file'] });
    expect(result.warnings).toHaveLength(0);
    cleanFixtures();
  });

  it('warns when .figma.tsx is missing', async () => {
    const dir = setupFixture('NoFigma', {
      'NoFigma.tsx': 'export function NoFigma() { return <div />; }',
      'NoFigma.module.css': '.root {}',
    });

    const result = await validateComponent(dir, { rules: ['three-file'] });
    expect(result.warnings).toHaveLength(1);
    expect(result.warnings[0].message).toContain('.figma.tsx');
    cleanFixtures();
  });

  it('warns when .module.css is missing', async () => {
    const dir = setupFixture('NoCss', {
      'NoCss.tsx': 'export function NoCss() { return <div />; }',
    });

    const result = await validateComponent(dir, { rules: ['three-file'] });
    expect(result.warnings.length).toBeGreaterThanOrEqual(1);
    expect(result.warnings.some(w => w.message.includes('.module.css'))).toBe(true);
    cleanFixtures();
  });
});

describe('css-modules rule', () => {
  it('passes when component imports CSS Module', async () => {
    const dir = setupFixture('WithCss', {
      'WithCss.tsx': `import styles from './WithCss.module.css';\nexport function WithCss() { return <div className={styles.root} />; }`,
      'WithCss.module.css': '.root {}',
    });

    const result = await validateComponent(dir, { rules: ['css-modules'] });
    expect(result.errors).toHaveLength(0);
    cleanFixtures();
  });

  it('errors when component does not import CSS Module', async () => {
    const dir = setupFixture('NoCssImport', {
      'NoCssImport.tsx': 'export function NoCssImport() { return <div />; }',
    });

    const result = await validateComponent(dir, { rules: ['css-modules'] });
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].rule).toBe('css-modules');
    cleanFixtures();
  });
});

describe('no-inline-style rule', () => {
  it('passes when no inline styles used', async () => {
    const dir = setupFixture('NoInline', {
      'NoInline.tsx': `import styles from './NoInline.module.css';\nexport function NoInline() { return <div className={styles.root} />; }`,
    });

    const result = await validateComponent(dir, { rules: ['no-inline-style'] });
    expect(result.errors).toHaveLength(0);
    cleanFixtures();
  });

  it('errors when inline style={{}} is used', async () => {
    const dir = setupFixture('HasInline', {
      'HasInline.tsx': `export function HasInline() { return <div style={{ color: 'red' }} />; }`,
    });

    const result = await validateComponent(dir, { rules: ['no-inline-style'] });
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].rule).toBe('no-inline-style');
    expect(result.errors[0].line).toBe(1);
    cleanFixtures();
  });
});

describe('design-tokens rule', () => {
  it('passes when CSS uses design tokens', async () => {
    const dir = setupFixture('TokensUsed', {
      'TokensUsed.tsx': `import styles from './TokensUsed.module.css';\nexport function TokensUsed() { return <div />; }`,
      'TokensUsed.module.css': '.root { color: var(--text-primary); padding: var(--space-4); }',
    });

    const result = await validateComponent(dir, { rules: ['design-tokens'] });
    expect(result.warnings).toHaveLength(0);
    cleanFixtures();
  });

  it('warns when no design tokens are referenced', async () => {
    const dir = setupFixture('NoTokens', {
      'NoTokens.tsx': `import styles from './NoTokens.module.css';\nexport function NoTokens() { return <div />; }`,
      'NoTokens.module.css': '.root { color: red; padding: 16px; }',
    });

    const result = await validateComponent(dir, { rules: ['design-tokens'] });
    expect(result.warnings).toHaveLength(1);
    expect(result.warnings[0].rule).toBe('design-tokens');
    cleanFixtures();
  });
});

describe('token-exists rule', () => {
  it('passes when all referenced tokens exist in tokens.css', async () => {
    const tokensContent = ':root { --text-primary: #000; --space-4: 16px; }';
    const dir = setupFixture('TokensExist', {
      'TokensExist.tsx': 'export function TokensExist() { return <div />; }',
      'TokensExist.module.css': '.root { color: var(--text-primary); padding: var(--space-4); }',
    });
    // Write tokens.css to parent dir
    writeFileSync(join(FIXTURES_DIR, 'tokens.css'), tokensContent);

    const result = await validateComponent(dir, { rules: ['token-exists'] });
    expect(result.errors).toHaveLength(0);
    cleanFixtures();
  });

  it('errors when referenced token does not exist', async () => {
    const tokensContent = ':root { --text-primary: #000; }';
    const dir = setupFixture('TokenMissing', {
      'TokenMissing.tsx': 'export function TokenMissing() { return <div />; }',
      'TokenMissing.module.css': '.root { color: var(--nonexistent-token); }',
    });
    writeFileSync(join(FIXTURES_DIR, 'tokens.css'), tokensContent);

    const result = await validateComponent(dir, { rules: ['token-exists'] });
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].message).toContain('--nonexistent-token');
    cleanFixtures();
  });
});

describe('barrel-export rule', () => {
  it('passes when component is exported from index.ts', async () => {
    const dir = setupFixture('Exported', {
      'Exported.tsx': 'export function Exported() { return <div />; }',
    });
    writeFileSync(
      join(FIXTURES_DIR, 'index.ts'),
      `export { Exported } from './Exported/Exported';`
    );

    const result = await validateComponent(dir, { rules: ['barrel-export'] });
    expect(result.warnings).toHaveLength(0);
    cleanFixtures();
  });

  it('warns when component is not in barrel exports', async () => {
    const dir = setupFixture('NotExported', {
      'NotExported.tsx': 'export function NotExported() { return <div />; }',
    });
    writeFileSync(
      join(FIXTURES_DIR, 'index.ts'),
      `export { Other } from './Other/Other';`
    );

    const result = await validateComponent(dir, { rules: ['barrel-export'] });
    expect(result.warnings).toHaveLength(1);
    expect(result.warnings[0].rule).toBe('barrel-export');
    cleanFixtures();
  });
});

describe('classname-prop rule', () => {
  it('passes when component accepts className and uses filter+join', async () => {
    const dir = setupFixture('WithClassName', {
      'WithClassName.tsx': `
interface WithClassNameProps {
  className?: string;
  children: React.ReactNode;
}
export function WithClassName({ className, children }: WithClassNameProps) {
  const cls = [styles.root, className].filter(Boolean).join(' ');
  return <div className={cls}>{children}</div>;
}`,
    });

    const result = await validateComponent(dir, { rules: ['classname-prop'] });
    expect(result.errors).toHaveLength(0);
    cleanFixtures();
  });

  it('errors when component does not accept className prop', async () => {
    const dir = setupFixture('NoClassName', {
      'NoClassName.tsx': `
interface NoClassNameProps {
  children: React.ReactNode;
}
export function NoClassName({ children }: NoClassNameProps) {
  return <div>{children}</div>;
}`,
    });

    const result = await validateComponent(dir, { rules: ['classname-prop'] });
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].rule).toBe('classname-prop');
    expect(result.errors[0].message).toContain('className');
    cleanFixtures();
  });

  it('errors when className is accepted but no filter+join or utility is used', async () => {
    const dir = setupFixture('NoFilterJoin', {
      'NoFilterJoin.tsx': `
interface NoFilterJoinProps {
  className?: string;
}
export function NoFilterJoin({ className }: NoFilterJoinProps) {
  return <div className={className} />;
}`,
    });

    const result = await validateComponent(dir, { rules: ['classname-prop'] });
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].message).toContain('filter(Boolean).join()');
    cleanFixtures();
  });

  it('passes when clsx utility is used', async () => {
    const dir = setupFixture('WithClsx', {
      'WithClsx.tsx': `
import { clsx } from 'clsx';
interface WithClsxProps {
  className?: string;
}
export function WithClsx({ className }: WithClsxProps) {
  return <div className={clsx(styles.root, className)} />;
}`,
    });

    const result = await validateComponent(dir, { rules: ['classname-prop'] });
    expect(result.errors).toHaveLength(0);
    cleanFixtures();
  });
});

describe('variant-union rule', () => {
  it('passes when variant uses string literal union', async () => {
    const dir = setupFixture('GoodVariant', {
      'GoodVariant.tsx': `
interface GoodVariantProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}
export function GoodVariant({ variant = 'primary' }: GoodVariantProps) {
  return <button />;
}`,
    });

    const result = await validateComponent(dir, { rules: ['variant-union'] });
    expect(result.errors).toHaveLength(0);
    cleanFixtures();
  });

  it('errors when variant is typed as bare string', async () => {
    const dir = setupFixture('BadVariant', {
      'BadVariant.tsx': `
interface BadVariantProps {
  variant?: string;
}
export function BadVariant({ variant }: BadVariantProps) {
  return <button />;
}`,
    });

    const result = await validateComponent(dir, { rules: ['variant-union'] });
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].rule).toBe('variant-union');
    expect(result.errors[0].message).toContain('string');
    cleanFixtures();
  });

  it('errors when size is typed as bare string', async () => {
    const dir = setupFixture('BadSize', {
      'BadSize.tsx': `
interface BadSizeProps {
  size: string;
}
export function BadSize({ size }: BadSizeProps) {
  return <div />;
}`,
    });

    const result = await validateComponent(dir, { rules: ['variant-union'] });
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].message).toContain('size');
    cleanFixtures();
  });

  it('passes when no variant/size props exist', async () => {
    const dir = setupFixture('NoVariant', {
      'NoVariant.tsx': `
interface NoVariantProps {
  label: string;
}
export function NoVariant({ label }: NoVariantProps) {
  return <span>{label}</span>;
}`,
    });

    const result = await validateComponent(dir, { rules: ['variant-union'] });
    expect(result.errors).toHaveLength(0);
    cleanFixtures();
  });
});

describe('html-attrs rule', () => {
  it('passes when props extend HTMLAttributes', async () => {
    const dir = setupFixture('WithHtmlAttrs', {
      'WithHtmlAttrs.tsx': `
import { HTMLAttributes } from 'react';
interface WithHtmlAttrsProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
}
export function WithHtmlAttrs({ label, ...rest }: WithHtmlAttrsProps) {
  return <div {...rest}>{label}</div>;
}`,
    });

    const result = await validateComponent(dir, { rules: ['html-attrs'] });
    expect(result.warnings).toHaveLength(0);
    cleanFixtures();
  });

  it('passes when props extend ButtonHTMLAttributes', async () => {
    const dir = setupFixture('WithBtnAttrs', {
      'WithBtnAttrs.tsx': `
import { ButtonHTMLAttributes } from 'react';
interface WithBtnAttrsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: string;
}
export function WithBtnAttrs(props: WithBtnAttrsProps) {
  return <button />;
}`,
    });

    const result = await validateComponent(dir, { rules: ['html-attrs'] });
    expect(result.warnings).toHaveLength(0);
    cleanFixtures();
  });

  it('warns when props do not extend HTML attribute types', async () => {
    const dir = setupFixture('NoHtmlAttrs', {
      'NoHtmlAttrs.tsx': `
interface NoHtmlAttrsProps {
  label: string;
}
export function NoHtmlAttrs({ label }: NoHtmlAttrsProps) {
  return <div>{label}</div>;
}`,
    });

    const result = await validateComponent(dir, { rules: ['html-attrs'] });
    expect(result.warnings).toHaveLength(1);
    expect(result.warnings[0].rule).toBe('html-attrs');
    expect(result.warnings[0].message).toContain('HTMLAttributes');
    cleanFixtures();
  });
});

describe('dsl-compatible-layout rule', () => {
  it('passes when CSS uses display: flex', async () => {
    const dir = setupFixture('FlexLayout', {
      'FlexLayout.tsx': `import styles from './FlexLayout.module.css';\nexport function FlexLayout() { return <div className={styles.root} />; }`,
      'FlexLayout.module.css': '.root { display: flex; gap: 8px; }',
    });

    const result = await validateComponent(dir, { rules: ['dsl-compatible-layout'] });
    expect(result.warnings).toHaveLength(0);
    cleanFixtures();
  });

  it('passes when CSS uses display: grid', async () => {
    const dir = setupFixture('GridLayout', {
      'GridLayout.tsx': `import styles from './GridLayout.module.css';\nexport function GridLayout() { return <div className={styles.root} />; }`,
      'GridLayout.module.css': '.root { display: grid; grid-template-columns: 1fr 1fr; }',
    });

    const result = await validateComponent(dir, { rules: ['dsl-compatible-layout'] });
    expect(result.warnings).toHaveLength(0);
    cleanFixtures();
  });

  it('passes when TSX contains inline SVG elements (polygon/star DSL mapping)', async () => {
    const dir = setupFixture('SvgComp', {
      'SvgComp.tsx': `import styles from './SvgComp.module.css';\nexport function SvgComp() { return <svg viewBox="0 0 100 100"><polygon points="50,0 100,100 0,100" /></svg>; }`,
      'SvgComp.module.css': '.root { width: 100px; }',
    });

    const result = await validateComponent(dir, { rules: ['dsl-compatible-layout'] });
    expect(result.warnings).toHaveLength(0);
    cleanFixtures();
  });

  it('passes when TSX contains <line> SVG element', async () => {
    const dir = setupFixture('LineComp', {
      'LineComp.tsx': `import styles from './LineComp.module.css';\nexport function LineComp() { return <svg><line x1="0" y1="0" x2="100" y2="0" /></svg>; }`,
      'LineComp.module.css': '.root { width: 100px; }',
    });

    const result = await validateComponent(dir, { rules: ['dsl-compatible-layout'] });
    expect(result.warnings).toHaveLength(0);
    cleanFixtures();
  });

  it('passes when TSX contains <clipPath> SVG element (boolean operation mapping)', async () => {
    const dir = setupFixture('ClipComp', {
      'ClipComp.tsx': `import styles from './ClipComp.module.css';\nexport function ClipComp() { return <svg><clipPath id="c"><rect /></clipPath></svg>; }`,
      'ClipComp.module.css': '.root { width: 100px; }',
    });

    const result = await validateComponent(dir, { rules: ['dsl-compatible-layout'] });
    expect(result.warnings).toHaveLength(0);
    cleanFixtures();
  });

  it('passes when CSS contains border-bottom (LINE mapping)', async () => {
    const dir = setupFixture('BorderComp', {
      'BorderComp.tsx': `import styles from './BorderComp.module.css';\nexport function BorderComp() { return <div className={styles.root} />; }`,
      'BorderComp.module.css': '.root { border-bottom: 1px solid #000; }',
    });

    const result = await validateComponent(dir, { rules: ['dsl-compatible-layout'] });
    expect(result.warnings).toHaveLength(0);
    cleanFixtures();
  });

  it('warns when CSS does not use flex or grid', async () => {
    const dir = setupFixture('NoLayout', {
      'NoLayout.tsx': `import styles from './NoLayout.module.css';\nexport function NoLayout() { return <div className={styles.root} />; }`,
      'NoLayout.module.css': '.root { color: red; padding: 16px; }',
    });

    const result = await validateComponent(dir, { rules: ['dsl-compatible-layout'] });
    expect(result.warnings).toHaveLength(1);
    expect(result.warnings[0].rule).toBe('dsl-compatible-layout');
    expect(result.warnings[0].message).toContain('flex');
    cleanFixtures();
  });
});

describe('validateComponent integration', () => {
  it('runs all rules and returns combined results', async () => {
    const tsxContent = `import type { HTMLAttributes } from 'react';
import styles from './FullComp.module.css';

interface FullCompProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function FullComp({ variant = 'primary', className, ...rest }: FullCompProps) {
  return <div className={[styles.root, styles[variant], className].filter(Boolean).join(' ')} {...rest} />;
}`;
    const dir = setupFixture('FullComp', {
      'FullComp.tsx': tsxContent,
      'FullComp.module.css': '.root { display: flex; color: var(--text-primary); }',
      'FullComp.figma.tsx': 'export default {};',
    });
    writeFileSync(
      join(FIXTURES_DIR, 'index.ts'),
      `export { FullComp } from './FullComp/FullComp';`
    );
    writeFileSync(join(FIXTURES_DIR, 'tokens.css'), ':root { --text-primary: #000; }');

    const result = await validateComponent(dir);
    expect(result.valid).toBe(true);
    expect(result.checkedRules.length).toBeGreaterThan(0);
    cleanFixtures();
  });

  it('respects skipRules option', async () => {
    const dir = setupFixture('SkipRule', {
      'SkipRule.tsx': 'export function SkipRule() { return <div />; }',
    });

    const result = await validateComponent(dir, {
      skipRules: ['three-file', 'barrel-export', 'css-modules', 'design-tokens', 'token-exists'],
      rules: ['no-inline-style'],
    });
    expect(result.checkedRules).toEqual(['no-inline-style']);
    cleanFixtures();
  });
});

describe('image-refs rule', () => {
  it('passes when no image references exist', async () => {
    const dir = setupFixture('NoImages', {
      'NoImages.tsx': 'export function NoImages() { return <div />; }',
    });
    const result = await validateComponent(dir, { rules: ['image-refs'] });
    expect(result.warnings).toHaveLength(0);
    expect(result.errors).toHaveLength(0);
    cleanFixtures();
  });

  it('warns on missing image file', async () => {
    const dir = setupFixture('MissingImg', {
      'MissingImg.tsx': `
import { image } from '@figma-dsl/core';
const img = image('Photo', { src: './missing.png', size: { x: 100, y: 100 } });
`,
    });
    const result = await validateComponent(dir, { rules: ['image-refs'] });
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]!.message).toContain('not found');
    cleanFixtures();
  });

  it('errors on unsupported format', async () => {
    const dir = setupFixture('BadFormat', {
      'BadFormat.tsx': `
import { image } from '@figma-dsl/core';
const img = image('Icon', { src: './icon.svg', size: { x: 24, y: 24 } });
`,
    });
    const result = await validateComponent(dir, { rules: ['image-refs'] });
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors[0]!.message).toContain('Unsupported image format');
    cleanFixtures();
  });

  it('accepts valid HTTPS URLs', async () => {
    const dir = setupFixture('ValidUrl', {
      'ValidUrl.tsx': `
import { image } from '@figma-dsl/core';
const img = image('Remote', { src: 'https://example.com/photo.png', size: { x: 100, y: 100 } });
`,
    });
    const result = await validateComponent(dir, { rules: ['image-refs'] });
    expect(result.errors).toHaveLength(0);
    expect(result.warnings).toHaveLength(0);
    cleanFixtures();
  });

  it('validates imageFill references', async () => {
    const dir = setupFixture('FillRef', {
      'FillRef.tsx': `
import { imageFill } from '@figma-dsl/core';
const fill = imageFill('./missing-bg.png');
`,
    });
    const result = await validateComponent(dir, { rules: ['image-refs'] });
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]!.message).toContain('not found');
    cleanFixtures();
  });

  it('passes when image file exists', async () => {
    const dir = setupFixture('ExistsImg', {
      'ExistsImg.tsx': `
import { image } from '@figma-dsl/core';
const img = image('Photo', { src: './photo.png', size: { x: 100, y: 100 } });
`,
      'photo.png': 'fake-png-data',
    });
    const result = await validateComponent(dir, { rules: ['image-refs'] });
    expect(result.errors).toHaveLength(0);
    // No "not found" warnings
    const notFoundWarnings = result.warnings.filter(w => w.message.includes('not found'));
    expect(notFoundWarnings).toHaveLength(0);
    cleanFixtures();
  });
});

describe('validation presets', () => {
  it('strict preset keeps original severity levels', async () => {
    const dir = setupFixture('StrictComp', {
      'StrictComp.tsx': `
export function StrictComp() {
  return <div style={{ color: 'red' }}>hello</div>;
}`,
    });

    const result = await validateComponent(dir, { preset: 'strict', rules: ['no-inline-style'] });
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].severity).toBe('error');
    expect(result.preset).toBe('strict');
    cleanFixtures();
  });

  it('normal preset downgrades no-inline-style from error to warning', async () => {
    const dir = setupFixture('NormalComp', {
      'NormalComp.tsx': `
export function NormalComp() {
  return <div style={{ color: 'red' }}>hello</div>;
}`,
    });

    const result = await validateComponent(dir, { preset: 'normal', rules: ['no-inline-style'] });
    expect(result.errors).toHaveLength(0);
    expect(result.warnings).toHaveLength(1);
    expect(result.warnings[0].severity).toBe('warning');
    expect(result.valid).toBe(true);
    cleanFixtures();
  });

  it('loose preset turns off most rules', async () => {
    const dir = setupFixture('LooseComp', {
      'LooseComp.tsx': `
export function LooseComp() {
  return <div style={{ color: 'red' }}>hello</div>;
}`,
    });

    const result = await validateComponent(dir, { preset: 'loose' });
    // no-inline-style, css-modules, classname-prop, variant-union, design-tokens, token-exists,
    // three-file, barrel-export, html-attrs, dsl-compatible-layout are all off in loose
    // Only image-refs remains as warning
    expect(result.errors).toHaveLength(0);
    expect(result.skippedRules.length).toBeGreaterThan(5);
    expect(result.valid).toBe(true);
    cleanFixtures();
  });

  it('severityOverrides take priority over preset', async () => {
    const dir = setupFixture('OverrideComp', {
      'OverrideComp.tsx': `
export function OverrideComp() {
  return <div style={{ color: 'red' }}>hello</div>;
}`,
    });

    // Even with loose preset (no-inline-style → off),
    // explicit override can set it back to error
    const result = await validateComponent(dir, {
      preset: 'loose',
      severityOverrides: { 'no-inline-style': 'error' },
      rules: ['no-inline-style'],
    });
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].severity).toBe('error');
    cleanFixtures();
  });

  it('severity override can turn a rule off', async () => {
    const dir = setupFixture('OffComp', {
      'OffComp.tsx': `
export function OffComp() {
  return <div style={{ color: 'red' }}>hello</div>;
}`,
    });

    const result = await validateComponent(dir, {
      severityOverrides: { 'no-inline-style': 'off' },
      rules: ['no-inline-style'],
    });
    expect(result.errors).toHaveLength(0);
    expect(result.warnings).toHaveLength(0);
    expect(result.skippedRules).toContain('no-inline-style');
    cleanFixtures();
  });

  it('skippedRules tracks rules turned off by preset', async () => {
    const dir = setupFixture('SkippedComp', {
      'SkippedComp.tsx': 'export function SkippedComp() { return <div />; }',
    });

    const result = await validateComponent(dir, { preset: 'normal' });
    expect(result.skippedRules).toContain('three-file');
    expect(result.skippedRules).toContain('barrel-export');
    expect(result.skippedRules).toContain('design-tokens');
    expect(result.skippedRules).toContain('html-attrs');
    cleanFixtures();
  });
});

describe('resolveRuleSeverity', () => {
  it('returns default severity when no preset or overrides', async () => {
    const { resolveRuleSeverity } = await import('../presets.js');
    expect(resolveRuleSeverity('no-inline-style', 'error')).toBe('error');
    expect(resolveRuleSeverity('three-file', 'warning')).toBe('warning');
  });

  it('applies preset severity', async () => {
    const { resolveRuleSeverity } = await import('../presets.js');
    expect(resolveRuleSeverity('no-inline-style', 'error', 'normal')).toBe('warning');
    expect(resolveRuleSeverity('three-file', 'warning', 'normal')).toBe('off');
    expect(resolveRuleSeverity('no-inline-style', 'error', 'loose')).toBe('off');
  });

  it('override takes priority over preset', async () => {
    const { resolveRuleSeverity } = await import('../presets.js');
    expect(resolveRuleSeverity('no-inline-style', 'error', 'loose', { 'no-inline-style': 'error' })).toBe('error');
  });
});
