# Awwwards Dogfooding: Design Difficulties & Limitations

> Date: 2026-03-14 | Iterations: 30 | Themes: Awwwards-inspired designs

## Design Difficulties Due to React Component Limitations

### 1. No Backdrop Blur / CSS Blur
**Theme affected:** Glassmorphism (Iteration 2), Neomorphism (Iteration 10)
**Issue:** CSS `backdrop-filter: blur()` is a core part of glassmorphism design. While the React component can use this CSS property, the DSL pipeline has no equivalent — there is no blur/shadow effect support. The frosted glass look must be approximated using semi-transparent solid fills (`solid('#ffffff', 0.15)`) without actual blur.
**Workaround:** Use opacity fills to simulate frosted glass. The visual result is passable but lacks the characteristic "frosted" quality.

### 2. No Drop Shadows or Box Shadows
**Theme affected:** Neomorphism (Iteration 10), Scandinavian Minimal (Iteration 17)
**Issue:** Neomorphism's entire visual identity relies on soft shadows (both inset and drop shadows). Without shadow support in the DSL pipeline, neumorphic designs must rely on strokes and subtle fill color differences to approximate depth.
**Workaround:** Use white/light strokes on the top-left edge to simulate light source, and darker background adjacent areas. This is a poor substitute for true shadows but maintains the general feel.

### 3. No Custom Fonts
**Theme affected:** All themes
**Issue:** The DSL pipeline only supports Inter (regular, medium, semibold, bold) and Noto Sans JP. Many Awwwards designs use distinctive typefaces (serif fonts, display fonts, monospace fonts) as a core part of their identity. Brutalist designs often use monospace, fashion editorial uses elegant serifs, etc.
**Workaround:** All text renders in Inter regardless. For themes where typography IS the design (Kinetic Typography, Fashion Editorial), the visual impact is reduced. The text content and weight variation still conveys the idea, but the typographic character is homogenized.

### 4. No Image Support
**Theme affected:** Fashion Editorial (Iteration 12), Real Estate (Iteration 29), Minimal Architecture (Iteration 27), Botanical (Iteration 23)
**Issue:** Many Awwwards designs are image-heavy. The DSL has no image node — only rectangles with solid/gradient fills. Editorial layouts, property cards, and portfolio showcases lose significant visual impact without actual images.
**Workaround:** Use gradient-filled rectangles as image placeholders. This communicates layout intent but the visual richness of real photography is lost entirely.

### 5. No Absolute Positioning in Auto-Layout
**Theme affected:** Art Deco (Iteration 11), Maximalist Color (Iteration 26)
**Issue:** Some Awwwards designs rely on overlapping elements, floating decorative shapes, and elements that break the grid. The DSL's auto-layout system is strictly flow-based — there's no `position: absolute` equivalent for overlapping children within an auto-layout frame.
**Workaround:** Stack frames vertically/horizontally instead. Elements that should overlap are placed sequentially. This limits certain creative compositions but keeps layouts predictable.

### 6. No CSS Animation or Interaction States
**Theme affected:** Kinetic Typography (Iteration 4), Vaporwave (Iteration 19)
**Issue:** Awwwards designs are heavily interactive — hover states, scroll animations, parallax, cursor effects. The DSL produces static output only. Kinetic typography implies motion but can only be captured as a single frame.
**Impact:** This is an inherent limitation of static design tools (Figma itself is also static). Not really fixable in the DSL — it's a fundamental constraint of the output format.

### 7. No Text Overflow Control
**Theme affected:** Multiple (Retro Futurism, Memphis Design, etc.)
**Issue:** Text in fixed-width containers without `textAutoResize: 'HEIGHT'` gets clipped at the container edge. There's no `text-overflow: ellipsis` equivalent. Long descriptions in cards sometimes get cut off.
**Workaround:** Either set `textAutoResize: 'HEIGHT'` (which grows the container) or carefully size text content to fit. Neither is ideal for responsive design intent.

### 8. Limited Stroke Styling
**Theme affected:** Memphis Design (Iteration 16), Brutalist (Iteration 1)
**Issue:** No dashed or dotted strokes. No stroke gradients. Strokes can only be solid colors with `INSIDE`, `CENTER`, or `OUTSIDE` alignment. This limits decorative border patterns that some Awwwards designs use.

## DSL-Specific Authoring Observations

### What Works Well
- **Gradients**: Multi-stop linear and radial gradients render beautifully. The Space Exploration theme's planet radial gradients look stunning.
- **Typography weight contrast**: Inter's weight range (100-900) creates excellent visual hierarchy even without multiple font families.
- **Nested auto-layout**: Complex card layouts with headers, bodies, footers, and metadata rows all work reliably.
- **Color palette variety**: Solid fills with opacity, gradient fills, per-stop alpha — the color system is very capable.
- **Ellipse nodes**: Great for avatars, status dots, decorative circles, and planet shapes.
- **CJK rendering**: Japanese characters in the Zen theme rendered correctly via Noto Sans JP.
- **cornerRadii per-corner**: The Cyberpunk asymmetric corner radius worked perfectly.
- **SPACE_BETWEEN**: Nav bars, footer rows, price/badge rows all lay out correctly.
- **clipContent**: Progress bars and card image areas clip correctly.
- **textDecoration**: UNDERLINE worked correctly in the Fashion Editorial theme.

### What Could Be Improved
1. **Shadow/blur effects** — Would unlock glassmorphism and neumorphism properly
2. **Image fills** — Rectangle fills from image URLs would dramatically improve visual fidelity
3. **More font families** — Even just serif vs sans-serif would help differentiate themes
4. **Text truncation** — `text-overflow: ellipsis` equivalent for fixed-width text
5. **Dashed strokes** — Would add decorative flexibility

## Pipeline Stability

Across 30 iterations using a wide variety of DSL features, **zero pipeline crashes or compilation errors** were encountered. Every DSL file compiled and rendered on the first try. The pipeline is remarkably stable for the feature set it supports.

The main friction is not bugs — it's missing features (shadows, images, fonts). The existing features work correctly and consistently.
