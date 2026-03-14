# Dogfooding: Japanese Landing Pages (100 Iterations)
> Date: 2026-03-14 | Target: 100 iterations

## Overview
Stress-testing the DSL rendering pipeline by creating diverse Japanese landing pages inspired by rdlp.jp. Each iteration creates a full-page React component and DSL equivalent, renders both, and compares results.

## Problems & Findings

### Design Difficulties Due to Limitations

#### DSL Limitations
1. **No absolute positioning in auto-layout**: DSL auto-layout doesn't support overlapping children. CSS `position: absolute` patterns (e.g., floating badges, overlay text on images, background glow effects) must be approximated with separate frames or simplified layouts. This affects many Japanese LP designs that use layered visual effects.

2. **No shadow/blur effects**: Japanese LPs heavily use box shadows and backdrop blur for glass-morphism effects (特にカード要素). The DSL has no shadow support, so elevated card designs must rely on strokes and subtle color differences instead.

3. **No CSS grid equivalent**: DSL only supports auto-layout (flexbox). CSS Grid patterns like `grid-template-columns: repeat(4, 1fr)` with auto-fill must be manually replicated using nested horizontal/vertical frames. This makes responsive-like grid layouts verbose.

4. **No responsive design**: DSL renders at a fixed width (1440px). Japanese LPs typically serve mobile-first audiences, and many design patterns (hamburger menus, stacked layouts) can't be expressed in a single DSL file.

5. **Empty text node validation**: The compiler rejects empty strings in text nodes (`Text characters must be a non-empty string`). This prevents expressing optional text fields or spacers using text nodes. Workaround: use a space character `' '`.

6. **No text gradient (background-clip: text)**: CSS `background-clip: text` for gradient text effects is not possible in DSL. The hero accent text in many LPs uses this pattern. In DSL, we use solid colors as approximation.

7. **No hover/interaction states**: Japanese LPs use extensive hover effects on buttons, cards, and navigation. DSL is static-only.

8. **Limited font weight range**: DSL maps to Inter font weights. Japanese text using font-weight 300 (light) or 900 (black) may render slightly differently than Noto Sans JP at those weights.

#### React Limitations (for comparison purposes)
1. **No image support in DSL comparison**: React components can reference actual images, but DSL renders use solid/gradient fills as placeholders. This makes visual comparison less meaningful for image-heavy designs.

2. **CSS Module isolation works well**: No issues with style leaking between landing pages when using CSS Modules.

#### Pipeline-Specific Findings

1. **CJK text rendering works well**: Noto Sans JP is properly auto-detected and used for Japanese text. All kanji, hiragana, katakana render correctly.

2. **Text wrapping with `textAutoResize: 'HEIGHT'`**: Works correctly for Japanese text. Multi-line text with specified widths wraps properly.

3. **Gradient fills render accurately**: Linear gradients at various angles (135°, 180°) render correctly. Multiple gradient stops work.

4. **FILL sizing works correctly**: `layoutSizingHorizontal: 'FILL'` properly distributes children within horizontal auto-layout containers.

5. **SPACE_BETWEEN alignment**: Works correctly for navbar-style layouts with brand/links/CTA separation.

6. **cornerRadius**: Renders correctly including pill shapes (999px) and per-corner radii.

7. **Strokes**: INSIDE alignment renders correctly. Multiple strokes supported.

8. **Nested auto-layout**: Complex nesting (horizontal > vertical > horizontal) renders correctly.

9. **Opacity on fills**: `solid('#ffffff', 0.72)` and similar opacity-modified fills work correctly.

10. **textDecoration: 'STRIKETHROUGH'**: Works correctly for pricing displays (original price crossed out).

### Layout/Design Problems Found

| Iteration | Issue | Type | Severity | Status |
|-----------|-------|------|----------|--------|
| 10 | Empty string in text node causes compile error | Pipeline | Medium | Documented |
| All | No absolute positioning for overlapping elements | DSL limitation | Low | Known |
| All | No shadow effects for card elevation | DSL limitation | Low | Known |
| All | No responsive breakpoints | DSL limitation | Low | Known |
| All | No text gradient (background-clip: text) | DSL limitation | Low | Known |

