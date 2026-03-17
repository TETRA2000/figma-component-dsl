# Requirements Document

## Introduction

Banner Mode is a new DSL rendering mode that prioritizes visual richness and design fidelity over React code compatibility. Unlike the standard mode — which constrains layouts to patterns reproducible in both React and Figma — Banner Mode drops React compatibility entirely and lifts most layout limitations, enabling designers and developers to create rich, expressive banner designs (hero images, promotional graphics, event posters, social media assets) directly in the DSL.

Key motivations:
- The current DSL pipeline enforces auto-layout-only positioning to maintain React parity; Banner Mode removes this constraint
- Rich typographic designs require absolute positioning, rotation, and overlapping elements — features excluded from standard mode
- Japanese typography and local font support are essential for multilingual banner creation

## Requirements

### Requirement 1: Banner Mode Flag and Pipeline Integration

**Objective:** As a DSL author, I want to opt into Banner Mode per file so that the compiler and renderer handle my DSL with expanded capabilities while leaving existing standard-mode files unaffected.

#### Acceptance Criteria
1. When a `.dsl.ts` file exports a `mode: 'banner'` property alongside its default node, the compiler shall compile the file using Banner Mode rules.
2. When a `.dsl.ts` file does not export a `mode` property, the compiler shall compile the file using standard mode rules (backward compatible).
3. When a Banner Mode file is compiled, the compiler shall skip all React-compatibility validation rules (e.g., validator preset checks, CSS Modules references).
4. When a Banner Mode file is compiled, the compiled JSON output shall include a `"mode": "banner"` field at the root level.
5. When the renderer receives a compiled JSON with `"mode": "banner"`, the renderer shall enable Banner Mode rendering features (absolute positioning, rotation, extended typography).
6. The CLI `compile`, `render`, and `export` commands shall support Banner Mode files without requiring additional flags.

### Requirement 2: Absolute Positioning Support

**Objective:** As a DSL author, I want to place nodes at arbitrary absolute positions so that I can create overlapping, freely composed layouts not limited to auto-layout stacking.

#### Acceptance Criteria
1. When a Banner Mode frame has no `autoLayout` property, the renderer shall position its children using their `x` and `y` coordinates relative to the frame's top-left corner.
2. When a child node specifies `x` and `y` properties inside a Banner Mode frame, the renderer shall place the node at those exact pixel coordinates.
3. When a child node specifies a `rotation` property (in degrees), the renderer shall rotate the node around its center by that angle.
4. When children overlap due to absolute positioning, the renderer shall paint them in source order (later children on top).
5. If a child node in Banner Mode specifies `x` or `y` without being in an absolute-positioning context, the compiler shall emit a warning.

### Requirement 3: Extended Typography

**Objective:** As a DSL author, I want richer text styling options so that I can create visually impactful typographic designs for banners.

#### Acceptance Criteria
1. When a text node in Banner Mode specifies `textTransform: 'UPPERCASE' | 'LOWERCASE' | 'CAPITALIZE'`, the renderer shall apply the specified text transformation before rendering.
2. When a text node in Banner Mode specifies `textStroke` with `color` and `width` properties, the renderer shall render a stroke outline around the text glyphs.
3. When a text node in Banner Mode specifies `textShadow` with `color`, `offsetX`, `offsetY`, and `blur` properties, the renderer shall render a drop shadow behind the text.
4. When a text node in Banner Mode specifies `gradient` fills (using the existing `fills` property with gradient type), the renderer shall apply gradient coloring to the text glyphs.
5. The text node shall support `opacity` property in Banner Mode for semi-transparent text layering.

### Requirement 4: Japanese Font Support

**Objective:** As a DSL author, I want to use Japanese fonts so that I can create banners with proper Japanese typography.

