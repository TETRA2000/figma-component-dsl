# Dogfooding: 50 Iterations Stress Test
> Date: 2026-03-14 | Iterations: 50

## Summary
Comprehensive stress test of the DSL rendering pipeline across 50 unique visual themes. Each iteration created a full-page DSL file, compiled it to JSON, and rendered to PNG. All renders were visually inspected for correctness.

**Result: Zero pipeline bugs found.** The compiler, layout resolver, and renderer handled all tested feature combinations correctly.

## DSL Features Tested

| Feature | Iterations using it |
|---|---|
| `solid()` fills | All 50 |
| `gradient()` fills (2+ stops) | 45/50 |
| `horizontal()` auto-layout | All 50 |
| `vertical()` auto-layout | All 50 |
| `SPACE_BETWEEN` alignment | 42/50 |
| `counterAlign: 'CENTER'` | 48/50 |
| `layoutSizingHorizontal: 'FILL'` | All 50 |
| `cornerRadius` | All 50 |
| `cornerRadius: 9999` (pills) | 18/50 |
| `clipContent: true` | 25/50 |
| `strokes` | 38/50 |
| `textAutoResize: 'HEIGHT'` | 15/50 |
| `letterSpacing` | 12/50 |
| `lineHeight` | 8/50 |
| `fontStyle: 'italic'` | 1/50 |
| `ellipse` nodes | 42/50 |
| `rectangle` nodes | 40/50 |
| Opacity on fills (`solid(color, opacity)`) | 35/50 |
| Conditional children (`...spread`) | 22/50 |
| Dynamic computed values (`Math.round`) | 8/50 |
| `size` (FIXED sizing) | All 50 |
| Nested auto-layout (3+ deep) | All 50 |
| `textAlignHorizontal: 'CENTER'` | 6/50 |

## Iterations

