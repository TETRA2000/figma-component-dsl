# Implementation Plan

- [x] 1. Define Banner Mode types in DSL Core
- [x] 1.1 Add visual effect and blend mode types to the node type system
  - Define the discriminated union for drop shadow and layer blur effects with their respective properties (color, offset, blur, radius, spread)
  - Define the blend mode enumeration covering standard compositing operations (multiply, screen, overlay, etc.)
  - Add optional `effects` array and `blendMode` fields to the node interface
  - Ensure `rotation` property is consistently available on nodes
  - Update node factory functions to accept and pass through effects, blendMode, and rotation
  - _Requirements: 6.1, 6.2, 6.4_
  - _Contracts: DslNode Extensions_

- [x] 1.2 Add extended typography properties to the text style interface
  - Add `textTransform` (uppercase, lowercase, capitalize), `textStroke` (color + width), and `textShadow` (color + offset + blur) as optional fields
  - Update text node factory functions to accept and pass through the new style properties
  - _Requirements: 3.1, 3.2, 3.3_
  - _Contracts: DslNode Extensions_

- [x] 1.3 Define the font declaration type for custom font loading
  - Create the `FontDeclaration` interface with path, family, optional weight (100–900, default 400), and optional style (normal/italic)
  - Export the type from the package public API so DSL authors can annotate their `fonts` export
  - _Requirements: 5.1, 5.3_
  - _Contracts: FontDeclaration Type_

- [x] 2. Add mode awareness to the compiler
- [x] 2.1 Thread the mode flag through compilation options and results
  - Add optional `mode` field ('standard' | 'banner') to compiler options, defaulting to 'standard' when absent
  - Propagate the mode value into the compile result so downstream consumers (renderer, exporter) can branch on it
  - Ensure that when mode is undefined, the compiler behaves identically to current behavior
  - _Requirements: 1.1, 1.3, 1.4_
  - _Contracts: CompilerOptions Extension_

- [x] 2.2 Implement absolute positioning in the layout resolver for Banner Mode
  - When mode is 'banner' and a frame has no auto-layout, position each child at its declared x/y coordinates relative to the frame's top-left corner
  - Apply rotation as a transform matrix rotation around each child's center point
  - Children without explicit x/y default to (0, 0); children are painted in source order (later children on top)
  - Emit a warning (not error) when x/y is used outside an absolute positioning context
  - Standard-mode behavior remains unchanged — non-auto-layout children still placed at (0, 0)
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_
  - _Contracts: Layout Resolver Extension_

- [x] 3. (P) Build the font manager in the renderer
- [x] 3.1 Register bundled fonts and resolve font families by script
  - Initialize bundled fonts (Inter for Latin, Noto Sans JP for CJK) at renderer startup
  - Implement font family resolution: given text content and an optional requested family, return the appropriate registered family (auto-detect CJK characters for Noto Sans JP fallback)
  - Replace the existing `initializeRenderer(fontDir)` entry point with the new font manager initialization
  - _Requirements: 4.1, 4.2, 4.3, 4.4_
  - _Contracts: Font Manager_

