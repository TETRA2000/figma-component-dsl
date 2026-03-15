# Plan: 100 Pages Dogfooding + Validation Loosening

## Overview
Create 100 showcase pages across diverse industries/styles via the full dogfooding loop (React components → browser screenshot → DSL equivalent → pipeline render → compare). Systematically loosen DSL validation rules along the way, measuring which rules can be relaxed while maintaining output quality.

## Phase 0: Infrastructure Setup

### 0.1 Project Setup
- `git submodule update --init --recursive`
- `npm install`
- `npm run build`
- Create branch `claude/expand-dsl-validation-afCw4`
- Verify CLI: `bin/figma-dsl --help`

### 0.2 Add Severity Configuration to Validator
Modify `packages/validator/` to support configurable severity per rule:

**Changes to `packages/validator/src/types.ts`:**
- Add `SeverityLevel = 'error' | 'warning' | 'off'`
- Add `severityOverrides?: Record<string, SeverityLevel>` to `ValidatorOptions`
- Add `preset?: 'strict' | 'normal' | 'loose'` to `ValidatorOptions`

**New file: `packages/validator/src/presets.ts`:**
- Define 3 presets mapping rule IDs to severity levels:
  - `strict` — current defaults (all rules at their current severity)
  - `normal` — downgrade some errors to warnings (classname-prop, no-inline-style, variant-union)
  - `loose` — most rules as warnings or off (design-tokens off, barrel-export off, html-attrs off, etc.)

**Changes to `packages/validator/src/validator.ts`:**
- Apply severity overrides from options before running rules
- Apply preset-based overrides (preset takes lower priority than explicit overrides)
- When a rule's severity is `'off'`, skip it entirely

**Add tests for new severity config** in `packages/validator/src/__tests__/`

### 0.3 Add Compiler Validation Strictness
Modify `packages/compiler/src/compiler.ts`:
- Add `CompilerOptions.validationLevel?: 'strict' | 'normal' | 'loose'`
- `strict` = current behavior (reject all invalid)
- `normal` = warn on strokeWeight=0 instead of error
- `loose` = warn on most checks, only error on truly broken things (missing IMAGE src)

### 0.4 Create Batch DSL Generation Tooling
Create `scripts/dogfooding-batch.ts`:
- Takes a manifest of page themes
- For each: creates output directory, compiles DSL, renders PNG, exports Figma plugin JSON
- Outputs batch report with success/failure per page

## Phase 1: 100 Page Themes Organization

Organize 100 pages across 10 industry batches of 10 pages each. Each batch loosens specific validation rules.

### Batch 1 (Pages 1-10): Baseline — All Rules Strict
**Industry:** Technology / SaaS
**Pages:** Landing page, Pricing, Dashboard, Settings, Login, Signup, Profile, Notifications, Analytics, Help Center
**Validation:** `strict` preset (current defaults)
**DSL Features:** Basic auto-layout, text, rectangles, fills

### Batch 2 (Pages 11-20): Loosen `three-file` + `barrel-export`
**Industry:** E-commerce / Retail
**Pages:** Product listing, Product detail, Cart, Checkout, Order confirmation, Wishlist, Category browse, Search results, Reviews, Store locator
**Validation:** `three-file` → off, `barrel-export` → off
**DSL Features:** Images, nested layouts, FILL sizing

### Batch 3 (Pages 21-30): Loosen `design-tokens` + `token-exists`
**Industry:** Food & Restaurant
**Pages:** Menu, Reservation, Chef profile, Recipe detail, Specials, Catering, Delivery tracker, Reviews, Gift cards, Loyalty program
**Validation:** `design-tokens` → off, `token-exists` → warning
**DSL Features:** Gradients, corner radii, rich typography

### Batch 4 (Pages 31-40): Loosen `css-modules` + `no-inline-style`
**Industry:** Healthcare / Wellness
**Pages:** Appointment booking, Doctor profile, Patient portal, Lab results, Medication tracker, Symptom checker, Insurance, Telehealth, Health tips, Emergency info
**Validation:** `css-modules` → warning, `no-inline-style` → warning
**DSL Features:** Ellipses, strokes, text wrapping

### Batch 5 (Pages 41-50): Loosen `classname-prop`
**Industry:** Education / E-learning
**Pages:** Course catalog, Lesson view, Quiz, Progress tracker, Certificate, Student profile, Discussion forum, Assignment submission, Grade book, Calendar
**Validation:** `classname-prop` → warning
**DSL Features:** SPACE_BETWEEN, nested auto-layout, complex text styles

### Batch 6 (Pages 51-60): Loosen `variant-union`
**Industry:** Finance / Banking
**Pages:** Account overview, Transactions, Transfer, Budget, Investments, Credit score, Loan application, Bill pay, ATM finder, Rewards
**Validation:** `variant-union` → warning
**DSL Features:** Fixed sizing, precise alignment, ellipses

