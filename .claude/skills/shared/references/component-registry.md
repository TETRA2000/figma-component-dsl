# Component Registry Reference

Complete registry of all 16 UI components available in the design system. Each entry includes the TypeScript props interface, supported variants, default values, Figma Code Connect property mappings, and usage examples.

## Shared Types

These shared types are used across multiple components. Defined in `src/components/types.ts`.

```typescript
interface NavLink {
  label: string;
  href: string;
}

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

interface Testimonial {
  quote: string;
  author: string;
  title: string;
  avatar?: string;
  rating?: number;
}

interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FooterColumn {
  title: string;
  links: NavLink[];
}

interface StatItem {
  value: string;
  label: string;
}
```

---

## 1. Badge

**Description:** Inline label/tag used to highlight status, category, or section labels.

**Source:** `src/components/Badge/Badge.tsx`

### Props Interface

```typescript
interface BadgeProps {
  variant?: 'default' | 'primary' | 'success' | 'warning';
  children: ReactNode;
  className?: string;
}
```

### Variants and Defaults

| Prop      | Type                                            | Default     |
|-----------|-------------------------------------------------|-------------|
| variant   | `'default' \| 'primary' \| 'success' \| 'warning'` | `'default'` |
| children  | `ReactNode`                                     | (required)  |
| className | `string`                                        | `undefined` |

### Figma Code Connect

**Figma URL:** `node-id=5-1238`

| Figma Property | Mapping Method  | Values                                              |
|----------------|-----------------|-----------------------------------------------------|
| Variant        | `figma.enum`    | Default -> `'default'`, Primary -> `'primary'`, Success -> `'success'`, Warning -> `'warning'` |
| Label          | `figma.string`  | Maps to `children`                                  |

### Usage Example

```tsx
<Badge variant="primary">Now in Public Beta</Badge>
```

---

## 2. Button

**Description:** Primary interactive element for actions and navigation. Renders as `<button>` or `<a>` when `href` is provided.

**Source:** `src/components/Button/Button.tsx`

### Props Interface

```typescript
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  fullWidth?: boolean;
  children: ReactNode;
}
```

### Variants and Defaults

| Prop      | Type                                                  | Default     |
|-----------|-------------------------------------------------------|-------------|
| variant   | `'primary' \| 'secondary' \| 'outline' \| 'ghost'`   | `'primary'` |
| size      | `'sm' \| 'md' \| 'lg'`                               | `'md'`      |
| href      | `string`                                              | `undefined` |
| fullWidth | `boolean`                                             | `false`     |
| children  | `ReactNode`                                           | (required)  |
| className | `string`                                              | `undefined` |

### Figma Code Connect

**Figma URL:** `node-id=5-1229`

| Figma Property | Mapping Method   | Values                                                                      |
|----------------|------------------|-----------------------------------------------------------------------------|
| Variant        | `figma.enum`     | Primary -> `'primary'`, Secondary -> `'secondary'`, Outline -> `'outline'`, Ghost -> `'ghost'` |
| Size           | `figma.enum`     | Small -> `'sm'`, Medium -> `'md'`, Large -> `'lg'`                          |
| Label          | `figma.string`   | Maps to `children`                                                          |
| Full Width     | `figma.boolean`  | Maps to `fullWidth`                                                         |

### Usage Example

```tsx
<Button variant="primary" size="lg" href="#pricing">
  Get Started
</Button>
```

---

## 3. CTABanner

**Description:** Full-width call-to-action banner section with gradient background, title, subtitle, and action buttons.

**Source:** `src/components/CTABanner/CTABanner.tsx`

### Props Interface

```typescript
interface CTABannerProps {
  title: string;
  subtitle?: string;
  primaryCta: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
}
```

### Variants and Defaults

| Prop          | Type     | Default     |
|---------------|----------|-------------|
| title         | `string` | (required)  |
| subtitle      | `string` | `undefined` |
| primaryCta    | `string` | (required)  |
| primaryHref   | `string` | `'#'`       |
| secondaryCta  | `string` | `undefined` |
| secondaryHref | `string` | `'#'`       |