- [x] 3.2 Register custom fonts from declarative font declarations
  - Accept an array of font declarations (from the DSL file's `fonts` export) and register each with the canvas font system
  - Resolve relative font paths against the `--asset-dir` CLI option
  - Emit a compile error with the missing file path when a declared font file does not exist
  - Retain font buffer references in a module-level map to prevent garbage collection during the process lifetime
  - _Requirements: 5.1, 5.2, 5.4, 5.5_
  - _Contracts: Font Manager_

- [x] 3.3 Support WOFF2 font decompression
  - When a `.woff2` font is declared, decompress it to TTF before canvas registration using the optional `@woff2/woff2-rs` peer dependency
  - If the peer dependency is not installed, emit a clear error with installation instructions
  - Cache decompressed buffers to avoid redundant decompression in batch processing
  - _Requirements: 5.3_
  - _Contracts: Font Manager_

- [x] 4. (P) Implement visual effects rendering
- [x] 4.1 Render drop shadows on canvas nodes
  - Before drawing a node, set canvas shadow properties (shadowColor, shadowBlur, shadowOffsetX, shadowOffsetY) based on the node's drop shadow effect definition
  - Apply shadow before coordinate transforms to avoid the known @napi-rs/canvas translate bug
  - Clear shadow state after drawing to prevent bleed to subsequent nodes
  - Bracket all effect applications with save/restore to preserve canvas state
  - _Requirements: 6.1_
  - _Contracts: Effects Helper_

- [x] 4.2 Render layer blur using off-screen canvas compositing
  - Render the node to an off-screen canvas, apply a Gaussian blur filter (`ctx.filter = 'blur(Xpx)'`), and composite the result back onto the main canvas
  - Use the node's computed bounds for the off-screen canvas dimensions
  - _Requirements: 6.2_
  - _Contracts: Effects Helper_

- [x] 4.3 Apply blend modes during node compositing
  - Set `globalCompositeOperation` on the canvas context to the mapped blend mode before drawing the node
  - Reset to 'source-over' (normal) after the node is drawn
  - _Requirements: 6.4_
  - _Contracts: Effects Helper_

- [x] 4.4 Emit warnings for Banner Mode-only properties used in standard mode
  - When the compiler encounters effects, blur, blendMode, or rotation properties on nodes in standard mode, emit a warning that these properties are ignored outside Banner Mode
  - Do not treat this as an error — compilation should succeed
  - _Requirements: 6.5_

- [x] 5. (P) Extend text rendering for Banner Mode typography
- [x] 5.1 Implement text transform, stroke, and shadow for text nodes
  - Apply text transform (uppercase, lowercase, capitalize) to text content before measuring and rendering
  - After filling text, apply stroke with the specified color and width using `strokeText`
  - Set canvas shadow properties before `fillText` to render text shadow
  - Only apply these enhancements when the Banner Mode text properties are present; standard text rendering remains unchanged
  - _Requirements: 3.1, 3.2, 3.3_
  - _Contracts: Text Renderer Extension_

- [x] 5.2 Implement gradient fill for text nodes
  - When a text node uses gradient fills, create a `CanvasGradient` matching the text bounds and set it as the `fillStyle` before rendering
  - Support the existing gradient type from the fills property
  - _Requirements: 3.4_
  - _Contracts: Text Renderer Extension_

- [x] 5.3 Support text opacity in Banner Mode
  - Apply the node's opacity property as `globalAlpha` during text rendering for semi-transparent text layering
  - _Requirements: 3.5_
  - _Contracts: Text Renderer Extension_

- [x] 6. (P) Map effects to Figma export format
  - Convert DSL drop shadow effects to the Figma effects array format (type, visible, color as 0–1 RGBA, offset, spread, radius)
  - Convert DSL layer blur effects to the Figma effects array format
  - Map DSL blend mode values to the corresponding Figma blendMode property strings
  - Include absolute x/y coordinates and rotation in exported node data
  - Include registered font family names in exported text node data for Figma font resolution
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_
  - _Contracts: Effects Mapper_

- [x] 7. (P) Create the Banner Mode validator preset
  - Define a banner preset that disables all React-specific validation rules (three-file, barrel-export, CSS Modules, inline-style, design-tokens, token-exists, classname-prop, variant-union, html-attrs, dsl-compatible-layout)
  - Keep image reference validation active as a warning
  - Apply the preset automatically when the detected mode is 'banner'
  - _Requirements: 8.1_
  - _Contracts: Banner Preset_

- [x] 8. Wire Banner Mode through the CLI
- [x] 8.1 Detect mode and read font declarations from DSL module exports
  - After dynamic import of a `.dsl.ts` file, check for a `mode` named export; if it equals `'banner'`, enable Banner Mode pipeline
  - Read the `fonts` named export (array of font declarations) and resolve each entry into a font registration with absolute paths
  - If `mode` is present but not `'banner'`, emit a warning and fall back to standard mode
  - Validate font declaration extensions (.ttf, .otf, .woff2) at read time
  - _Requirements: 1.1, 1.2, 1.6, 5.1_
  - _Contracts: CLI Mode Detection_

- [x] 8.2 Pass mode and fonts through compile, render, and export commands
  - Pass the detected mode into compiler options so the layout resolver branches correctly
  - Pass the resolved font registrations into the font manager initialization before rendering
  - Ensure the mode flows through to the exporter for correct Figma JSON generation
  - The `compile`, `render`, and `export` commands should work with Banner Mode files without additional CLI flags
  - _Requirements: 1.4, 1.5, 1.6_
  - _Contracts: CLI Mode Detection_

- [x] 8.3 Skip React screenshot capture for Banner Mode files
  - When `capture` is invoked on a Banner Mode file, skip the Playwright screenshot capture and print an informational message explaining that capture is not supported for Banner Mode
  - Exit with code 0 (not an error)
  - When `compare` is invoked with a Banner Mode render, allow comparison against any PNG without requiring a React screenshot
  - _Requirements: 8.2, 8.3_

- [x] 9. End-to-end integration tests
- [x] 9.1 Verify the full Banner Mode pipeline from DSL file to PNG and Figma JSON
  - Create a Banner Mode test DSL file using absolute positioning, effects, custom fonts, and extended typography
  - Compile, render, and export the file; verify that the PNG is produced and the Figma JSON contains the mode field, effects array, absolute coordinates, and rotation
  - Verify that the banner validator preset is applied (React rules skipped)
  - _Requirements: 1.1, 1.4, 1.5, 1.6, 7.1, 8.1_

- [x] 9.2 Verify standard mode backward compatibility
  - Compile and render an existing standard-mode DSL file through the updated pipeline
  - Verify that output is identical to pre-change behavior — no Banner Mode features applied, no warnings emitted, all React validation rules active
  - _Requirements: 1.2_

## Requirements Coverage

| Requirement | Task(s) |
|-------------|---------|
| 1.1 | 2.1, 8.1, 9.1 |
| 1.2 | 2.1, 9.2 |
| 1.3 | 2.1 |
| 1.4 | 2.1, 8.2, 9.1 |
| 1.5 | 8.2, 9.1 |
| 1.6 | 8.1, 8.2, 9.1 |
| 2.1 | 2.2 |
| 2.2 | 2.2 |
| 2.3 | 1.1, 2.2 |
| 2.4 | 2.2 |
| 2.5 | 2.2 |
| 3.1 | 1.2, 5.1 |
| 3.2 | 1.2, 5.1 |
| 3.3 | 1.2, 5.1 |
| 3.4 | 5.2 |
| 3.5 | 5.3 |
| 4.1 | 3.1 |
| 4.2 | 3.1 |
| 4.3 | 3.1 |
| 4.4 | 3.1 |
| 5.1 | 1.3, 3.2, 8.1 |
| 5.2 | 3.2 |
| 5.3 | 1.3, 3.3 |
| 5.4 | 3.2 |
| 5.5 | 3.2 |
| 6.1 | 1.1, 4.1 |
| 6.2 | 1.1, 4.2 |
| 6.3 | Deferred to phase 2 (BACKGROUND_BLUR) |
| 6.4 | 1.1, 4.3 |
| 6.5 | 4.4 |
| 7.1 | 6, 9.1 |
| 7.2 | 6 |
| 7.3 | 6 |
| 7.4 | 6 |
| 7.5 | 6 |
| 8.1 | 7, 9.1 |
| 8.2 | 8.3 |
| 8.3 | 8.3 |
| 8.4 | Excluded (documentation task) |

**Deferred**: 6.3 (BACKGROUND_BLUR) — deferred to phase 2 per design review; requires two-pass rendering with ambiguous sibling-order semantics.
**Excluded**: 8.4 (documentation) — per task generation rules, documentation tasks are out of scope.
