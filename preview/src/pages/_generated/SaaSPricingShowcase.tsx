import { useState } from 'react';
import { PricingTier } from '../../components/_generated/PricingTier/PricingTier';
import { FeatureCheckRow } from '../../components/_generated/FeatureCheckRow/FeatureCheckRow';
import { PricingToggle } from '../../components/_generated/PricingToggle/PricingToggle';

export function SaaSPricingShowcase() {
  const [isAnnual, setIsAnnual] = useState(false);

  const monthly = { starter: 9, pro: 29, enterprise: 99 };
  const annual = { starter: 7, pro: 23, enterprise: 79 };
  const prices = isAnnual ? annual : monthly;

  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #f9fafb 0%, #ffffff 40%)',
        minHeight: '100vh',
        fontFamily: "'Inter', sans-serif",
        padding: '64px 32px',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h1
          style={{
            fontSize: 40,
            fontWeight: 800,
            color: '#111827',
            margin: 0,
            letterSpacing: '-0.025em',
          }}
        >
          Choose Your Plan
        </h1>
        <p
          style={{
            fontSize: 18,
            color: '#6b7280',
            margin: '12px 0 0',
            fontWeight: 400,
          }}
        >
          Start free, scale as you grow. No hidden fees.
        </p>
      </div>

      {/* Toggle */}
      <div style={{ marginBottom: 48 }}>
        <PricingToggle isAnnual={isAnnual} onToggle={setIsAnnual} />
      </div>

      {/* Pricing Tiers */}
      <div
        style={{
          display: 'flex',
          gap: 24,
          maxWidth: 1060,
          margin: '0 auto',
          alignItems: 'stretch',
        }}
      >
        {/* Starter */}
        <PricingTier
          tierName="Starter"
          price={`$${prices.starter}`}
          period="/mo"
          description="For individuals and side projects"
          ctaLabel="Start Free Trial"
        >
          <FeatureCheckRow label="Up to 3 projects" included />
          <FeatureCheckRow label="1 GB storage" included />
          <FeatureCheckRow label="Basic analytics" included />
          <FeatureCheckRow label="Email support" included />
          <FeatureCheckRow label="Custom domain" included={false} />
          <FeatureCheckRow label="Team collaboration" included={false} />
        </PricingTier>

        {/* Pro (highlighted) */}
        <PricingTier
          tierName="Pro"
          price={`$${prices.pro}`}
          period="/mo"
          description="Best for growing teams"
          highlighted
          ctaLabel="Get Started"
        >
          <FeatureCheckRow label="Unlimited projects" included />
          <FeatureCheckRow label="50 GB storage" included />
          <FeatureCheckRow label="Advanced analytics" included />
          <FeatureCheckRow label="Priority support" included />
          <FeatureCheckRow label="Custom domain" included />
          <FeatureCheckRow label="Team collaboration" included />
        </PricingTier>

        {/* Enterprise */}
        <PricingTier
          tierName="Enterprise"
          price={`$${prices.enterprise}`}
          period="/mo"
          description="For large-scale organizations"
          ctaLabel="Contact Sales"
        >
          <FeatureCheckRow label="Unlimited everything" included />
          <FeatureCheckRow label="1 TB storage" included />
          <FeatureCheckRow label="Custom analytics" included />
          <FeatureCheckRow label="Dedicated support" included />
          <FeatureCheckRow label="SSO & SAML" included />
          <FeatureCheckRow label="SLA guarantee" included />
        </PricingTier>
      </div>
    </div>
  );
}