### Figma Code Connect

**Figma URL:** `node-id=5-1533`

| Figma Property | Mapping Method  | Values               |
|----------------|-----------------|----------------------|
| Title          | `figma.string`  | Maps to `title`      |
| Subtitle       | `figma.string`  | Maps to `subtitle`   |
| Primary CTA    | `figma.string`  | Maps to `primaryCta` |
| Secondary CTA  | `figma.string`  | Maps to `secondaryCta` |

### Usage Example

```tsx
<CTABanner
  title="Ready to build something amazing?"
  subtitle="Join 10,000+ developers who ship faster with Prism."
  primaryCta="Get Started for Free"
  secondaryCta="Talk to Sales"
/>
```

---

## 4. Container

**Description:** Layout wrapper that constrains content to a maximum width with optional horizontal padding.

**Source:** `src/components/Container/Container.tsx`

### Props Interface

```typescript
interface ContainerProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  padding?: boolean;
  children: ReactNode;
  className?: string;
}
```

### Variants and Defaults

| Prop      | Type                              | Default     |
|-----------|-----------------------------------|-------------|
| maxWidth  | `'sm' \| 'md' \| 'lg' \| 'xl'`   | `'xl'`      |
| padding   | `boolean`                         | `true`      |
| children  | `ReactNode`                       | (required)  |
| className | `string`                          | `undefined` |

### Figma Code Connect

**Figma URL:** `node-id=5-1247`

| Figma Property | Mapping Method | Values                                                                  |
|----------------|----------------|-------------------------------------------------------------------------|
| Max Width      | `figma.enum`   | Small -> `'sm'`, Medium -> `'md'`, Large -> `'lg'`, Extra Large -> `'xl'` |

### Usage Example

```tsx
<Container maxWidth="lg">
  <p>Content constrained to large width</p>
</Container>
```

---

## 5. FAQ

**Description:** Accordion-style frequently asked questions section with badge, title, subtitle, and collapsible items.

**Source:** `src/components/FAQ/FAQ.tsx`

### Props Interface

```typescript
interface FAQProps {
  badge?: string;
  title: string;
  subtitle?: string;
  items: FAQItem[];
}
```

### Variants and Defaults

| Prop     | Type        | Default     |
|----------|-------------|-------------|
| badge    | `string`    | `undefined` |
| title    | `string`    | (required)  |
| subtitle | `string`    | `undefined` |
| items    | `FAQItem[]` | (required)  |

### Figma Code Connect

**Figma URL:** `node-id=5-1541`

| Figma Property | Mapping Method | Values              |
|----------------|----------------|---------------------|
| Badge          | `figma.string` | Maps to `badge`     |
| Title          | `figma.string` | Maps to `title`     |
| Subtitle       | `figma.string` | Maps to `subtitle`  |

### Usage Example

```tsx
<FAQ
  badge="FAQ"
  title="Frequently asked questions"
  subtitle="Everything you need to know about Prism."
  items={[
    { question: 'How does the free trial work?', answer: 'You get 14 days of full access...' },
    { question: 'Can I change plans at any time?', answer: 'Absolutely. Upgrade or downgrade...' },
  ]}
/>
```

---

## 6. FeatureCard

**Description:** Individual feature card with icon, title, and description. Typically used inside FeatureGrid.

**Source:** `src/components/FeatureCard/FeatureCard.tsx`

### Props Interface

```typescript
interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}
```

### Variants and Defaults

| Prop        | Type        | Default    |
|-------------|-------------|------------|
| icon        | `ReactNode` | (required) |
| title       | `string`    | (required) |
| description | `string`    | (required) |

### Figma Code Connect

**Figma URL:** `node-id=5-1282`

| Figma Property | Mapping Method   | Values                   |
|----------------|------------------|--------------------------|
| Title          | `figma.string`   | Maps to `title`          |
| Description    | `figma.string`   | Maps to `description`    |
| Icon           | `figma.instance` | Maps to `icon`           |

### Usage Example

