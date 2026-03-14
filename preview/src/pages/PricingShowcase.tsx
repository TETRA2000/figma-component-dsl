import { PricingTier } from '../components/PricingTier/PricingTier';

export function PricingShowcase() {
  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh', padding: '64px 48px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center' as const, marginBottom: 48 }}>
          <h1 style={{ color: '#111827', fontSize: 36, fontWeight: 700, margin: '0 0 12px 0' }}>
            Simple, transparent pricing
          </h1>
          <p style={{ color: '#6b7280', fontSize: 16, margin: 0 }}>
            Choose the plan that fits your needs. Upgrade or downgrade at any time.
          </p>
        </div>

        {/* Pricing Cards */}
        <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
          <PricingTier
            name="Starter"
            price="$9"
            features={[
              '5 team members',
              '10GB storage',
              'Basic analytics',
              'Email support',
            ]}
            ctaLabel="Start Free Trial"
          />
          <PricingTier
            name="Professional"
            price="$29"
            highlighted
            features={[
              '25 team members',
              '100GB storage',
              'Advanced analytics',
              'Priority support',
              'Custom integrations',
              'API access',
            ]}
            ctaLabel="Get Started"
          />
          <PricingTier
            name="Enterprise"
            price="$79"
            features={[
              'Unlimited members',
              '1TB storage',
              'Custom analytics',
              'Dedicated support',
              'SSO & SAML',
              'SLA guarantee',
            ]}
            ctaLabel="Contact Sales"
          />
        </div>
      </div>
    </div>
  );
}
