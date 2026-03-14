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
- [2026-03-14 — Banking App](2026-03-14-banking-app.md) — 0 pipeline issues found, 0 pipeline fixes | Features: ellipse, gradient, opacity, SPACE_BETWEEN, FILL sizing, strokes, cornerRadius
- [2026-03-14 — Analytics Dashboard](2026-03-14-analytics-dashboard.md) — 1 pipeline issue found, 1 pipeline fix (FILL inside FILL) | Features: FILL sizing (nested), mixed layout, cornerRadii, SPACE_BETWEEN, rectangle bars
- [2026-03-14 — Neon Gaming](2026-03-14-neon-gaming.md) — 0 pipeline issues found, 0 pipeline fixes | Features: gradient, strokes, opacity, ellipse, cornerRadius, clipContent, SPACE_BETWEEN, nested auto-layout
- [2026-03-14 — Travel Cards](2026-03-14-travel-cards.md) — 0 issues found, 0 pipeline fixes | Features: cornerRadius, clipContent, strokes, textAutoResize:HEIGHT, FILL sizing, SPACE_BETWEEN, nested auto-layout
