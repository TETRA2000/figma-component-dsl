import { StatCard } from '../../components/_generated/StatCard/StatCard';
import { ProgressBar } from '../../components/_generated/ProgressBar/ProgressBar';
import { MetricRow } from '../../components/_generated/MetricRow/MetricRow';
import { SectionHeader } from '../../components/_generated/SectionHeader/SectionHeader';

export function AnalyticsDashboardShowcase() {
  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', fontFamily: "'Inter', sans-serif", padding: 32 }}>
      {/* Dashboard header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ color: '#ffffff', fontSize: 28, fontWeight: 700, margin: 0 }}>Analytics Dashboard</h1>
        <p style={{ color: '#64748b', fontSize: 14, margin: '4px 0 0' }}>Real-time performance metrics</p>
      </div>

      {/* Stat cards row */}
      <SectionHeader title="Overview" subtitle="Last 30 days" />
      <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
        <StatCard label="Revenue" value="$48,250" change="+12.5%" positive />
        <StatCard label="Users" value="12,847" change="+8.2%" positive />
        <StatCard label="Orders" value="1,423" change="-2.1%" positive={false} />
        <StatCard label="Conversion" value="3.24%" change="+0.8%" positive />
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'flex', gap: 24 }}>
        {/* Progress bars section */}
        <div style={{ flex: 1, background: '#1e293b', borderRadius: 12, padding: 24 }}>
          <SectionHeader title="Targets" subtitle="Q1 2026" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <ProgressBar label="Sales Target" value={72} color="#3b82f6" />
            <ProgressBar label="New Users" value={89} color="#10b981" />
            <ProgressBar label="Engagement" value={45} color="#f59e0b" />
            <ProgressBar label="Retention" value={63} color="#8b5cf6" />
          </div>
        </div>

        {/* Metrics table section */}
        <div style={{ flex: 1, background: '#1e293b', borderRadius: 12, padding: 24 }}>
          <SectionHeader title="Key Metrics" subtitle="Updated now" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <MetricRow label="Active Users" value="2,847" trend="+5.3%" positive />
            <MetricRow label="Avg Session" value="4m 32s" trend="+12.1%" positive />
            <MetricRow label="Bounce Rate" value="34.2%" trend="-2.8%" positive={false} />
            <MetricRow label="Page Views" value="89,421" trend="+18.7%" positive />
            <MetricRow label="Revenue/User" value="$16.94" trend="+3.2%" positive />
          </div>
        </div>
      </div>
    </div>
  );
}