```tsx
import { Zap } from 'lucide-react';

<FeatureCard
  icon={<Zap size={24} />}
  title="Lightning Fast"
  description="Built on cutting-edge infrastructure that delivers sub-50ms response times globally."
/>
```

---

## 7. FeatureGrid

**Description:** Section layout displaying a grid of FeatureCard components with optional badge, title, and subtitle header.

**Source:** `src/components/FeatureGrid/FeatureGrid.tsx`

### Props Interface

```typescript
interface FeatureGridProps {
  badge?: string;
  title: string;
  subtitle?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
}
```

### Variants and Defaults

| Prop     | Type          | Default     |
|----------|---------------|-------------|
| badge    | `string`      | `undefined` |
| title    | `string`      | (required)  |
| subtitle | `string`      | `undefined` |
| features | `Feature[]`   | (required)  |
| columns  | `2 \| 3 \| 4` | `3`         |

### Figma Code Connect

**Figma URL:** `node-id=5-1346`

| Figma Property | Mapping Method | Values                              |
|----------------|----------------|-------------------------------------|
| Badge          | `figma.string` | Maps to `badge`                     |
| Title          | `figma.string` | Maps to `title`                     |
| Subtitle       | `figma.string` | Maps to `subtitle`                  |
| Columns        | `figma.enum`   | '2' -> `2`, '3' -> `3`, '4' -> `4` |

### Usage Example

```tsx
<FeatureGrid
  badge="Features"
  title="Everything you need to ship"
  subtitle="A complete toolkit designed for modern development teams."
  features={features}
  columns={3}
/>
```

---

## 8. Footer

**Description:** Site footer with brand info, navigation columns, social links, and copyright notice.

**Source:** `src/components/Footer/Footer.tsx`

### Props Interface

```typescript
interface FooterProps {
  logo: string;
  description: string;
  columns: FooterColumn[];
  socialLinks?: { icon: ReactNode; href: string; label: string }[];
  copyright?: string;
}
```

### Variants and Defaults

| Prop        | Type                                                  | Default     |
|-------------|-------------------------------------------------------|-------------|
| logo        | `string`                                              | (required)  |
| description | `string`                                              | (required)  |
| columns     | `FooterColumn[]`                                      | (required)  |
| socialLinks | `{ icon: ReactNode; href: string; label: string }[]`  | `undefined` |
| copyright   | `string`                                              | `undefined` |

### Figma Code Connect

**Figma URL:** `node-id=5-1563`

| Figma Property | Mapping Method | Values                  |
|----------------|----------------|-------------------------|
| Logo           | `figma.string` | Maps to `logo`          |
| Description    | `figma.string` | Maps to `description`   |
| Copyright      | `figma.string` | Maps to `copyright`     |

### Usage Example

```tsx
import { Twitter, Github, Linkedin } from 'lucide-react';

<Footer
  logo="Prism"
  description="The modern developer platform for teams that move fast."
  columns={[
    { title: 'Product', links: [{ label: 'Features', href: '#features' }, { label: 'Pricing', href: '#pricing' }] },
    { title: 'Company', links: [{ label: 'About', href: '#' }, { label: 'Blog', href: '#' }] },
  ]}
  socialLinks={[
    { icon: <Twitter size={18} />, href: '#', label: 'Twitter' },
    { icon: <Github size={18} />, href: '#', label: 'GitHub' },
    { icon: <Linkedin size={18} />, href: '#', label: 'LinkedIn' },
  ]}
  copyright="© 2026 Prism Inc. All rights reserved."
/>
```

---

## 9. Hero

**Description:** Full-width hero section with badge, headline with gradient text, subtitle, CTA buttons, and optional image. Supports center and left alignment.

**Source:** `src/components/Hero/Hero.tsx`

### Props Interface

```typescript
interface HeroProps {
  badge?: string;
  title: string;
  gradientText?: string;
  subtitle: string;
  primaryCta: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
  image?: ReactNode;
  alignment?: 'center' | 'left';
}
```

### Variants and Defaults

