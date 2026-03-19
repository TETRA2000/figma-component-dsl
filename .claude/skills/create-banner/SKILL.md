---
name: create-banner
description: >
  Create banners using the DSL canvas mode — produces a .dsl.ts file, compiled JSON,
  Figma plugin JSON, and a rendered PNG image. Use this skill whenever the user wants
  to create a banner, promotional graphic, hero image, event poster, campaign visual,
  advertisement, or any rich visual design that goes beyond standard component layouts.
  Also trigger when the user mentions canvas mode, wants absolute positioning with
  overlapping elements, or needs visual effects like shadows, blur, text strokes, or
  rotated elements. Covers: "create a banner", "make a promotional graphic", "design
  an event poster", "build a hero image", "campaign banner", "advertisement design",
  "make a banner for", "I need a banner", "create visual with effects".
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

# Create Banner

Generate rich visual banners using the DSL canvas mode pipeline: write a `.dsl.ts` file, compile to JSON, export Figma plugin JSON, and render a PNG preview.

## Workflow Overview

1. **Gather requirements** — ask the user what they want
2. **Write the DSL** — create a `.dsl.ts` file with `mode = 'canvas'`
3. **Compile & render** — produce JSON, Figma JSON, and PNG
4. **Review & iterate** — show the PNG, refine based on feedback

## Step 1: Gather Requirements

Before writing any code, ask the user about their banner. Collect at minimum:

- **Purpose**: What is the banner for? (event, campaign, product launch, social media, etc.)
- **Dimensions**: What size? Common sizes: 1200x600 (landscape), 860x860 (square), 1080x1920 (story)
- **Content**: What text, images, or elements should appear?
- **Style/mood**: Colors, theme, visual style (bold, minimal, elegant, playful, etc.)
- **Reference**: Do they have a reference image or URL for inspiration?

If the user provides a Figma URL, use `mcp__figma__get_screenshot` and `mcp__figma__get_design_context` to extract the design intent.

If the user provides a website URL, use Playwright MCP tools to capture a screenshot for reference.

### Font Decision

- **Always use Noto Sans JP as the default font** for all banners. Set `fontFamily: 'Noto Sans JP'` on every text node.
- The `fonts` export can remain empty (`[]`) — the renderer resolves Noto Sans JP from the system/registered fonts.
- Only add entries to the `fonts` array when the user requests a **custom brand font** that needs to be loaded from a local file path.

## Step 2: Write the DSL File

Create the file at `examples/<banner-name>.dsl.ts`.

### Canvas Mode Template

```ts
import {
  frame, text, rectangle,
  solid, gradient,
  horizontal, vertical,
} from '@figma-dsl/core';

import type { FontDeclaration } from '@figma-dsl/core';

// Enable Canvas Mode
export const mode = 'canvas';

// Font declarations (empty unless custom brand fonts needed)
export const fonts: FontDeclaration[] = [];

export default frame('BannerName', {
  size: { x: 1200, y: 600 },
  fills: [solid('#000000')],
  children: [
    text('Title', {
      fontSize: 48,
      fontWeight: 700,
      fontFamily: 'Noto Sans JP',  // Always use Noto Sans JP as default
      color: '#ffffff',
    }),
  ],
});
```

### Canvas Mode Capabilities

These features are available **only in canvas mode** (via `export const mode = 'canvas'`):

| Feature | API | Example |
|---------|-----|---------|
| Absolute positioning | `x`, `y` on any node | `rectangle('Bg', { ..., x: 0, y: 0 })` |
| Rotation | `rotation` in degrees | `rectangle('Badge', { ..., rotation: 15 })` |
| Drop shadow | `effects: [{ type: 'DROP_SHADOW', ... }]` | See effects section |
| Layer blur | `effects: [{ type: 'LAYER_BLUR', radius: N }]` | Frosted glass effect |
| Blend modes | `blendMode: 'MULTIPLY'` | Overlay effects |
| Text stroke | `textStroke: { color, width }` | Outlined text |
| Text shadow | `textShadow: { color, offsetX, offsetY, blur }` | Drop shadow on text |
| Text transform | `textTransform: 'UPPERCASE'` | Case transformation |
| Gradient text | `fills` on text node | Gradient-filled typography |
| Custom fonts | `export const fonts` | Noto Sans JP, custom brand fonts |

### Layout Approach

Banner mode supports two layout strategies — use whichever fits the design:

1. **Auto-layout** (`autoLayout: vertical(...)` / `horizontal(...)`) — for structured, aligned sections. Works the same as standard mode. Good for text stacks, rows of badges, disclaimer sections.

2. **Absolute positioning** (`x`, `y` on child nodes, NO `autoLayout` on parent) — for free-form, overlapping designs. The parent frame omits `autoLayout` and children specify their coordinates.

You can **mix both**: a root frame with no autoLayout containing absolutely-positioned children, where some children themselves use autoLayout for internal structure.

### Effects Reference

