# Theme Pool for Dogfooding

Each theme targets specific DSL features. Pick themes that maximize coverage across iterations — don't repeat feature combinations.

## Theme catalog

### 1. Spotify Dark — Music streaming
**Colors:** Black (#121212), Dark gray (#181818), Green (#1db954), White (#ffffff)
**Components:** Album card, playlist row, now-playing bar, category pill
**DSL features stressed:** Dark fills, rounded corners (pill shapes with cornerRadius 9999), horizontal auto-layout, opacity overlays, small text sizes
**Page type:** Dashboard with grid of album cards + bottom player bar

### 2. Travel Cards — Airbnb-style
**Colors:** White (#ffffff), Warm gray (#f7f7f7), Coral (#ff5a5f), Dark (#222222)
**Components:** Property card (image + details), star rating, price badge, filter chip
**DSL features stressed:** Per-corner radii (top-rounded cards), nested vertical/horizontal auto-layout, text wrapping (textAutoResize: HEIGHT), strokes (thin borders), multi-fill stacking
**Page type:** Search results grid with filter bar

### 3. Analytics Dashboard
**Colors:** Slate (#0f172a), Blue (#3b82f6), Emerald (#10b981), Amber (#f59e0b), White (#ffffff)
**Components:** Stat card, progress bar, metric row, section header
**DSL features stressed:** Mixed horizontal/vertical layouts, FILL sizing (stretch children), SPACE_BETWEEN alignment, opacity for disabled states, gradient fills for chart bars
**Page type:** Data dashboard with stat cards + metric rows

### 4. Minimal Blog
**Colors:** Off-white (#fafaf9), Stone (#78716c), Ink (#1c1917)
**Components:** Article card, tag pill, author byline, blockquote
**DSL features stressed:** Typography variety (large headings, body text, small captions), text alignment (LEFT, CENTER), line height, letter spacing, minimal fills/strokes
**Page type:** Blog listing with featured article + card grid

### 5. Neon Gaming
**Colors:** Very dark (#0a0a0a), Neon pink (#ff2d55), Electric blue (#00d4ff), Neon green (#39ff14)
**Components:** Game card, live badge, leaderboard row, username tag
**DSL features stressed:** Gradient fills (multi-stop neon gradients), gradient angles, thick strokes, high cornerRadius, clip content (image placeholders)
**Page type:** Game library with featured banner + card grid

### 6. Banking App
**Colors:** Navy (#1a237e), White (#ffffff), Light blue (#e3f2fd), Green (#4caf50), Red (#f44336)
**Components:** Transaction row, balance card, action button, account selector
**DSL features stressed:** Precise FIXED sizing, FILL width children, counter-axis alignment (CENTER, MAX), stroke alignment, ellipse shapes (avatar placeholders), per-side padding differences
**Page type:** Account overview with balance header + transaction list

### 7. Recipe Cookbook
**Colors:** Cream (#fff8e1), Brown (#5d4037), Orange (#ff9800), Green (#689f38)
**Components:** Recipe card (tall with image area), ingredient list item, step number badge, time badge
**DSL features stressed:** Tall vertical cards, nested auto-layout (horizontal badges inside vertical card), text wrapping in narrow containers, mixed cornerRadii (rounded top, square bottom), visibility toggling
**Page type:** Recipe collection with category tabs + card grid

### 8. SaaS Pricing
**Colors:** Indigo (#4f46e5), Violet (#7c3aed), Gray (#6b7280), White (#ffffff)
**Components:** Pricing tier card, feature check row, CTA button, toggle switch (monthly/annual)
**DSL features stressed:** Equal-width FILL columns, vertical auto-layout with SPACE_BETWEEN, gradient CTA buttons, strokes for deselected state, per-corner radii on highlighted tier
**Page type:** Pricing comparison with 3 tier cards side by side

### 9. Social Feed
**Colors:** White (#ffffff), Light gray (#f3f4f6), Blue (#1d9bf0), Dark (#0f1419)
**Components:** Post card (text + action bar), avatar circle, engagement bar (likes/comments/shares), compose button
**DSL features stressed:** Ellipse nodes (avatars), horizontal action bars with even spacing, text with mixed font weights in same container, clip content for avatar images, nested groups
**Page type:** Feed with multiple post cards stacked vertically

### 10. Portfolio Showcase
**Colors:** Off-black (#1a1a1a), White (#f5f5f5), Accent varies per project
**Components:** Project card (wide), skill tag, contact button, section divider
**DSL features stressed:** Wide aspect ratio cards, gradient overlays on images, large typography (48px+), SPACE_BETWEEN for nav links, minimal spacing, full-width sections
**Page type:** Single-page portfolio with hero + project grid + contact section

## Feature coverage matrix

| Theme | Gradients | Per-corner | Auto-layout | Text wrap | Strokes | Opacity | Clip | Ellipse | FILL sizing |
|---|---|---|---|---|---|---|---|---|---|
| Spotify Dark | - | - | H | - | - | yes | - | - | - |
| Travel Cards | - | yes | H+V nested | yes | yes | - | - | - | - |
| Analytics | yes | - | H+V+FILL | - | - | yes | - | - | yes |
| Minimal Blog | - | - | V | yes | - | - | - | - | - |
| Neon Gaming | yes | - | H | - | yes | - | yes | - | - |
| Banking App | - | - | H+V+FILL | - | yes | - | - | yes | yes |
| Recipe Cookbook | - | yes | H+V nested | yes | - | - | - | - | - |
| SaaS Pricing | yes | yes | V+FILL | - | yes | - | - | - | yes |
| Social Feed | - | - | H+V | - | - | - | yes | yes | - |
| Portfolio | yes | - | H+V | - | - | - | - | - | yes |

## Picking themes for N iterations

- **1 iteration:** Pick Travel Cards (broadest feature coverage)
- **2 iterations:** Travel Cards + Analytics Dashboard
- **3 iterations:** Travel Cards + Neon Gaming + Banking App (covers all feature categories)
- **4+ iterations:** Add from remaining themes prioritizing uncovered features
