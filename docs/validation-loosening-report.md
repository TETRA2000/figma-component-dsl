# DSL Validation Loosening Report

> Date: 2026-03-15
> Scope: 100 pages across 10 industries, compiled and rendered via the DSL pipeline
> Branch: `claude/expand-dsl-validation-afCw4`

## Executive Summary

After creating 100 DSL pages across 10 diverse industries and stress-testing the full compile-render pipeline, we systematically evaluated which validation rules can be safely loosened. The key finding: **most validator rules are React component quality rules, not DSL rendering quality rules**. They can be loosened significantly without any impact on pipeline output quality, because DSL pages bypass the React component layer entirely.

### Recommendation

Change the default validator preset from `strict` to `normal` for general use. Keep `strict` as an opt-in for production component libraries.

---

## Test Results

### Pipeline Stress Test

| Metric | Result |
|--------|--------|
| Total DSL pages | 100 |
| Successful compilations | 100/100 |
| Successful renders | 100/100 |
| Total render output | 13 MB (100 PNGs) |
| Compilation errors found during authoring | 6 (all fixed) |
| Industries covered | 10 |
| DSL features exercised | All (see coverage matrix below) |

### Common Authoring Errors Found

| Error | Count | Root Cause | Fix |
|-------|-------|-----------|-----|
| Empty text `text('')` | 3 | Ternary with empty fallback | Use placeholder char `'·'` |
| `solid('transparent')` | 2 | CSS mental model leaking | Use empty fills array `[]` |
| `star(name, pointCount, props)` | 1 | Wrong API signature | Use `star(name, { pointCount, ...})` |

These errors are **DSL authoring issues**, not pipeline bugs. They suggest opportunities for better error messages and documentation.

---

## Per-Rule Assessment

### Validator Rules (11 total)

| Rule | Default Severity | Safe to Loosen? | Recommended | Reasoning |
|------|-----------------|----------------|-------------|-----------|
| `three-file` | warning | **YES** | `off` | Only relevant for React components with Code Connect. DSL pages don't have .figma.tsx or .module.css files. Zero impact on rendering. |
| `barrel-export` | warning | **YES** | `off` | Only relevant for component library organization. Zero impact on rendering. |
| `css-modules` | error | **YES** | `warning` | CSS Modules are a React styling choice. DSL pages define styles inline via fills/strokes/text props. Zero impact on rendering. |
| `no-inline-style` | error | **YES** | `warning` | Inline styles are banned to enforce CSS Module usage. Not relevant for DSL authoring where all styles are declarative props. Zero impact on rendering. |
| `design-tokens` | warning | **YES** | `off` | Design tokens enforce consistency in React CSS. DSL pages use hex colors directly — this is the expected pattern, not a violation. Zero impact on rendering. |
| `token-exists` | error | **YES** | `warning` | Token reference validation only matters when using CSS `var()`. DSL pages don't use CSS. Zero impact on rendering. |
| `classname-prop` | error | **YES** | `warning` | className composition is a React component API concern. Not relevant for DSL. Zero impact on rendering. |
| `variant-union` | error | **YES** | `warning` | String literal unions enforce type safety in React props. DSL uses `componentProperties` with explicit types. Zero impact on rendering. |
| `html-attrs` | warning | **YES** | `off` | HTML attribute passthrough is a React component API pattern. Not relevant for DSL. Zero impact on rendering. |
| `dsl-compatible-layout` | warning | **CONTEXT** | `warning` | Checks if CSS uses flex/grid. Useful as a lint hint for React→DSL migration, but not a quality gate. Minor impact: warns developers if their CSS won't map cleanly to auto-layout. |
| `image-refs` | error/warning | **PARTIAL** | `warning` | Format validation (PNG/JPEG/WebP) is pipeline-relevant. File existence checks are helpful. Size warnings can be relaxed. Reduce error→warning for most checks. |

### Compiler Validation Checks

| Check | Default | Safe to Loosen? | Recommended | Reasoning |
|-------|---------|----------------|-------------|-----------|
| `cornerRadius >= 0` | error | **PARTIAL** | `warning` in loose mode | Negative values are meaningless but don't crash. Can clamp to 0. |
| `RGBA values 0-1` | error | **NO** | `error` always | Figma API hard constraint. Values outside range produce undefined behavior. |
| `strokeWeight > 0` | error | **YES** | `warning` in normal mode | `strokeWeight: 0` = invisible stroke. Valid use case (hidden state). No crash. |
| `IMAGE node has src` | error | **NO** | `error` always | Missing image source = broken node. Always required. |
| `TEXT fontSize > 0` | error | **PARTIAL** | `warning` in loose mode | `fontSize: 0` = invisible text. Valid for spacer text nodes. No crash. |