| Prop          | Type                   | Default     |
|---------------|------------------------|-------------|
| badge         | `string`               | `undefined` |
| title         | `string`               | (required)  |
| gradientText  | `string`               | `undefined` |
| subtitle      | `string`               | (required)  |
| primaryCta    | `string`               | (required)  |
| primaryHref   | `string`               | `'#'`       |
| secondaryCta  | `string`               | `undefined` |
| secondaryHref | `string`               | `'#'`       |
| image         | `ReactNode`            | `undefined` |
| alignment     | `'center' \| 'left'`   | `'center'`  |

### Figma Code Connect

**Figma URL:** `node-id=5-1281`

| Figma Property | Mapping Method | Values                                    |
|----------------|----------------|-------------------------------------------|
| Badge          | `figma.string` | Maps to `badge`                           |
| Title          | `figma.string` | Maps to `title`                           |
| Gradient Text  | `figma.string` | Maps to `gradientText`                    |
| Subtitle       | `figma.string` | Maps to `subtitle`                        |
| Primary CTA    | `figma.string` | Maps to `primaryCta`                      |
| Secondary CTA  | `figma.string` | Maps to `secondaryCta`                    |
| Alignment      | `figma.enum`   | Center -> `'center'`, Left -> `'left'`    |

### Usage Example

```tsx
<Hero
  badge="Now in Public Beta"
  title="Ship faster with"
  gradientText="the modern dev platform"
  subtitle="Prism gives your team the tools to build, deploy, and scale."
  primaryCta="Start Building Free"
  secondaryCta="See It in Action"
/>
```

---

## 10. LogoCloud

**Description:** Section displaying partner/client logos in a grid or auto-scrolling marquee layout.

**Source:** `src/components/LogoCloud/LogoCloud.tsx`

### Props Interface

```typescript
interface LogoCloudProps {
  title?: string;
  logos: { name: string; src: string }[];
  variant?: 'grid' | 'scroll';
}
```

### Variants and Defaults

| Prop    | Type                               | Default     |
|---------|-------------------------------------|-------------|
| title   | `string`                            | `undefined` |
| logos   | `{ name: string; src: string }[]`   | (required)  |
| variant | `'grid' \| 'scroll'`                | `'grid'`    |

### Figma Code Connect

**Figma URL:** `node-id=5-1395`

| Figma Property | Mapping Method | Values                                |
|----------------|----------------|---------------------------------------|
| Title          | `figma.string` | Maps to `title`                       |
| Variant        | `figma.enum`   | Grid -> `'grid'`, Scroll -> `'scroll'` |

### Usage Example

```tsx
<LogoCloud
  title="Trusted by teams at"
  logos={[
    { name: 'Vercel', src: 'https://example.com/vercel.svg' },
    { name: 'Stripe', src: 'https://example.com/stripe.svg' },
  ]}
/>
```

---

## 11. Navbar

**Description:** Sticky top navigation bar with logo, navigation links, CTA button, and responsive mobile hamburger menu.

**Source:** `src/components/Navbar/Navbar.tsx`

### Props Interface

```typescript
interface NavbarProps {
  logo: string;
  links: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
}
```

### Variants and Defaults

| Prop     | Type        | Default         |
|----------|-------------|-----------------|
| logo     | `string`    | (required)      |
| links    | `NavLink[]` | (required)      |
| ctaLabel | `string`    | `'Get Started'` |
| ctaHref  | `string`    | `'#'`           |

### Figma Code Connect

**Figma URL:** `node-id=5-1248`

| Figma Property | Mapping Method | Values               |
|----------------|----------------|----------------------|
| Logo           | `figma.string` | Maps to `logo`       |
| CTA Label      | `figma.string` | Maps to `ctaLabel`   |

### Usage Example

```tsx
<Navbar
  logo="Prism"
  links={[
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ]}
  ctaLabel="Get Started"
  ctaHref="#pricing"
/>
```

---

## 12. PricingCard

**Description:** Individual pricing plan card with plan name, price, feature list, and CTA button. Supports highlighted state for the recommended plan.

**Source:** `src/components/PricingCard/PricingCard.tsx`

### Props Interface

Uses the `PricingPlan` shared type directly as props:

```typescript
interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}
```