```ts
// Drop shadow
effects: [{
  type: 'DROP_SHADOW',
  color: { r: 0, g: 0, b: 0, a: 0.5 },
  offsetX: 4, offsetY: 4,
  blur: 8,
  spread: 0  // optional
}]

// Layer blur
effects: [{
  type: 'LAYER_BLUR',
  radius: 20
}]

// Blend mode (on any node)
blendMode: 'MULTIPLY'  // SCREEN, OVERLAY, DARKEN, LIGHTEN, etc.
```

### Text Effects Reference

```ts
text('Title', {
  fontSize: 48,
  fontWeight: 700,
  fontFamily: 'Noto Sans JP',  // Default font for all banners
  color: '#ffffff',

  // Text stroke (outline)
  textStroke: { color: '#0099ff', width: 2 },

  // Text shadow
  textShadow: {
    color: 'rgba(0,0,0,0.4)',
    offsetX: 2, offsetY: 2, blur: 8
  },

  // Text transform
  textTransform: 'UPPERCASE',  // 'LOWERCASE' | 'CAPITALIZE'

  // Gradient text fill
  fills: [gradient([
    { hex: '#ff0000', position: 0 },
    { hex: '#0000ff', position: 1 }
  ], 135)],
})
```

### Typography Sizing

Banners are viewed at a distance or on small screens — text must be large enough to read at a glance. Use these minimum font sizes:

| Role | Minimum fontSize | Typical range | fontWeight |
|------|-----------------|---------------|------------|
| Main title / headline | 56px | 56–80px | 700–900 |
| Key numbers (prices, discounts, dates) | 48px | 48–120px | 700–900 |
| Subtitle / subheading | 28px | 28–40px | 500–700 |
| Body / description text | 22px | 22–28px | 400–500 |
| Disclaimer / fine print | 16px | 16–18px | 400 |

**Never use fontSize below 16px** — anything smaller becomes unreadable when the banner is rendered. If information doesn't fit at readable sizes, reduce the amount of text rather than shrinking the font.

For discount/sale banners, the discount amount (e.g. "30%OFF") should be the largest text on the banner — typically 80–120px.

### Readability Rules

Readability is more important than decoration. Follow these rules:

1. **Use solid colors for important text.** Gradient fills on text look flashy but reduce readability — the color transitions make letterforms harder to distinguish. Only use gradient fills on decorative text that doesn't need to be read quickly (e.g. a watermark or background texture). For headlines, dates, prices, and any text the user needs to read: use a solid `color` property.

2. **Use bold weights for titles.** Main titles should be `fontWeight: 700` or `900`. Thin/light weights (300-400) don't stand out enough on banner backgrounds — especially on dark or gradient backgrounds where contrast is already reduced.

3. **High contrast is essential.** White text on dark backgrounds, dark text on light backgrounds. Avoid mid-tone text (grays) on mid-tone backgrounds. If using a colorful background, add `textShadow` to ensure text pops.

4. **Less text, bigger sizes.** A banner with 3-5 large, readable text elements beats one with 10+ small text elements. Cut secondary information rather than shrinking it.

### Design Tips

- Use `clipContent: true` on the root frame to prevent overflow
- Layer elements back-to-front (first child = bottommost layer)
- Use semi-transparent fills (`solid('#ffffff', 0.15)`) for glass/frost effects
- Combine `textStroke` + `textShadow` for high-contrast readable text over busy backgrounds
- Use decorative helper functions to avoid repetition (lines, badges, separators)
- Prioritize readability — fewer words at larger sizes beats more content that's hard to read

## Step 3: Compile, Export, and Render

Run the full pipeline from the project root:

```bash
# Compile to intermediate JSON
bin/figma-dsl compile examples/<name>.dsl.ts -o output/<name>.json

# Export Figma plugin JSON
bin/figma-dsl export examples/<name>.dsl.ts -o output/<name>.figma.json

# Render to PNG
bin/figma-dsl render output/<name>.json -o output/<name>.png
```

If any step fails, read the error output carefully:
- **Compile errors**: Usually TypeScript issues in the DSL file. Fix the `.dsl.ts` and retry.
- **Render errors**: Font loading issues or unsupported features. Check font paths and effect definitions.
- **Export errors**: Usually malformed node structure. Validate the compiled JSON.

## Step 4: Review and Iterate

After rendering, show the PNG to the user by reading `output/<name>.png` with the Read tool.

Ask: "Here's the rendered banner. Would you like to adjust anything — layout, colors, text, effects?"

Common iteration requests:
- **"Make it bigger/smaller"** — adjust `size` on root frame
- **"Change colors"** — update fill hex values
- **"Add shadow"** — add `effects` array or `textShadow`
- **"Move X"** — adjust `x`/`y` coordinates or autoLayout spacing
- **"Add more text"** — add `text()` nodes
- **"Make text pop more"** — add `textStroke`, `textShadow`, or increase `fontSize`

After each edit, re-run the compile/export/render pipeline and show the updated PNG.

## Output Files

After completion, the user will have:

| File | Purpose |
|------|---------|
| `examples/<name>.dsl.ts` | Source DSL file (editable) |
| `output/<name>.json` | Compiled intermediate JSON |
| `output/<name>.figma.json` | Figma plugin import JSON |
| `output/<name>.png` | Rendered preview image |

The `.figma.json` file can be imported into Figma using the DSL plugin. The `.png` serves as a visual reference.
