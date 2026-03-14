import { PricingTier } from '../components/PricingTier/PricingTier';

const starterFeatures = ['5 projects', '10 GB storage', 'Basic analytics', 'Email support'];
const proFeatures = ['Unlimited projects', '100 GB storage', 'Advanced analytics', 'Priority support', 'Custom domain'];
const enterpriseFeatures = ['Everything in Pro', 'Unlimited storage', 'Dedicated manager', 'SLA guarantee', '24/7 phone support'];

export function SaaSPricingShowcase() {
  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh', padding: 64, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: 40, fontWeight: 700, color: '#111827', margin: '0 0 12px 0' }}>
          Simple, transparent pricing
        </h1>
        <p style={{ fontSize: 18, color: '#6b7280', margin: '0 0 48px 0' }}>
          Choose the plan that fits your needs
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 24 }}>
          <PricingTier
            name="Starter"
            price="$9"
            features={starterFeatures}
            ctaLabel="Get Started"
          />
          <PricingTier
            name="Pro"
            price="$29"
            features={proFeatures}
            highlighted
            ctaLabel="Upgrade to Pro"
          />
          <PricingTier
            name="Enterprise"
            price="$99"
            features={enterpriseFeatures}
            ctaLabel="Contact Sales"
          />
        </div>
      </div>
    </div>
  );
}
