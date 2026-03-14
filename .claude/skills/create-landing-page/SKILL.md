---
name: create-landing-page
description: >
  Create landing pages by composing React components with live preview. Use
  this skill whenever the user mentions landing pages, marketing pages, web
  page layouts, page sections, or wants to prototype any kind of multi-section
  web page — even if they don't explicitly say "landing page". Also trigger
  when the user asks to compose Hero, Navbar, Footer, Pricing, FAQ, or other
  page sections together, or wants to build a page from existing components.
  Covers: "create a landing page", "build a page", "compose sections",
  "marketing page", "prototype page", "put together a homepage".
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

# Create Landing Page

Compose multi-section landing pages from registered React components and launch a live preview.

## Workflow

### Step 1: Load Component Registry

Read the shared component registry to understand what components are available:

```
.claude/skills/shared/references/component-registry.md
```

Also read the design tokens for consistent styling:

```
.claude/skills/shared/references/design-tokens.md
```

If either file is missing, scan `preview/src/components/index.ts` and `preview/src/components/types.ts` directly to discover available components, their exports, and prop types.

### Step 2: Understand the User Request

Parse the user's description to determine:

- **Page theme/purpose** — SaaS product, portfolio, agency, e-commerce, etc.
- **Desired sections** — Which sections to include (hero, features, pricing, FAQ, etc.)
- **Brand details** — Company name, tagline, color preferences, icon choices
- **Content** — Any specific copy, stats, testimonials, or pricing provided

If the user gives a vague request like "build me a landing page", use sensible defaults:
- Navbar, Hero, LogoCloud, FeatureGrid, Stats, Testimonials, PricingTable, CTABanner, FAQ, Footer

### Step 3: Compose the Page

Create the page file at `preview/src/pages/{PageName}.tsx`.

Follow the reference pattern from `references/figma_design_playground/src/pages/LandingPage.tsx`:

1. **Import icons** from `lucide-react` as needed
2. **Import components** from `@/components`
3. **Import types** from `@/components/types`
4. **Define data arrays** — typed arrays for navLinks, features, stats, testimonials, plans, faqItems, footerColumns
5. **Export the page component** — compose sections in order, wrapping anchor-targeted sections in `<div id="...">` elements

Key patterns:
- Use `lucide-react` icons for feature icons (Zap, Shield, BarChart3, Globe, Layers, Rocket, etc.)
- Use `https://api.dicebear.com/9.x/avataaars/svg?seed={Name}` for avatar placeholders
- Use `https://api.dicebear.com/9.x/initials/svg?seed={Letter}&backgroundColor={hex}&textColor=ffffff` for logo placeholders
- All data should be defined as typed const arrays above the component function
- Wrap sections that are navigation targets with `<div id="sectionName">`

### Step 4: Update App.tsx

Edit `preview/src/App.tsx` to import and render the new page:

```tsx
import { PageName } from './pages/PageName'

function App() {
  return <PageName />
}

export default App
```

### Step 5: Launch Preview

Read `.claude/launch.json` and use the `preview-app` configuration to launch the dev server:

```bash
cd preview && npm run dev
```

The server runs on port 5173 (with autoPort fallback). Tell the user the preview URL.

### Step 6: Handle Updates

When the user requests changes (e.g., "change the hero title", "add another pricing plan"):

1. Read the current page file
2. Edit only the relevant data or component props
3. Save — Vite hot-reloads automatically
4. Confirm the change to the user

## Component Reference

Available page-level components (from `preview/src/components/`):

| Component | Key Props | Purpose |
|-----------|-----------|---------|
| `Navbar` | `logo`, `links`, `ctaLabel`, `ctaHref` | Top navigation bar |
| `Hero` | `badge`, `title`, `gradientText`, `subtitle`, `primaryCta`, `secondaryCta` | Hero section with CTA |
| `LogoCloud` | `title`, `logos` | Trusted-by logo strip |
| `FeatureGrid` | `badge`, `title`, `subtitle`, `features`, `columns` | Feature cards grid |
| `Stats` | `stats`, `variant` | Statistics display |
| `Testimonials` | `badge`, `title`, `subtitle`, `testimonials` | Customer testimonials |
| `PricingTable` | `badge`, `title`, `subtitle`, `plans` | Pricing plans |
| `CTABanner` | `title`, `subtitle`, `primaryCta`, `secondaryCta` | Call-to-action banner |
| `FAQ` | `badge`, `title`, `subtitle`, `items` | FAQ accordion |
| `Footer` | `logo`, `description`, `columns`, `socialLinks`, `copyright` | Page footer |

## Tips

- Always export the page as a named export: `export function PageName()`
- Keep data definitions outside the component for clarity
- Use the `highlighted: true` prop on the recommended pricing plan
- The `columns` prop on FeatureGrid accepts 2 or 3
- Stats `variant` can be `"cards"` or `"inline"`
- Import `type` separately from component imports for cleaner code