---

## DSL Feature Coverage Matrix

| Batch | Industry | Key Features Tested | Pages | All Compiled? | All Rendered? |
|-------|----------|-------------------|-------|---------------|---------------|
| 1 | Technology/SaaS | vertical, horizontal, gradient, text styles, cornerRadius, strokes | 10 | Yes | Yes |
| 2 | E-commerce | Nested layouts, FILL sizing, strokes, SPACE_BETWEEN, rectangles | 10 | Yes | Yes |
| 3 | Food & Restaurant | Rich typography, gradients, opacity, per-corner radii (cornerRadii) | 10 | Yes | Yes |
| 4 | Healthcare | Ellipses, strokes, text wrapping, SPACE_BETWEEN, medical colors | 10 | Yes | Yes |
| 5 | Education | Progress bars, nested auto-layout, complex text, letterSpacing | 10 | Yes | Yes |
| 6 | Finance | FIXED sizing, precise alignment, data tables, gradient progress | 10 | Yes | Yes |
| 7 | Travel | clipContent, image fills, overlay patterns, FILL sizing | 10 | Yes | Yes |
| 8 | Media/Entertainment | Multi-stop gradients, dark themes, horizontal card rows | 10 | Yes | Yes |
| 9 | Real Estate | line(), ellipse(), strokes, mixed sizing, sections | 10 | Yes | Yes |
| 10 | Creative/Portfolio | ALL features: polygon, star, group, section, radialGradient, clipContent, opacity, textDecoration, SPACE_BETWEEN | 10 | Yes | Yes |

---

## Preset Configurations

### `strict` (current default)
All rules at original severity. Suitable for production React component libraries.

### `normal` (recommended new default)
- `three-file` → off
- `barrel-export` → off
- `css-modules` → warning
- `no-inline-style` → warning
- `design-tokens` → off
- `token-exists` → warning
- `classname-prop` → warning
- `variant-union` → warning
- `html-attrs` → off
- `dsl-compatible-layout` → warning
- `image-refs` → warning

### `loose`
Nearly all rules off. Suitable for rapid prototyping and DSL-only workflows.

---

## Key Findings

### 1. Validator rules are React-centric, not rendering-centric
9 of 11 validator rules check React component patterns (CSS Modules, className composition, barrel exports, design tokens). These have zero impact on DSL compilation or rendering quality. They can be safely turned off for DSL-only workflows.

### 2. The compiler validation is the real quality gate
The 5 compiler checks (cornerRadius, RGBA, strokeWeight, IMAGE src, fontSize) are the rules that actually affect rendering output. These should remain strict by default, with per-check loosening only for specific use cases.

### 3. Common DSL authoring pitfalls
The 6 compilation errors found during 100-page authoring reveal consistent patterns:
- **Empty text nodes**: Authors write ternaries like `condition ? '✓' : ''` — the DSL should either accept empty strings (render as zero-width) or provide a clearer error message suggesting a placeholder.
- **CSS color leakage**: Authors try `solid('transparent')` — the DSL should document that empty fills `[]` is the correct approach.
- **API shape confusion**: `star(name, pointCount, props)` vs `star(name, { pointCount })` — the API should be more intuitive or better documented.

### 4. Performance is excellent
100 pages compiled and rendered in under 60 seconds total. No memory issues, no canvas pooling exhaustion. The pipeline handles diverse content well.

### 5. Feature coverage is comprehensive
All DSL primitives were exercised across the 100 pages: frame, text, rectangle, ellipse, polygon, star, line, group, section, component, solid, gradient, radialGradient, cornerRadius, cornerRadii, clipContent, opacity, strokes (INSIDE/CENTER/OUTSIDE/multi-stroke), textDecoration, textAutoResize, letterSpacing, lineHeight, FILL/HUG/FIXED sizing, SPACE_BETWEEN, and nested auto-layout.

---

## Recommendations

1. **Change default preset to `normal`** — Reduces noise from React-centric rules that don't affect DSL output.
2. **Add `'transparent'` support to `solid()`** — Map `solid('transparent')` to `solid('#00000000')` instead of throwing.
3. **Allow empty text nodes in `loose` mode** — Use zero-width rendering instead of throwing.
4. **Update `docs/dsl-reference.md`** — Add "Common Pitfalls" section covering the 3 authoring error patterns found.
5. **Consider adding `star()` signature overload** — `star(name, pointCount, props)` as sugar for `star(name, { pointCount, ...props })`.