### Positive Findings
- Pipeline handles all 10 Japanese LP themes without crashes
- CJK text rendering is reliable and consistent
- Complex nested layouts with mixed horizontal/vertical auto-layout work correctly
- Gradient fills, strokes, corner radii, clip content all work as expected
- Compilation and rendering are fast (< 2s per page)

## Iterations Log

| # | Theme | Industry | Colors | Key DSL Features | Issues |
|---|-------|----------|--------|-------------------|--------|
| 1 | Cosmetics | Beauty | Pink/Rose (#c9788e) | Gradient fills, pill badges, CTA buttons | None |
| 2 | Ramen Shop | Restaurant | Dark/Gold (#e8c47c) | Dark theme, SPACE_BETWEEN, bottom borders | None |
| 3 | Real Estate | Property | Green (#1a5f3a) | Search box, stats row, property cards | None |
| 4 | Fitness Gym | Fitness | Black/Red (#e63946) | Dark theme, pricing tiers, trainer profiles | None |
| 5 | Wedding | Bridal | Champagne (#c4a35a) | Elegant spacing, photo gallery grid | None |
| 6 | English School | Education | Blue (#2563eb) | Course cards, FAQ accordion, instructor grid | None |
| 7 | Dental Clinic | Medical | Teal (#2ba4b3) | Treatment cards, doctor profile, facility grid | None |
| 8 | Hair Salon | Beauty | Warm beige | Minimal typography, price menu, stylist cards | None |
| 9 | Travel Agency | Travel | Amber (#d97706) | Destination cards, feature list, search box | None |
| 10 | SaaS Product | Tech | Indigo (#6366f1) | Pricing comparison, feature grid, gradient CTA | Empty text error |
| 11 | Yoga Studio | Wellness | Sage green (#7c9473) | Rounded cards, muted palette, letterSpacing | None |
| 12 | Bakery | Food | Brown (#8B4513) | Warm tones, product grid, price display | None |
| 13 | Law Firm | Legal | Navy (#1a2744) | Professional dark theme, service cards, process flow | None |
| 14 | Pet Grooming | Pet Care | Orange (#f4845f) | Playful design, service tiers, testimonials | None |
| 15 | Accounting | Finance | Dark blue (#1e3a5f) | Corporate design, trust badges, feature grid | None |
| 16 | Photography | Creative | Monochrome (#1a1a1a) | High contrast, portfolio grid, minimal UI | None |
| 17 | Organic Shop | E-commerce | Earth green (#4a7c59) | Product cards, category badges, natural palette | None |
| 18 | Music School | Education | Purple (#7c3aed) | Course cards, instrument icons, schedule table | None |
| 19 | Cleaning Service | Service | Sky blue (#0ea5e9) | Service plans, process steps, trust indicators | None |
| 20 | Kindergarten | Education | Yellow (#f59e0b) | Playful gradient, schedule timeline, event cards, ellipse dots | None |
| 21 | Car Dealership | Automotive | Deep red (#b91c1c) | TBD | TBD |
| 22 | Sushi Restaurant | Food | Navy/Gold (#0f172a/#c4a35a) | TBD | TBD |
| 23 | Interior Design | Design | Warm taupe (#8b7355) | TBD | TBD |
| 24 | Flower Shop | Retail | Soft pink (#e8a0bf) | TBD | TBD |
| 25 | Moving Company | Service | Bright green (#16a34a) | TBD | TBD |
| 26 | Craft Beer Bar | Food/Drink | Dark amber (#78350f) | TBD | TBD |
| 27 | Spa/Onsen | Wellness | Slate blue (#64748b) | TBD | TBD |
| 28 | Bookstore | Retail | Warm brown (#92400e) | TBD | TBD |
| 29 | Martial Arts Dojo | Sports | Black/Crimson (#0a0a0a) | TBD | TBD |
| 30 | Tea Ceremony | Culture | Matcha green (#3f6212) | TBD | TBD |

## Commits
- `102bc5c` — feat: add Japanese landing pages - iterations 1-3
- `e5dfcbe` — feat: add Japanese landing pages - iterations 4-10
- `46583be` — feat: add Japanese landing pages - iterations 11-20
