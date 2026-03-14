import { useState } from 'react';
import { AnalyticsShowcase } from './AnalyticsShowcase';
import { BankingShowcase } from './BankingShowcase';
import { PricingShowcase } from './PricingShowcase';

const tabs = [
  { key: 'analytics', label: 'Analytics Dashboard' },
  { key: 'banking', label: 'Banking App' },
  { key: 'pricing', label: 'SaaS Pricing' },
] as const;

type TabKey = (typeof tabs)[number]['key'];

export function DogfoodingGallery() {
  const [active, setActive] = useState<TabKey>('analytics');

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Tab bar */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          display: 'flex',
          gap: 0,
          background: '#1e1e2e',
          borderBottom: '1px solid #313244',
          padding: '0 24px',
        }}
      >
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            style={{
              padding: '14px 24px',
              fontSize: 14,
              fontWeight: active === t.key ? 600 : 400,
              color: active === t.key ? '#cdd6f4' : '#6c7086',
              background: 'transparent',
              border: 'none',
              borderBottom: active === t.key ? '2px solid #cba6f7' : '2px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      {active === 'analytics' && <AnalyticsShowcase />}
      {active === 'banking' && <BankingShowcase />}
      {active === 'pricing' && <PricingShowcase />}
    </div>
  );
}