#### Acceptance Criteria
1. The DSL core shall bundle Noto Sans JP font files covering weights 100–900 for Japanese text rendering.
2. When a text node specifies `fontFamily: 'Noto Sans JP'`, the renderer shall use the bundled Noto Sans JP font at the specified weight.
3. When a text node contains Japanese characters (CJK Unified Ideographs, Hiragana, Katakana) and no explicit `fontFamily` is set, the renderer shall automatically select Noto Sans JP as the font.
4. The renderer shall correctly measure and render mixed Latin-Japanese text within a single text node, applying appropriate font fallback per glyph range.

### Requirement 5: Local Font Loading

**Objective:** As a DSL author, I want to load custom local fonts so that I can use brand-specific or stylistic fonts in my banner designs.

#### Acceptance Criteria
1. When a Banner Mode file calls `registerFont(path, { family, weight?, style? })`, the compiler shall register the font file for use during rendering.
2. When a text node specifies a `fontFamily` matching a registered font's family name, the renderer shall use that registered font.
3. The `registerFont` function shall accept `.ttf`, `.otf`, and `.woff2` font file formats.
4. If a `registerFont` call references a font file that does not exist at the specified path, the compiler shall emit an error with the missing file path.
5. When `--asset-dir` is provided to CLI commands, the renderer shall resolve relative font paths against the asset directory.

### Requirement 6: Enhanced Visual Effects

**Objective:** As a DSL author, I want access to visual effects beyond the standard mode so that I can create polished, production-quality banner designs.

#### Acceptance Criteria
1. When a frame or rectangle node in Banner Mode specifies `shadow` with `color`, `offsetX`, `offsetY`, `blur`, and optional `spread` properties, the renderer shall render a drop shadow.
2. When a node in Banner Mode specifies `blur: { type: 'LAYER', radius: number }`, the renderer shall apply a Gaussian blur to the node's rendered output.
3. When a node in Banner Mode specifies `blur: { type: 'BACKGROUND', radius: number }`, the renderer shall apply a background blur effect (frosted glass).
4. When a node in Banner Mode specifies `blendMode` (e.g., `'MULTIPLY'`, `'SCREEN'`, `'OVERLAY'`), the renderer shall use the specified blend mode when compositing the node.
5. If a standard-mode file uses Banner Mode-only properties (shadow, blur, blendMode, rotation), the compiler shall emit a warning that these properties are ignored outside Banner Mode.

### Requirement 7: Figma Export Compatibility

**Objective:** As a DSL author, I want Banner Mode designs to export correctly to Figma so that the rich designs can be used in Figma workflows.

#### Acceptance Criteria
1. When a Banner Mode compiled JSON is exported via `bin/figma-dsl export`, the exporter shall produce valid `.figma.json` output.
2. When absolute-positioned children are exported, the exporter shall output `x` and `y` coordinates in the Figma JSON node data.
3. When a node with `rotation` is exported, the exporter shall include the `rotation` property in the Figma JSON (in degrees).
4. When Banner Mode-only visual effects (shadow, blur, blendMode) are exported, the exporter shall map them to the corresponding Figma plugin API properties.
5. When a locally registered font is used, the exporter shall include the font family name in the exported text node data (Figma resolves fonts by name on import).

### Requirement 8: React Compatibility Exclusion

**Objective:** As a project maintainer, I want Banner Mode to explicitly exclude React-related workflows so that the separation between banner and standard modes is clear.

#### Acceptance Criteria
1. When a Banner Mode file is processed, the validator shall skip all React-compatibility rules (three-file pattern, CSS Modules check, barrel-export check).
2. When `bin/figma-dsl capture` is invoked on a Banner Mode file, the CLI shall skip React screenshot capture and emit an informational message that capture is not supported for Banner Mode.
3. When `bin/figma-dsl compare` is invoked with a Banner Mode render, the CLI shall allow comparison against any PNG (no React screenshot requirement).
4. The DSL reference documentation shall clearly indicate which features are Banner Mode-only and which are available in both modes.
