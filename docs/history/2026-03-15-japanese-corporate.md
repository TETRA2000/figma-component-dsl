# Dogfooding: Japanese Corporate
> Date: 2026-03-15 | Iteration: 1 of 1

## Theme
**Japanese Corporate** — Professional Japanese enterprise website with navy/white palette, structured grid layouts, and multiple section types (hero banners, service cards, news lists, company profile, financials, footer).
DSL features stressed: imageFill, image(), gradient overlays, nested horizontal/vertical auto-layout, FILL sizing, text wrapping (textAutoResize: HEIGHT), strokes, cornerRadius, cornerRadii (pill badges), opacity, ellipse, statBlock pattern, SPACE_BETWEEN alignment, defineTokens

## Components created
- `CorporateHero` — Full-width hero section with background image, gradient overlay, and centered text
- `ServiceCard` — Service offering card with optional image area, icon, title, and description
- `NewsItem` — News/update row with date, category badge, and title
- `CompanyProfile` — Two-column section with heading, description, stats grid, and image

## Page sections (20 total)
1. Main Hero (Yamato Holdings)
2. Services Grid (3 cards)
3. Company Profile (stats + image)
4. News & Updates (4 items)
5. Technology Hero
6. Industry Solutions Grid (4 cards)
7. Corporate Message (CEO quote)
8. Sustainability Hero
9. ESG Initiatives Grid (3 cards)
10. Global Presence (stats + image)
11. Investor Relations Hero
12. Financial Highlights (4 stat cards)
13. IR Calendar & Announcements (3 items)
14. Careers Hero
15. Career Benefits Grid (3 cards)
16. Research & Development (stats + image)
17. Partnerships Hero
18. Trusted Partners Grid (5 logos)
19. Contact Section (info + image)
20. Footer (4 columns + bottom bar)

## Renders

### Browser (React)
![Browser render](images/2026-03-15-japanese-corporate-browser.png)

### DSL Pipeline
![DSL render](images/2026-03-15-japanese-corporate-dsl.png)

## Comparison

| Area | Match? | Issue | Type | Fixed? |
|---|---|---|---|---|
| Hero backgrounds | PARTIAL | External URLs render as gray placeholders in DSL renderer | Expected | N/A |
| Service card images | PARTIAL | External URLs render as gray placeholders | Expected | N/A |
| Section layout | YES | — | — | — |
| Typography | YES | — | — | — |
| Gradients (hero overlays) | YES | Navy gradients render correctly | — | — |
| Strokes (card borders) | YES | — | — | — |
| Category badges (pill) | YES | cornerRadius 9999 works correctly | — | — |
| Stats display | YES | statBlock helper renders correctly | — | — |
| Footer layout | YES | SPACE_BETWEEN + 4 columns correct | — | — |
| Footer divider | YES | opacity 0.15 on white fill works | — | — |
| Text wrapping | YES | textAutoResize HEIGHT works | — | — |
| FILL sizing | YES | Children stretch to fill parent width | — | — |

## Pipeline fixes
No pipeline fixes needed — all features worked correctly.

## Known pipeline gaps (not fixed)
- **External image URL fetching**: The DSL renderer cannot fetch remote URLs (e.g., Unsplash) during rendering. Images show as gray placeholders. This is expected behavior for server-side rendering, not a bug. Workaround: use local image files. No fix needed.

## Figma Plugin JSON
Ready-to-import file: [figma-plugin/2026-03-15-japanese-corporate-plugin.json](figma-plugin/2026-03-15-japanese-corporate-plugin.json)

## Commits
- See git log for commit hashes
