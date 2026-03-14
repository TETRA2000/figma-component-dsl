# Landing Page Reference Pattern

Pattern extracted from `references/figma_design_playground/src/pages/LandingPage.tsx`.

## File Structure

```
preview/src/pages/PageName.tsx
```

## Import Pattern

```tsx
// 1. Icons from lucide-react
import { Zap, Shield, BarChart3, Globe, Layers, Rocket, Github, Twitter, Linkedin } from 'lucide-react';

// 2. Components from barrel export
import { Navbar, Hero, FeatureGrid, Stats, LogoCloud, Testimonials, PricingTable, CTABanner, FAQ, Footer } from '@/components';

// 3. Types (import type for type-only imports)
import type { NavLink, Feature, StatItem, Testimonial, PricingPlan, FAQItem, FooterColumn } from '@/components/types';
```

## Data Definition Pattern

Define typed arrays as module-level constants before the component:

```tsx
const navLinks: NavLink[] = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
];

const features: Feature[] = [
  { icon: <Zap size={24} />, title: 'Fast', description: 'Built for speed.' },
];

const stats: StatItem[] = [
  { value: '10M+', label: 'API requests daily' },
];
```

## Component Composition Pattern

```tsx
export function LandingPage() {
  return (
    <>
      <Navbar logo="Brand" links={navLinks} ctaLabel="Get Started" ctaHref="#pricing" />
      <Hero badge="New" title="Main headline" gradientText="gradient part" subtitle="..." primaryCta="CTA" secondaryCta="Secondary" />
      <LogoCloud title="Trusted by" logos={logos} />
      <div id="features">
        <FeatureGrid badge="Features" title="..." subtitle="..." features={features} columns={3} />
      </div>
      <Stats stats={stats} variant="cards" />
      <div id="testimonials">
        <Testimonials badge="Testimonials" title="..." subtitle="..." testimonials={testimonials} />
      </div>
      <div id="pricing">
        <PricingTable badge="Pricing" title="..." subtitle="..." plans={plans} />
      </div>
      <CTABanner title="..." subtitle="..." primaryCta="..." secondaryCta="..." />
      <div id="faq">
        <FAQ badge="FAQ" title="..." subtitle="..." items={faqItems} />
      </div>
      <Footer logo="Brand" description="..." columns={footerColumns} socialLinks={socialLinks} copyright="..." />
    </>
  );
}
```

## Placeholder Assets

- **Avatars**: `https://api.dicebear.com/9.x/avataaars/svg?seed={Name}`
- **Logo initials**: `https://api.dicebear.com/9.x/initials/svg?seed={Letter}&backgroundColor={hex}&textColor=ffffff`

## Key Conventions

- Named export for page components (not default)
- Fragment (`<>...</>`) as root element
- Anchor-targeted sections wrapped in `<div id="...">`
- Icon size consistently `24` for feature icons, `18` for social icons
- `highlighted: true` on recommended pricing plan
- Copyright with dynamic year: `` `© ${new Date().getFullYear()} Brand` ``
