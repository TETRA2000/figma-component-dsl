# Dogfooding: Analytics Dashboard
> Date: 2026-03-14 | Iteration: 2 of 3

## Theme
**Analytics Dashboard** — Clean data visualization UI with metric cards, bar charts, and data tables
DSL features stressed: FILL sizing (nested), mixed horizontal/vertical layout, cornerRadii, SPACE_BETWEEN, rectangle bars, dividers

## Components created
- `MetricCard` — KPI card with colored accent strip, value, and trend
- `MiniChart` — Bar chart with flex-distributed bars
- `DataTable` — Tabular data with header, rows, and trend indicators

## Renders

### Browser (React)
![Browser render](images/2026-03-14-analytics-dashboard-browser.png)

### DSL Pipeline
![DSL render](images/2026-03-14-analytics-dashboard-dsl.png)

## Comparison

| Area | Match? | Issue | Type | Fixed? |
|---|---|---|---|---|
| Metric cards | YES | Initially too narrow — FILL not expanding | Pipeline | YES |
| Charts | YES | Initially too narrow — same FILL bug | Pipeline | YES |
| Data table columns | YES | Initially cramped — same FILL bug | Pipeline | YES |
| Bar chart bars | YES | — | — | — |
| Accent strips | YES | — | — | — |
| Trend colors | YES | — | — | — |

## Pipeline fixes
- **FILL inside FILL containers**: The layout resolver's parentSizing heuristic only checked `widthSizing`/`sizing` and `node.size.x` to determine if a container was HUG. Containers that were themselves FILL-sized (via `layoutSizingHorizontal: 'FILL'`) were incorrectly classified as HUG, preventing their FILL children from expanding. Fix: also check `node.layoutSizingHorizontal`/`layoutSizingVertical` (files: `packages/compiler/src/layout-resolver.ts`, `packages/compiler/src/layout-resolver.test.ts`)

## Commits
- `ef7d13d` — fix(compiler): FILL children inside FILL-sized containers now expand correctly
