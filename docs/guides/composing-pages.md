# Composing Pages

Audience: Primarily developers; designers benefit from seeing the composition model

This guide covers how to build full landing pages by composing existing section components.

## When to Use This Workflow

Use this when you want to assemble a multi-section web page (landing page, marketing page, product page) from the available component library.

## Available Section Components

The design system includes 16 components organized into three tiers:

### Section Components (self-contained with layout)

| Component       | Purpose                                                       |
|-----------------|---------------------------------------------------------------|
| Navbar          | Sticky top navigation with logo, links, CTA button            |
| Hero            | Full-width hero with headline, gradient text, CTAs             |
| LogoCloud       | Partner/client logos in grid or scroll layout                  |
| FeatureGrid     | Grid of feature cards with header                             |
| Stats           | Key metrics in inline or card layout                          |
| Testimonials    | Customer testimonials grid with header                        |
| PricingTable    | Pricing plan cards with header                                |
| CTABanner       | Full-width call-to-action banner with gradient background     |
| FAQ             | Accordion-style Q&A section                                   |
| Footer          | Site footer with columns, social links, copyright             |

### Card Components (used inside sections)

| Component        | Used by        |
|------------------|----------------|
| FeatureCard      | FeatureGrid    |
| TestimonialCard  | Testimonials   |
| PricingCard      | PricingTable   |

### Primitive Components (used across many components)

| Component | Purpose                           |
|-----------|-----------------------------------|
| Badge     | Inline label/tag                  |
| Button    | Actions and navigation            |
| Container | Max-width layout wrapper          |

## Creating a Page

Create your page file at `preview/src/pages/_generated/{PageName}.tsx`:

```tsx
import { Navbar } from '../../components/Navbar/Navbar'
import { Hero } from '../../components/Hero/Hero'
import { FeatureGrid } from '../../components/FeatureGrid/FeatureGrid'
import { Footer } from '../../components/Footer/Footer'
// ... other section imports

export function MyLandingPage() {
  return (
    <>
      <Navbar logo="MyApp" links={navLinks} />
      <Hero title="Welcome to" gradientText="MyApp" subtitle="..." primaryCta="Get Started" />
      <FeatureGrid badge="Features" title="Why choose us" features={features} />
      <Footer logo="MyApp" description="..." columns={footerColumns} />
    </>
  )
}
```

## Standard Section Ordering

The typical landing page follows this order:

1. **Navbar** — navigation
2. **Hero** — headline and primary CTA
3. **LogoCloud** — social proof (logos)
4. **FeatureGrid** — product capabilities
5. **Stats** — key metrics
6. **Testimonials** — customer quotes
7. **PricingTable** — plans and pricing
8. **CTABanner** — conversion prompt
9. **FAQ** — common questions
10. **Footer** — navigation and legal

You can omit sections or reorder as needed. Each section is self-contained.

## Data Patterns

Section components accept typed data arrays. Define these above your JSX:

```tsx
const features: Feature[] = [
  { icon: <Zap size={24} />, title: 'Fast', description: 'Built for speed.' },
  { icon: <Shield size={24} />, title: 'Secure', description: 'Enterprise-grade security.' },
]

const plans: PricingPlan[] = [
  { name: 'Free', price: '$0', description: 'For individuals', features: ['1 project'], cta: 'Start Free' },
  { name: 'Pro', price: '$29', description: 'For teams', features: ['Unlimited projects'], cta: 'Try Pro', highlighted: true },
]
```

Shared type definitions (`Feature`, `PricingPlan`, `Testimonial`, `FAQItem`, etc.) are in `preview/src/components/types.ts`.

## Rendering the Page

Update `preview/src/App.tsx` to render your page:

```tsx
import { MyLandingPage } from './pages/_generated/MyLandingPage'

function App() {
  return <MyLandingPage />
}
```

Then start the dev server:

```bash
cd preview && npm run dev
```

Vite's hot module replacement means edits to your page or its components appear instantly in the browser.

## What's Next

- [Creating Components](creating-components.md) — if a section you need doesn't exist yet
- [Exporting to Figma](exporting-to-figma.md) — push your page's components to Figma
