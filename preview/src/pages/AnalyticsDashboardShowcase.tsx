import { MetricCard } from '@/components/MetricCard/MetricCard';
import { MiniChart } from '@/components/MiniChart/MiniChart';
import { DataTable } from '@/components/DataTable/DataTable';

export function AnalyticsDashboardShowcase() {
  return (
    <div style={{
      background: '#f9fafb',
      minHeight: '100vh',
      padding: '32px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      maxWidth: '960px',
      margin: '0 auto',
    }}>
      {/* Header */}
      <h1 style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '28px',
        fontWeight: 700,
        color: '#111827',
        margin: 0,
      }}>
        Analytics Dashboard
      </h1>

      {/* Metric Cards Row */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <MetricCard label="Revenue" value="$48.2K" change="12.5%" positive accentColor="#6366f1" />
        <MetricCard label="Users" value="2,847" change="8.1%" positive accentColor="#10b981" />
        <MetricCard label="Bounce Rate" value="24.3%" change="-2.4%" positive={false} accentColor="#ef4444" />
      </div>

      {/* Charts Row */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <MiniChart
          title="Weekly Revenue"
          bars={[42, 68, 55, 80, 73, 95, 62]}
          barColor="#6366f1"
        />
        <MiniChart
          title="New Users"
          bars={[30, 45, 60, 38, 72, 55, 88]}
          barColor="#10b981"
        />
      </div>

      {/* Data Table */}
      <DataTable
        title="Revenue by Channel"
        rows={[
          { name: 'Direct', value: '$12,400', trend: '+12.5%', status: 'up' },
          { name: 'Organic Search', value: '$8,200', trend: '+5.3%', status: 'up' },
          { name: 'Referral', value: '$6,100', trend: '-3.2%', status: 'down' },
          { name: 'Social Media', value: '$4,800', trend: '+18.7%', status: 'up' },
          { name: 'Email', value: '$3,200', trend: '0.0%', status: 'flat' },
        ]}
      />
    </div>
  );
}
