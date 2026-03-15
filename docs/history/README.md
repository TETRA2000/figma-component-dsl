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
- [2026-03-15 — Fitness Tracker](2026-03-15-fitness-tracker.md) — 0 issues found, 0 pipeline fixes | Features: ellipse strokes, gradient icons, SPACE_BETWEEN, colored rings (custom theme)
- [2026-03-15 — Portfolio Showcase](2026-03-15-portfolio-showcase.md) — 0 issues found, 0 pipeline fixes | Features: large typography, SPACE_BETWEEN, gradient fills, wide cards, FILL width
- [2026-03-15 — Social Feed](2026-03-15-social-feed.md) — 0 issues found, 0 pipeline fixes | Features: ellipse avatars, SPACE_BETWEEN, text wrapping, mixed font weights
- [2026-03-15 — SaaS Pricing](2026-03-15-saas-pricing.md) — 0 issues found, 0 pipeline fixes | Features: FILL columns, gradient CTA, vertical FILL sizing, strokes
- [2026-03-15 — Recipe Cookbook](2026-03-15-recipe-cookbook.md) — 0 issues found, 0 pipeline fixes | Features: nested auto-layout, clipContent, text wrapping, tall cards
- [2026-03-15 — Banking App](2026-03-15-banking-app.md) — 0 issues found, 0 pipeline fixes | Features: FIXED sizing, FILL width, counterAlign, stroke alignment, pill shapes
- [2026-03-15 — Neon Gaming](2026-03-15-neon-gaming.md) — 0 issues found, 0 pipeline fixes | Features: gradient fills, thick strokes, clipContent, high cornerRadius
- [2026-03-15 — Minimal Blog](2026-03-15-minimal-blog.md) — 0 issues found, 0 pipeline fixes | Features: typography variety, text alignment, line height, letter spacing, textAutoResize
- [2026-03-15 — Analytics Dashboard](2026-03-15-analytics-dashboard.md) — 0 issues found, 0 pipeline fixes | Features: FILL sizing, SPACE_BETWEEN, gradient fills, ellipse, mixed H/V layout
- [2026-03-15 — Spotify Dark](2026-03-15-spotify-dark.md) — 0 issues found, 0 pipeline fixes | Features: dark fills, pill cornerRadius, horizontal auto-layout, ellipse, small text
- [2026-03-14 — Travel Cards](2026-03-14-travel-cards.md) — 0 issues found, 0 pipeline fixes | Features: cornerRadius, clipContent, strokes, textAutoResize:HEIGHT, FILL sizing, SPACE_BETWEEN, nested auto-layout