### Variants and Defaults

| Prop        | Type       | Default     |
|-------------|------------|-------------|
| name        | `string`   | (required)  |
| price       | `string`   | (required)  |
| period      | `string`   | `'/mo'`     |
| description | `string`   | (required)  |
| features    | `string[]` | (required)  |
| cta         | `string`   | (required)  |
| highlighted | `boolean`  | `false`     |

### Figma Code Connect

**Figma URL:** `node-id=5-1516`

| Figma Property | Mapping Method  | Values                    |
|----------------|-----------------|---------------------------|
| Name           | `figma.string`  | Maps to `name`            |
| Price          | `figma.string`  | Maps to `price`           |
| Description    | `figma.string`  | Maps to `description`     |
| CTA            | `figma.string`  | Maps to `cta`             |
| Highlighted    | `figma.boolean` | Maps to `highlighted`     |

### Usage Example

```tsx
<PricingCard
  name="Pro"
  price="$99"
  description="For growing teams that need more power."
  features={['Up to 25 team members', '500,000 API requests/mo', 'Priority support']}
  cta="Start Free Trial"
  highlighted={true}
/>
```

---

## 13. PricingTable

**Description:** Section layout displaying multiple PricingCard components in a grid with optional badge, title, and subtitle header.

**Source:** `src/components/PricingTable/PricingTable.tsx`

### Props Interface

```typescript
interface PricingTableProps {
  badge?: string;
  title: string;
  subtitle?: string;
  plans: PricingPlan[];
}
```

### Variants and Defaults

| Prop     | Type            | Default     |
|----------|-----------------|-------------|
| badge    | `string`        | `undefined` |
| title    | `string`        | (required)  |
| subtitle | `string`        | `undefined` |
| plans    | `PricingPlan[]` | (required)  |

### Figma Code Connect

**Figma URL:** `node-id=5-1517`

| Figma Property | Mapping Method | Values              |
|----------------|----------------|---------------------|
| Badge          | `figma.string` | Maps to `badge`     |
| Title          | `figma.string` | Maps to `title`     |
| Subtitle       | `figma.string` | Maps to `subtitle`  |

### Usage Example

```tsx
<PricingTable
  badge="Pricing"
  title="Simple, transparent pricing"
  subtitle="No hidden fees. No surprises."
  plans={[
    { name: 'Starter', price: '$29', description: 'Perfect for small teams.', features: ['5 team members', '10k requests/mo'], cta: 'Start Free Trial' },
    { name: 'Pro', price: '$99', description: 'For growing teams.', features: ['25 team members', '500k requests/mo'], cta: 'Start Free Trial', highlighted: true },
  ]}
/>
```

---

## 14. Stats

**Description:** Section displaying key metrics/statistics in either inline or card layout.

**Source:** `src/components/Stats/Stats.tsx`

### Props Interface

```typescript
interface StatsProps {
  stats: StatItem[];
  variant?: 'inline' | 'cards';
}
```

### Variants and Defaults

| Prop    | Type                    | Default     |
|---------|-------------------------|-------------|
| stats   | `StatItem[]`            | (required)  |
| variant | `'inline' \| 'cards'`   | `'inline'`  |

### Figma Code Connect

**Figma URL:** `node-id=5-1376`

| Figma Property | Mapping Method | Values                                    |
|----------------|----------------|-------------------------------------------|
| Variant        | `figma.enum`   | Inline -> `'inline'`, Cards -> `'cards'`  |

### Usage Example

```tsx
<Stats
  stats={[
    { value: '10M+', label: 'API requests daily' },
    { value: '99.99%', label: 'Uptime SLA' },
    { value: '150+', label: 'Countries served' },
    { value: '<50ms', label: 'Avg response time' },
  ]}
  variant="cards"
/>
```

---

## 15. TestimonialCard

**Description:** Individual testimonial card displaying a quote, author info with avatar, and star rating.

**Source:** `src/components/TestimonialCard/TestimonialCard.tsx`

### Props Interface

Uses the `Testimonial` shared type directly as props:

