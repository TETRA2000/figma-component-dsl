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
- [2026-03-14 — Awwwards 30-Theme Dogfooding](2026-03-14-awwwards-dogfooding-notes.md) — 30 iterations, 0 pipeline bugs, 0 crashes | Themes: Brutalist, Glassmorphism, Dark Luxury, Vibrant Gradient, Swiss Design, Retro Futurism, Monochrome Editorial, Organic Shapes, Kinetic Typography, Neomorphism, Art Deco, Fashion Editorial, Cyberpunk, Pastel Dreams, Split Screen, Memphis Design, Scandinavian Minimal, Japanese Zen, Vaporwave, Abstract Geometric, High Contrast, Space Exploration, Botanical, Neon Noir, Industrial, Maximalist Color, Minimal Architecture, Fitness App, Real Estate, Healthcare
- [2026-03-14 — Travel Cards](2026-03-14-travel-cards.md) — 0 issues found, 0 pipeline fixes | Features: cornerRadius, clipContent, strokes, textAutoResize:HEIGHT, FILL sizing, SPACE_BETWEEN, nested auto-layout
