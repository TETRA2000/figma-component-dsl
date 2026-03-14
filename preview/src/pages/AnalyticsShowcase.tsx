import { StatCard } from '../components/StatCard/StatCard';
import { ProgressBar } from '../components/ProgressBar/ProgressBar';
import { MetricRow } from '../components/MetricRow/MetricRow';

export function AnalyticsShowcase() {
  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', padding: 48, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        {/* Header */}
        <h1 style={{ color: '#ffffff', fontSize: 28, fontWeight: 700, margin: '0 0 8px 0' }}>
          Dashboard Overview
        </h1>
        <p style={{ color: '#64748b', fontSize: 14, margin: '0 0 32px 0' }}>
          Real-time analytics for your platform
        </p>

        {/* Stat Cards Row */}
        <div style={{ display: 'flex', gap: 24, marginBottom: 40 }}>
          <StatCard label="Total Revenue" value="$48.2K" change="+12.5%" trend="up" accentColor="#3b82f6" />
          <StatCard label="Active Users" value="2,847" change="+8.1%" trend="up" accentColor="#10b981" />
          <StatCard label="Bounce Rate" value="24.3%" change="-3.2%" trend="down" accentColor="#f59e0b" />
          <StatCard label="Avg. Session" value="4m 32s" change="+1.8%" trend="up" accentColor="#8b5cf6" />
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'flex', gap: 24 }}>
          {/* Progress Section */}
          <div style={{ flex: 1, background: '#1e293b', borderRadius: 12, padding: 24 }}>
            <h2 style={{ color: '#ffffff', fontSize: 16, fontWeight: 600, margin: '0 0 24px 0' }}>
              Goals Progress
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <ProgressBar label="Revenue Target" value={72} color="#3b82f6" />
              <ProgressBar label="User Acquisition" value={89} color="#10b981" />
              <ProgressBar label="Engagement Score" value={45} color="#f59e0b" />
              <ProgressBar label="Retention Rate" value={61} color="#8b5cf6" />
            </div>
          </div>

          {/* Metrics Section */}
          <div style={{ flex: 1, background: '#1e293b', borderRadius: 12, padding: 24 }}>
            <h2 style={{ color: '#ffffff', fontSize: 16, fontWeight: 600, margin: '0 0 16px 0' }}>
              Top Channels
            </h2>
            <MetricRow label="Organic Search" value="12,847" subValue="38%" dotColor="#3b82f6" />
            <MetricRow label="Direct Traffic" value="8,421" subValue="25%" dotColor="#10b981" />
            <MetricRow label="Social Media" value="6,053" subValue="18%" dotColor="#f59e0b" />
            <MetricRow label="Email Campaign" value="4,192" subValue="12%" dotColor="#8b5cf6" />
            <MetricRow label="Referral" value="2,380" subValue="7%" dotColor="#ec4899" />
          </div>
        </div>
      </div>
    </div>
  );
}
