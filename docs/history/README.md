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
- [2026-03-16 — Wine Cellar](2026-03-16-wine-cellar.md) — 0 issues, 0 fixes | Iteration 72
- [2026-03-16 — Travel Planner](2026-03-16-travel-planner.md) — 0 issues, 0 fixes | Iteration 71
- [2026-03-16 — Stock Trading](2026-03-16-stock-trading.md) — 0 issues, 0 fixes | Iteration 70
- [2026-03-16 — Smart Home](2026-03-16-smart-home.md) — 0 issues, 0 fixes | Iteration 69
- [2026-03-16 — School Portal](2026-03-16-school-portal.md) — 0 issues, 0 fixes | Iteration 68
- [2026-03-16 — Recipe Detail](2026-03-16-recipe-detail.md) — 0 issues, 0 fixes | Iteration 67
- [2026-03-16 — Real Estate Detail](2026-03-16-real-estate-detail.md) — 0 issues, 0 fixes | Iteration 66
- [2026-03-16 — Pet Store](2026-03-16-pet-store.md) — 0 issues, 0 fixes | Iteration 65
- [2026-03-16 — Pet Adoption](2026-03-16-pet-adoption.md) — 0 issues, 0 fixes | Iteration 64
- [2026-03-16 — Note Taking](2026-03-16-note-taking.md) — 0 issues, 0 fixes | Iteration 63
- [2026-03-16 — Music Festival](2026-03-16-music-festival.md) — 0 issues, 0 fixes | Iteration 62
- [2026-03-16 — Museum Guide](2026-03-16-museum-guide.md) — 0 issues, 0 fixes | Iteration 61
- [2026-03-16 — Language Learning](2026-03-16-language-learning.md) — 0 issues, 0 fixes | Iteration 60
- [2026-03-16 — Food Blog](2026-03-16-food-blog.md) — 0 issues, 0 fixes | Iteration 59
- [2026-03-16 — Dashboard CRM](2026-03-16-dashboard-crm.md) — 0 issues, 0 fixes | Iteration 58
- [2026-03-16 — Coworking Space](2026-03-16-coworking.md) — 0 issues, 0 fixes | Iteration 57
- [2026-03-16 — Concert Venue](2026-03-16-concert-venue.md) — 0 issues, 0 fixes | Iteration 56
- [2026-03-16 — Dashboard Analytics V2](2026-03-16-dashboard-analytics-v2.md) — 0 issues, 0 fixes | Iteration 55
- [2026-03-16 — Meditation App](2026-03-16-meditation-app.md) — 0 issues, 0 fixes | Iteration 54
- [2026-03-16 — Startup Pitch](2026-03-16-startup-pitch.md) — 0 issues, 0 fixes | Iteration 53
- [2026-03-16 — Art Portfolio](2026-03-16-art-portfolio.md) — 0 issues, 0 fixes | Iteration 52
- [2026-03-16 — Wedding Planner](2026-03-16-wedding-planner.md) — 0 issues, 0 fixes | Iteration 51
- [2026-03-16 — Plant Shop](2026-03-16-plant-shop.md) — 0 issues, 0 fixes | Iteration 44
- [2026-03-16 — Movie Database](2026-03-16-movie-database.md) — 0 issues, 0 fixes | Iteration 43
- [2026-03-16 — Podcast Studio](2026-03-16-podcast-studio.md) — 0 issues, 0 fixes | Iteration 42
- [2026-03-16 — Fitness Class](2026-03-16-fitness-class.md) — 0 issues, 0 fixes | Iteration 41
- [2026-03-16 — Event Tickets](2026-03-16-event-tickets.md) — 0 issues, 0 fixes | Iteration 33
- [2026-03-16 — Food Delivery](2026-03-16-food-delivery.md) — 0 issues, 0 fixes | Iteration 32
- [2026-03-16 — Video Streaming](2026-03-16-video-streaming.md) — 0 issues, 0 fixes | Iteration 31
- [2026-03-16 — Email Client](2026-03-16-email-client.md) — 0 issues, 0 fixes | Iteration 30
- [2026-03-16 — Settings Page](2026-03-16-settings.md) — 0 issues, 0 fixes | Features: sidebar nav, form fields, toggle switches, section dividers
- [2026-03-16 — Crypto Dashboard](2026-03-16-crypto-dashboard.md) — 0 issues, 0 fixes | Features: dark theme, gradient portfolio, up/down indicators, large numbers
- [2026-03-16 — Social Profile](2026-03-16-social-profile.md) — 0 issues, 0 fixes | Features: cover gradient, avatar, stat counters, post grid, follower list
- [2026-03-16 — Job Board](2026-03-16-job-board.md) — 0 issues, 0 fixes | Features: salary badges, tag pills, company logos, FILL columns
- [2026-03-16 — Photo Gallery](2026-03-16-photo-gallery.md) — 0 issues, 0 fixes | Features: masonry grid, gradient photos, ellipse avatars, filter pills
- [2026-03-16 — Flight Search](2026-03-16-flight-search.md) — 0 issues, 0 fixes | Features: gradient hero, search form, flight routes, price tags
- [2026-03-16 — News Aggregator](2026-03-16-news-aggregator.md) — 0 issues, 0 fixes | Features: category badges, two-column articles, trending sidebar, text wrapping
- [2026-03-16 — Hotel Booking](2026-03-16-hotel-booking.md) — 0 issues, 0 fixes | Features: gradient hero, star ratings, amenity pills, cornerRadii
- [2026-03-16 — Chat Messenger](2026-03-16-chat-messenger.md) — 0 issues, 0 fixes | Features: cornerRadii asymmetric bubbles, ellipse avatars, online status, two-panel layout
- [2026-03-16 — Calendar App](2026-03-16-calendar-app.md) — 0 issues, 0 fixes | Features: two-panel layout, colored event borders, day columns, mini calendar grid
- [2026-03-16 — Podcast App](2026-03-16-podcast-app.md) — 0 issues, 0 fixes | Features: dark theme, gradient art, progress bar, episode cards, library rows
- [2026-03-16 — Restaurant Menu](2026-03-16-restaurant-menu.md) — 0 issues, 0 fixes | Features: warm palette, gradient special, dietary tags, SPACE_BETWEEN, text wrapping
- [2026-03-16 — E-commerce Product](2026-03-16-ecommerce-product.md) — 0 issues, 0 fixes | Features: two-column layout, gradient image, strikethrough price, size pills, text wrapping
- [2026-03-16 — Task Manager](2026-03-16-task-manager.md) — 0 issues, 0 fixes | Features: Kanban columns, priority badges, ellipse avatars, SPACE_BETWEEN, text wrapping
- [2026-03-16 — Music Player](2026-03-16-music-player.md) — 0 issues, 0 fixes | Features: dark theme, gradient album art, highlighted row, progress bar, SPACE_BETWEEN
- [2026-03-16 — Weather App](2026-03-16-weather-app.md) — 0 issues, 0 fixes | Features: multi-stop gradient, 80px typography, forecast row, detail grid, FILL sizing
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
