# Rendering History

This directory stores output snapshots from calibration and dogfooding runs. Each run creates a subdirectory named with timestamp and theme:

```
docs/history/
  2026-03-14_15-30-corner-radius/     # calibration run
  2026-03-14_16-00-hamburger-theme/    # calibration run
  2026-03-14_16-30-full-suite/         # full calibration
  2026-03-14_16-30-full-suite-fix1/    # fix iteration
  2026-03-14_17-00-retro-diner/        # dogfooding run
```

## Naming convention

- Format: `<YYYY-MM-DD_HH-mm>-<theme-name>`
- Fix iterations append `-fix<N>` (e.g., `-fix1`, `-fix2`)
- Full calibration runs use `full-suite` as the theme name

## Contents per directory

- `*.png` — rendered component PNGs
- `batch-manifest.json` — component metadata and status
- Dogfooding runs may also include comparison screenshots and iteration logs

## Dogfooding Sessions

<!-- New entries are prepended below this line -->
- [2026-03-16 — Fitness Tracker](2026-03-16-fitness-tracker.md) — 0 issues, 0 fixes | Features: dark theme, 8-digit hex alpha, ellipse rings, gradient accents, SPACE_BETWEEN, clipContent progress
- [2026-03-16 — Real Estate Listings](2026-03-16-real-estate-listings.md) — 0 issues, 0 fixes | Features: dark header, cornerRadii, pill chips, gradient images, sidebar layout, ellipse avatar
- [2026-03-16 — Education Platform](2026-03-16-education-platform.md) — 0 issues, 0 fixes | Features: deep nesting, progress bars, textDecoration strikethrough, gradient covers, ellipse badges
- [2026-03-16 — Healthcare Dashboard](2026-03-16-healthcare-dashboard.md) — 0 issues, 0 fixes | Features: ellipse dots, large numbers, pill medications, two-column layout, SPACE_BETWEEN
- [2026-03-16 — Portfolio Showcase](2026-03-16-portfolio-showcase.md) — 0 issues, 0 fixes | Features: large typography 72px, gradient overlays, SPACE_BETWEEN nav, gradient CTAs
- [2026-03-16 — Social Feed](2026-03-16-social-feed.md) — 0 issues, 0 fixes | Features: ellipse avatars, SPACE_BETWEEN actions, nested layouts, text wrapping
- [2026-03-16 — SaaS Pricing](2026-03-16-saas-pricing.md) — 0 issues, 0 fixes | Features: equal-width FILL columns, gradient buttons, SPACE_BETWEEN, strokes
- [2026-03-16 — Recipe Cookbook](2026-03-16-recipe-cookbook.md) — 0 issues, 0 fixes | Features: cornerRadii, nested auto-layout, text wrapping, clipContent
- [2026-03-16 — Banking App](2026-03-16-banking-app.md) — 0 issues found, 0 pipeline fixes | Features: FIXED sizing, FILL width, SPACE_BETWEEN, ellipse, opacity fills, stroke alignment
- [2026-03-16 — Neon Gaming](2026-03-16-neon-gaming.md) — 0 issues found, 0 pipeline fixes | Features: multi-stop gradients, 8-digit hex alpha, thick strokes, clipContent, high cornerRadius
- [2026-03-16 — Minimal Blog](2026-03-16-minimal-blog.md) — 0 issues found, 0 pipeline fixes | Features: typography variety, CENTER alignment, lineHeight, letterSpacing, textAutoResize:HEIGHT
- [2026-03-16 — Analytics Dashboard](2026-03-16-analytics-dashboard.md) — 0 issues found, 0 pipeline fixes | Features: FILL sizing, SPACE_BETWEEN, ellipse, strokes, clipContent, mixed layouts
- [2026-03-16 — Spotify Dark](2026-03-16-spotify-dark.md) — 0 issues found, 0 pipeline fixes | Features: dark fills, cornerRadius 9999 (pills), horizontal auto-layout, gradient fills, small text
- [2026-03-14 — Travel Cards](2026-03-14-travel-cards.md) — 0 issues found, 0 pipeline fixes | Features: cornerRadius, clipContent, strokes, textAutoResize:HEIGHT, FILL sizing, SPACE_BETWEEN, nested auto-layout
