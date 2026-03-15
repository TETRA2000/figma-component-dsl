# Dogfooding: 30-Iteration Marketing Pages Stress Test
> Date: 2026-03-15 | Iterations: 30

## Overview
Massive dogfooding run with 30 different marketing/product page themes, each stressing different combinations of DSL features including complex layouts, typography, gradients, nested auto-layout, and varied visual styles.

## Themes & Iterations

| # | Theme | DSL Features Stressed |
|---|---|---|
| 1 | Spotify Dark | Dark theme, gradients, progress bars, nested H+V layout |
| 2 | Analytics Dashboard | Stat cards, bar charts, metric rows, data tables |
| 3 | Minimal Blog | Typography, blockquotes, article cards, light theme |
| 4 | Neon Gaming | Multi-stop gradients, dark theme, leaderboard tables |
| 5 | Banking App | Gradient balance cards, transaction lists, rounded cards |
| 6 | Recipe Cookbook | Per-corner radii (cornerRadii), ingredient lists, warm palette |
| 7 | SaaS Pricing | 3-column comparison, feature checks, highlighted tier |
| 8 | Social Feed | Sidebar layout, feed cards, trends panel, avatars |
| 9 | Portfolio Showcase | Large typography, project cards, dark theme |
| 10 | Real Estate | Property cards, agent profiles, search filters |
| 11 | Fitness App | Dark dashboard, progress rings, workout cards, achievements |
| 12 | Healthcare Portal | Vitals display, appointments, medications, care team |
| 13 | Online Education | Course cards, rating stars, instructor profiles, stats |
| 14 | Restaurant | Menu items with dietary badges, chef spotlight, reviews |
| 15 | Fashion E-commerce | Product grid, category filters, membership CTA |
| 16 | Event Ticketing | Date badges, calendar widget, gradient event cards |
| 17 | Podcast Platform | Episode list with progress, play controls, stats |
| 18 | Cloud Storage | File table, sidebar nav, storage indicator, breadcrumbs |
| 19 | NFT Marketplace | Dark theme, vibrant gradients, collection grid, creator profiles |
| 20 | Car Dealership | Vehicle cards, specs display, financing calculator |
| 21 | Interior Design | Room gallery, gradient images, stats bar |
| 22 | Pet Care | Service cards, booking CTAs, pet list with status |
| 23 | Job Board | Job listings with tech tags, filter chips, salary ranges |
| 24 | Crypto Exchange | Trading table, price cards, mini charts, market data |
| 25 | Music Festival | Multi-stop gradient hero, artist cards, schedule table |
| 26 | Photography Portfolio | Masonry-style gallery, varied card sizes, dark theme |
| 27 | Plant Shop | Product cards, add-to-cart, category filters, badges |
| 28 | Coworking Space | Plan comparison, highlighted tier, amenity grid |
| 29 | Wine Club | Wine cards with ratings, subscription tiers |
| 30 | Travel Agency | Trip cards with price overlays, testimonials, search bar |

## DSL Feature Coverage

All 30 iterations collectively stress-tested:
- **Layout**: horizontal/vertical auto-layout, FILL sizing, SPACE_BETWEEN, CENTER alignment, nested layouts (H inside V, V inside H)
- **Typography**: fontSize 10-64, fontWeight 400-800, letterSpacing, lineHeight, textAutoResize: 'HEIGHT', textAlignHorizontal: 'CENTER'
- **Colors**: solid fills, gradient fills (2-stop, 3-stop, multi-stop), various angles (135, 180, 270)
- **Shapes**: frame, rectangle, ellipse with gradient fills
- **Borders**: strokes with INSIDE alignment, cornerRadius, cornerRadii (per-corner), clipContent
- **Opacity**: Fill opacity via solid('#color', opacity)
- **Sizing**: Fixed sizes, HUG content, FILL parent, mixed constraints

## Comparison Results

| Area | All 30 Iterations | Match? |
|---|---|---|
| Auto-layout (H+V) | Correct spacing, padding, alignment | YES |
| FILL sizing | Children stretch to parent width | YES |
| SPACE_BETWEEN | Even distribution across all themes | YES |
| CENTER alignment | Both main and cross axis | YES |
| Gradients (linear) | 2-stop, 3-stop, multi-stop, varied angles | YES |
| Text rendering | All font sizes, weights, colors | YES |
| Text wrapping | textAutoResize: HEIGHT with fixed width | YES |
| Corner radius | Single value and per-corner (cornerRadii) | YES |
| Clip content | Cards with rounded corners clipping children | YES |
| Strokes | Border rendering with INSIDE alignment | YES |
| Ellipses | Avatar circles with gradient fills | YES |
| Opacity on fills | Semi-transparent overlays | YES |
| Nested layouts | Complex nesting (H in V in H) | YES |
| letterSpacing | Negative and positive values | YES |
| lineHeight | Percentage-based line height | YES |

## Pipeline Fixes
None required. The pipeline handled all 30 themes without any rendering issues.

## Known Pipeline Gaps
None discovered in this run.

## Renders
All DSL renders are in `docs/history/images/2026-03-15-iter{N}-dsl.png`
All Figma Plugin JSONs are in `docs/history/figma-plugin/2026-03-15-iter{N}-plugin.json`

## Commits
See git log for this session's commits.