### Batch 7 (Pages 61-70): Loosen `html-attrs` + `dsl-compatible-layout`
**Industry:** Travel / Hospitality
**Pages:** Destination search, Hotel detail, Flight booking, Itinerary, Reviews, Photo gallery, Map view, Travel guide, Loyalty points, Check-in
**Validation:** `html-attrs` → off, `dsl-compatible-layout` → off
**DSL Features:** Image fills, clip content, overlay patterns

### Batch 8 (Pages 71-80): Loosen `image-refs` thresholds
**Industry:** Media / Entertainment
**Pages:** Movie listing, Streaming player, Podcast detail, Music playlist, News feed, Article, Event calendar, Ticket purchase, Artist profile, Recommendations
**Validation:** `image-refs` → relax size limit to 50MB, allow SVG format
**DSL Features:** Large images, gradients, multi-stop fills

### Batch 9 (Pages 81-90): Compiler loosening — strokeWeight=0, relaxed cornerRadius
**Industry:** Real Estate / Architecture
**Pages:** Property listing, Floor plan, Virtual tour, Agent profile, Mortgage calculator, Neighborhood, Open houses, Saved homes, Comparison, Application
**Validation:** Compiler `loose` mode (strokeWeight=0 allowed)
**DSL Features:** Lines, strokes, polygon/star shapes

### Batch 10 (Pages 91-100): Maximum loosening — nearly all rules off/warning
**Industry:** Creative / Portfolio
**Pages:** Portfolio grid, Project detail, About, Contact, Testimonials, Services, Blog, Case study, Resume, Experimental/art
**Validation:** `loose` preset (most rules warning or off)
**DSL Features:** All features combined, stress test everything

## Phase 2: Implementation Per Batch (Repeated 10 Times)

For each batch of 10 pages:

### Step A: Apply validation rule changes for this batch
- Modify rule severity in `packages/validator/src/rules/*.ts` or presets
- Build: `npm run build`
- Run existing tests: `npx vitest run`
- Commit rule changes separately

### Step B: Create React components (per page in batch)
- Create 2-4 components per page at `preview/src/components/_generated/{ComponentName}/`
- Each component: `.tsx`, `.module.css`, `.figma.tsx` (when rules require; skip when loosened)
- Create showcase page at `preview/src/pages/_generated/{PageName}Showcase.tsx`

### Step C: Browser render + screenshot
- Start preview server, navigate to showcase page
- Capture browser screenshot → `dogfooding/<timestamp>/batch-<N>/page-<M>/browser.png`

### Step D: DSL equivalent
- Write `.dsl.ts` at `workspace/dsl/{page-name}.dsl.ts`
- Compile: `bin/figma-dsl compile`
- Render: `bin/figma-dsl render`
- Export Figma plugin JSON: `bin/figma-dsl export`

### Step E: Compare + investigate
- Visual comparison of browser vs DSL renders
- CLI comparison: `bin/figma-dsl compare`
- For mismatches: trace through pipeline layers and fix

### Step F: Document findings
- Log quality impact of loosened rules
- Update `docs/history/` with iteration log
- Note: does loosening degrade output quality?

### Step G: Commit
- Commit pipeline fixes separately
- Commit components + pages
- Commit history logs

## Phase 3: Analysis & Report

After all 100 pages:

### 3.1 Validation Loosening Report
Create `docs/validation-loosening-report.md`:

| Rule | Original Severity | Loosened To | Pages Tested | Quality Impact | Recommendation |
|------|------------------|------------|--------------|----------------|----------------|
| three-file | warning | off | 11-100 | None | Safe to loosen |
| barrel-export | warning | off | 11-100 | None | Safe to loosen |
| design-tokens | warning | off | 21-100 | Minor | Context-dependent |
| css-modules | error | warning | 31-100 | TBD | ... |
| no-inline-style | error | warning | 31-100 | TBD | ... |
| classname-prop | error | warning | 41-100 | TBD | ... |
| variant-union | error | warning | 51-100 | TBD | ... |
| html-attrs | warning | off | 61-100 | TBD | ... |
| dsl-compatible-layout | warning | off | 61-100 | TBD | ... |
| image-refs | mixed | relaxed | 71-100 | TBD | ... |
| compiler:strokeWeight | error | warning | 81-100 | TBD | ... |

### 3.2 Final Recommendations
- Which rules are safe to permanently loosen
- Which rules are critical to keep strict
- Proposed new default preset

### 3.3 Push all changes
- Push branch `claude/expand-dsl-validation-afCw4`

## Execution Strategy

This plan is designed for incremental execution. Each batch is independent and can be completed in a separate session. Progress tracking via:
- `docs/history/README.md` — completed pages
- Git commits — completed batches
- Validation loosening report — accumulated findings

**Start with Phase 0 (infrastructure) + Batch 1 (baseline), then iterate.**
