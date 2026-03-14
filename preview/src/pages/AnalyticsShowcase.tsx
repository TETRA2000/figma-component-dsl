import { StatCard } from '../components/StatCard/StatCard';
import { ProgressBar } from '../components/ProgressBar/ProgressBar';
import { MetricRow } from '../components/MetricRow/MetricRow';

const stats = [
  { label: 'Total Revenue', value: '$48,290', change: '12.5%', trend: 'up' as const },
  { label: 'Active Users', value: '2,847', change: '8.1%', trend: 'up' as const },
  { label: 'Bounce Rate', value: '24.3%', change: '-3.2%', trend: 'down' as const },
  { label: 'Avg Session', value: '4m 32s', change: '0%', trend: 'flat' as const },
];

const progress = [
  { label: 'Storage Used', value: 72, max: 100, color: 'blue' as const },
  { label: 'API Calls', value: 8450, max: 10000, color: 'emerald' as const },
  { label: 'Bandwidth', value: 890, max: 1000, color: 'amber' as const },
];

const metrics = [
  { label: 'Conversion Rate', value: '3.24%', subtext: 'vs 2.8% last month' },
  { label: 'Avg Order Value', value: '$67.50', subtext: '+$4.20' },
  { label: 'Cart Abandonment', value: '18.7%', subtext: '-2.1%' },
  { label: 'Page Load Time', value: '1.2s', subtext: 'P95' },
  { label: 'Error Rate', value: '0.03%', disabled: true },
];

export function AnalyticsShowcase() {
  return (
    <div style={{ maxWidth: 1440, margin: '0 auto', background: '#0f172a', minHeight: '100vh', padding: '48px 64px' }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#ffffff', margin: 0 }}>Dashboard</h1>
        <p style={{ fontSize: 14, color: '#64748b', margin: '8px 0 0' }}>Overview of key metrics</p>
      </div>

      {/* Stat Cards Row */}
      <div style={{ display: 'flex', gap: 20, marginBottom: 40 }}>
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Two Column Layout */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 40 }}>
        {/* Progress Bars */}
        <div style={{ flex: 1, padding: 24, borderRadius: 12, background: '#1e293b', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#ffffff', margin: 0 }}>Resource Usage</h2>
          {progress.map((p) => (
            <ProgressBar key={p.label} {...p} />
          ))}
        </div>

        {/* Chart placeholder */}
        <div style={{ flex: 1, padding: 24, borderRadius: 12, background: '#1e293b', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#ffffff', margin: 0 }}>Revenue Trend</h2>
          {/* Simple bar chart */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 160, padding: '0 8px' }}>
            {[40, 65, 55, 80, 70, 90, 85].map((h, i) => (
              <div key={i} style={{
                flex: 1,
                height: `${h}%`,
                borderRadius: '4px 4px 0 0',
                background: `linear-gradient(180deg, #3b82f6, #1e40af)`,
                opacity: i === 6 ? 1 : 0.7,
              }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 8px' }}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
              <span key={d} style={{ fontSize: 11, color: '#64748b' }}>{d}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Metric Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: '#ffffff', margin: '0 0 12px' }}>Key Metrics</h2>
        {metrics.map((m) => (
          <MetricRow key={m.label} {...m} />
        ))}
      </div>
    </div>
  );
}
