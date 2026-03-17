function NavItem({ label, active, color }: { label: string; active?: boolean; color?: string }) {
  return (
    <span style={{ color: color || '#333', fontSize: 14, fontWeight: active ? 600 : 400, padding: '8px 12px', borderBottom: active ? '2px solid currentColor' : 'none' }}>
      {label}
    </span>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#333' }}>{title}</h2>
      {subtitle && <p style={{ fontSize: 14, color: '#666' }}>{subtitle}</p>}
    </div>
  );
}

function Stat({ value, label, color }: { value: string; label: string; color?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <span style={{ fontSize: 24, fontWeight: 700, color: color || '#333' }}>{value}</span>
      <span style={{ fontSize: 12, color: '#999' }}>{label}</span>
    </div>
  );
}

function Card({ title, children, accentColor }: { title: string; children?: React.ReactNode; accentColor?: string }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: 8, padding: 20, border: '1px solid #e0e0e0', overflow: 'hidden' }}>
      <h3 style={{ fontSize: 18, fontWeight: 600, color: '#333', marginBottom: 8 }}>{title}</h3>
      {children}
      {accentColor && <div style={{ height: 3, backgroundColor: accentColor, marginTop: 12, borderRadius: 2 }} />}
    </div>
  );
}

function ProgressBar({ percent, color }: { percent: number; color?: string }) {
  return (
    <div style={{ width: '100%', height: 8, backgroundColor: '#eee', borderRadius: 4, overflow: 'hidden' }}>
      <div style={{ width: percent + '%', height: '100%', backgroundColor: color || '#3498db', borderRadius: 4 }} />
    </div>
  );
}

function Badge({ label, color, textColor }: { label: string; color: string; textColor?: string }) {
  return (
    <div style={{ backgroundColor: color, color: textColor || '#fff', padding: '4px 12px', borderRadius: 9999, fontSize: 12, fontWeight: 600, display: 'inline-flex' }}>
      <span>{label}</span>
    </div>
  );
}

export default function combined_complex_05() {
  return (
    <div data-testid="root" style={{ display: 'flex', flexDirection: 'row', minHeight: 400, backgroundColor: '#f5f5f5' }}>
        <div style={{ width: 200, backgroundColor: '#2c3e50', padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Dashboard</h3>
            <NavItem label="Overview" active={true} color="#fff" />
            <NavItem label="Analytics" active={false} color="#fff" />
            <NavItem label="Settings" active={false} color="#fff" />
        </div>
        <div style={{ flexGrow: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SectionHeader title="Overview" subtitle="Dashboard stats" />
          <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
              <Stat value="1234" label="Users" color="#9b59b6" />
              <Stat value="2468" label="Revenue" color="#9b59b6" />
              <Stat value="3702" label="Orders" color="#9b59b6" />
          </div>
          <Card title="Recent Activity" accentColor="#9b59b6">
            <ProgressBar percent={65} color="#9b59b6" />
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <Badge label="Active" color="#2ecc71" />
              <Badge label="In Progress" color="#f39c12" />
            </div>
          </Card>
        </div>
    </div>
  );
}
