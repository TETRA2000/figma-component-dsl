function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#333' }}>{title}</h2>
      {subtitle && <p style={{ fontSize: 14, color: '#666' }}>{subtitle}</p>}
    </div>
  );
}

function Avatar({ color, size }: { color: string; size?: number }) {
  const s = size || 40;
  return <div style={{ width: s, height: s, borderRadius: s / 2, backgroundColor: color }} />;
}

function Badge({ label, color, textColor }: { label: string; color: string; textColor?: string }) {
  return (
    <div style={{ backgroundColor: color, color: textColor || '#fff', padding: '4px 12px', borderRadius: 9999, fontSize: 12, fontWeight: 600, display: 'inline-flex' }}>
      <span>{label}</span>
    </div>
  );
}

export default function lists_grids_09() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <SectionHeader title="List 9" subtitle="Grid layout" />
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Avatar color="#e74c3c" />
            <span style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>Item 1</span>
            <Badge label="Tag" color="#e74c3c" />
          </div>
          <div style={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Avatar color="#3498db" />
            <span style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>Item 2</span>
            <Badge label="Tag" color="#3498db" />
          </div>
          <div style={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Avatar color="#2ecc71" />
            <span style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>Item 3</span>
            <Badge label="Tag" color="#2ecc71" />
          </div>
          <div style={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Avatar color="#f39c12" />
            <span style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>Item 4</span>
            <Badge label="Tag" color="#f39c12" />
          </div>
        </div>
    </div>
  );
}
