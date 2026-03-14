# Dogfooding: Analytics Dashboard
> Date: 2026-03-14 | Iteration: 2 of 3

## Theme
**Analytics Dashboard** — Dark data dashboard with slate/blue/emerald/amber palette
DSL features stressed: FILL sizing, SPACE_BETWEEN alignment, opacity (disabled states, bar chart), gradient fills (progress bars, chart bars), mixed H+V layouts, two-column layout

## Components created
- `StatCard` — Stat card with label, value, and trend change indicator
- `ProgressBar` — Labeled progress bar with gradient fill and track
- `MetricRow` — Key metric row with label, value, subtext, and disabled state

## Renders

### DSL Pipeline
![DSL render](images/2026-03-14-analytics-dashboard-dsl.png)

## Comparison

| Area | Match? | Issue | Type | Fixed? |
|---|---|---|---|---|
| Header + subtitle | YES | — | — | — |
| 4 Stat cards in row | YES | — | — | — |
| Progress bar gradient fills | YES | — | — | — |
| SPACE_BETWEEN alignment | YES | — | — | — |
| Bar chart with opacity | YES | — | — | — |
| Two-column layout | YES | — | — | — |
| Metric rows (SPACE_BETWEEN) | YES | — | — | — |
| Disabled row (opacity 0.4) | YES | — | — | — |

## Pipeline fixes
None — all DSL features rendered correctly.

## Commits
No pipeline commits needed.
