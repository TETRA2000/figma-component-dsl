# Dogfooding: Neon Gaming
> Date: 2026-03-14 | Iteration: 1 of 3

## Theme
**Neon Gaming** — Dark game library with neon pink/cyan/green accent colors
DSL features stressed: gradients (multi-stop, angled), thick strokes, clipContent, ellipse nodes, SPACE_BETWEEN alignment, pill shapes (cornerRadius: 999)

## Components created
- `GameCard` — Game card with gradient image area, pink border, title/genre/players/rating
- `LiveBadge` — Pill badge with variants (live/trending/new), gradient fills
- `LeaderboardRow` — Ranked player row with ellipse avatar, score display

## Renders

### DSL Pipeline
![DSL render](images/2026-03-14-neon-gaming-dsl.png)

## Comparison

| Area | Match? | Issue | Type | Fixed? |
|---|---|---|---|---|
| Header + badges | YES | — | — | — |
| Featured banner gradient | YES | — | — | — |
| Banner centering | NO | Banner not centered on 1440px page | DSL | YES |
| Card gradients + borders | YES | — | — | — |
| Card clipContent | YES | — | — | — |
| Card title/rating spacing | NO | Used MIN instead of SPACE_BETWEEN | DSL | YES |
| Leaderboard top3 bg | NO | Used frame opacity instead of fill color | DSL | YES |
| Ellipse avatars | YES | — | — | — |

## Pipeline fixes
None — all 3 issues were DSL authoring errors, not pipeline bugs.

## Commits
No pipeline commits needed.