```typescript
interface Testimonial {
  quote: string;
  author: string;
  title: string;
  avatar?: string;
  rating?: number;
}
```

### Variants and Defaults

| Prop   | Type     | Default     |
|--------|----------|-------------|
| quote  | `string` | (required)  |
| author | `string` | (required)  |
| title  | `string` | (required)  |
| avatar | `string` | `undefined` |
| rating | `number` | `undefined` |

### Figma Code Connect

**Figma URL:** `node-id=5-1435`

| Figma Property | Mapping Method | Values                                      |
|----------------|----------------|---------------------------------------------|
| Quote          | `figma.string` | Maps to `quote`                             |
| Author         | `figma.string` | Maps to `author`                            |
| Title          | `figma.string` | Maps to `title`                             |
| Rating         | `figma.enum`   | '3' -> `3`, '4' -> `4`, '5' -> `5`         |

### Usage Example

```tsx
<TestimonialCard
  quote="Switching to Prism cut our deployment time from 20 minutes to under 30 seconds."
  author="Sarah Chen"
  title="CTO at ScaleUp"
  avatar="https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah"
  rating={5}
/>
```

---

## 16. Testimonials

**Description:** Section layout displaying multiple TestimonialCard components in a grid with optional badge, title, and subtitle header.

**Source:** `src/components/Testimonials/Testimonials.tsx`

### Props Interface

```typescript
interface TestimonialsProps {
  badge?: string;
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
}
```

### Variants and Defaults

| Prop         | Type            | Default     |
|--------------|-----------------|-------------|
| badge        | `string`        | `undefined` |
| title        | `string`        | (required)  |
| subtitle     | `string`        | `undefined` |
| testimonials | `Testimonial[]` | (required)  |

### Figma Code Connect

**Figma URL:** `node-id=5-1436`

| Figma Property | Mapping Method | Values              |
|----------------|----------------|---------------------|
| Badge          | `figma.string` | Maps to `badge`     |
| Title          | `figma.string` | Maps to `title`     |
| Subtitle       | `figma.string` | Maps to `subtitle`  |

### Usage Example

```tsx
<Testimonials
  badge="Testimonials"
  title="Loved by developers"
  subtitle="Don't just take our word for it."
  testimonials={[
    { quote: 'Amazing product!', author: 'Sarah Chen', title: 'CTO at ScaleUp', rating: 5 },
    { quote: 'Best DX ever.', author: 'Elena Rodriguez', title: 'Lead Engineer', rating: 5 },
  ]}
/>
```

---

## Component Composition Patterns

### Full Landing Page Composition

The components are designed to be composed into complete landing pages. Here is the standard ordering used in `LandingPage.tsx`:

```tsx
<Navbar logo="Prism" links={navLinks} ctaLabel="Get Started" ctaHref="#pricing" />
<Hero badge="Now in Public Beta" title="Ship faster with" gradientText="the modern dev platform" subtitle="..." primaryCta="Start Building Free" secondaryCta="See It in Action" />
<LogoCloud title="Trusted by teams at" logos={logos} />
<FeatureGrid badge="Features" title="Everything you need to ship" subtitle="..." features={features} columns={3} />
<Stats stats={stats} variant="cards" />
<Testimonials badge="Testimonials" title="Loved by developers" subtitle="..." testimonials={testimonials} />
<PricingTable badge="Pricing" title="Simple, transparent pricing" subtitle="..." plans={plans} />
<CTABanner title="Ready to build something amazing?" subtitle="..." primaryCta="Get Started for Free" secondaryCta="Talk to Sales" />
<FAQ badge="FAQ" title="Frequently asked questions" subtitle="..." items={faqItems} />
<Footer logo="Prism" description="..." columns={footerColumns} socialLinks={socialLinks} copyright="..." />
```

### Component Hierarchy

- **Section Components** (self-contained with Container): Hero, FeatureGrid, Stats, LogoCloud, Testimonials, PricingTable, CTABanner, FAQ, Footer, Navbar
- **Card Components** (used inside section components): FeatureCard, TestimonialCard, PricingCard
- **Primitive Components** (used across many components): Badge, Button, Container