| # | Theme | File | Render Size | Notes |
|---|---|---|---|---|
| 1 | Spotify Dark | `spotify-dark-page.dsl.ts` | 1440×646 | Dark theme, pills, progress bars |
| 2 | Analytics Dashboard | `analytics-dashboard-page.dsl.ts` | 1440×577 | Mixed layouts, gradient bars |
| 3 | Minimal Blog | `minimal-blog-page.dsl.ts` | 1440×768 | Typography focus, text wrapping |
| 4 | Neon Gaming | `neon-gaming-page.dsl.ts` | 1440×823 | Multi-stop gradients, thick strokes |
| 5 | Banking App | `banking-app-page.dsl.ts` | 1440×577 | Precise sizing, FILL children |
| 6 | Recipe Cookbook | `recipe-cookbook-page.dsl.ts` | 1440×850 | Tall cards, step badges |
| 7 | SaaS Pricing | `saas-pricing-page.dsl.ts` | 1440×780 | Equal columns, toggle switch |
| 8 | Social Feed | `social-feed-page.dsl.ts` | 1440×720 | Avatars, nullable children |
| 9 | Portfolio Showcase | `portfolio-showcase-page.dsl.ts` | 1440×900 | Large typography, deep nesting |
| 10 | Healthcare Dashboard | `healthcare-dashboard-page.dsl.ts` | 1440×620 | Donut charts, parseColor helper |
| 11 | Education Platform | `education-platform-page.dsl.ts` | 1440×680 | Progress bars, achievement badges |
| 12 | Real Estate | `real-estate-page.dsl.ts` | 1440×700 | Property cards, filter chips |
| 13 | Fitness Tracker | `fitness-tracker-page.dsl.ts` | 1440×650 | Metric circles, week streak |
| 14 | Weather App | `weather-app-page.dsl.ts` | 1440×580 | Hourly/daily forecasts |
| 15 | Crypto Dashboard | `crypto-dashboard-page.dsl.ts` | 1440×600 | Coin table, portfolio cards |
| 16 | Food Delivery | `food-delivery-page.dsl.ts` | 1440×720 | Restaurant cards, promo banner |
| 17 | Music Player | `music-player-page.dsl.ts` | 1440×660 | Sidebar, now-playing hero |
| 18 | Email Client | `email-client-page.dsl.ts` | 1440×580 | Three-panel layout, labels |
| 19 | Calendar App | `calendar-app-page.dsl.ts` | 1440×620 | Day grid, event blocks |
| 20 | CRM Dashboard | `crm-dashboard-page.dsl.ts` | 1440×640 | Pipeline stages, deal table |
| 21 | Project Management | `project-management-page.dsl.ts` | 1440×463 | Kanban columns, task cards |
| 22 | Job Board | `job-board-page.dsl.ts` | 1440×1123 | Job listings, filter sidebar |
| 23 | News Portal | `news-portal-page.dsl.ts` | 1440×914 | News cards, trending sidebar |
| 24 | Podcast App | `podcast-app-page.dsl.ts` | 1440×936 | Episode rows, featured banner |
| 25 | Travel Booking | `travel-booking-page.dsl.ts` | 1440×678 | Booking form, rating badges |
| 26 | Social Analytics | `social-analytics-page.dsl.ts` | 1440×510 | Metrics, platform table |
| 27 | Restaurant Menu | `restaurant-menu-page.dsl.ts` | 1440×698 | Two-column menu, section headers |
| 28 | Inventory Management | `inventory-management-page.dsl.ts` | 1440×577 | Data table, status badges |
| 29 | Chat App | `chat-app-page.dsl.ts` | 1440×592 | Chat bubbles, contact list |
| 30 | Photo Gallery | `photo-gallery-page.dsl.ts` | 1440×1155 | Masonry columns, dark theme |
| 31 | Event Ticketing | `event-ticketing-page.dsl.ts` | 1440×618 | Event cards, sold out states |
| 32 | Learning Management | `learning-management-page.dsl.ts` | 1440×603 | Course cards, progress bars |
| 33 | Movie Streaming | `movie-streaming-page.dsl.ts` | 1440×935 | Movie posters, genre chips |
| 34 | Smart Home | `smart-home-page.dsl.ts` | 1440×525 | Device cards, scene rows |
| 35 | Code Editor | `code-editor-page.dsl.ts` | 1440×407 | Syntax highlighting, file tree |
| 36 | Forum/Community | `forum-community-page.dsl.ts` | 1440×577 | Thread cards, member list |
| 37 | Invoice/Billing | `invoice-billing-page.dsl.ts` | 1440×514 | Invoice table, status pills |
| 38 | Music Festival | `music-festival-page.dsl.ts` | 1440×1158 | Artist cards, day tabs |
| 39 | Plant Care | `plant-care-page.dsl.ts` | 1440×559 | Plant cards, care schedule |
| 40 | Airline Booking | `airline-booking-page.dsl.ts` | 1440×698 | Flight cards, route visualization |
| 41 | Workout Planner | `workout-planner-page.dsl.ts` | 1440×668 | Exercise cards, week progress |
| 42 | Pet Adoption | `pet-adoption-page.dsl.ts` | 1440×650 | Pet cards, filter chips |
| 43 | Book Store | `book-store-page.dsl.ts` | 1440×803 | Book covers, featured hero |
| 44 | Budget Tracker | `budget-tracker-page.dsl.ts` | 1440×586 | Transactions, budget bars |
| 45 | Recipe Sharing | `recipe-sharing-page.dsl.ts` | 1440×643 | Recipe cards, categories |
| 46 | Design System Docs | `design-system-docs-page.dsl.ts` | 1440×842 | Color swatches, component status |
| 47 | Kanban Notes | `kanban-notes-page.dsl.ts` | 1440×619 | Note cards, column layout |
| 48 | Ride Sharing | `ride-sharing-page.dsl.ts` | 1440×655 | Ride options, booking panel |
| 49 | Survey Builder | `survey-builder-page.dsl.ts` | 1440×662 | Question cards, form inputs |
| 50 | Dashboard Analytics | `dashboard-analytics-page.dsl.ts` | 1440×512 | KPI cards, bar chart, activity |

## DSL Authoring Issues Found (not pipeline bugs)

1. **Empty string text nodes** (Iteration 8, 35): `text('')` correctly rejected by DSL validation. Fixed by using nullable children pattern or invisible rectangle spacers.

## Known Pipeline Gaps (pre-existing, not fixed)

- **No partial arcs on ellipses**: True donut/pie charts not possible. Workaround: overlapping ellipse strokes.
- **No text decoration** (underline/strikethrough): Not supported in text nodes.
- **No blur/shadow effects**: Drop shadows and blurs not available.

## Renders

All renders stored in `docs/history/images/2026-03-14-{theme-slug}-dsl.png`.
