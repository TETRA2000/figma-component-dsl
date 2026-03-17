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

function Card({ title, children, accentColor }: { title: string; children?: React.ReactNode; accentColor?: string }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: 8, padding: 20, border: '1px solid #e0e0e0', overflow: 'hidden' }}>
      <h3 style={{ fontSize: 18, fontWeight: 600, color: '#333', marginBottom: 8 }}>{title}</h3>
      {children}
      {accentColor && <div style={{ height: 3, backgroundColor: accentColor, marginTop: 12, borderRadius: 2 }} />}
    </div>
  );
}

function ListItem({ label, description }: { label: string; description?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '8px 0' }}>
      <div style={{ fontSize: 14, fontWeight: 500, color: '#333' }}>{label}</div>
      {description && <div style={{ fontSize: 12, color: '#666' }}>{description}</div>}
    </div>
  );
}

function Divider({ color }: { color?: string }) {
  return <div style={{ height: 1, backgroundColor: color || '#e0e0e0', width: '100%' }} />;
}

export default function combined_complex_13() {
  return (
    <div data-testid="root" style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24, backgroundColor: '#f5f5f5' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16, backgroundColor: '#fff', padding: 20, borderRadius: 8, border: '1px solid #e0e0e0' }}>
          <Avatar color="#9b59b6" size={64} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#333' }}>User 13</h2>
            <Badge label="Pro" color="#9b59b6" />
          </div>
        </div>
        <Card title="General">
          <ListItem label="Setting option" description="Description of this setting" />
          <Divider />
          <ListItem label="Another option" description="More details here" />
        </Card>
        <Card title="Notifications">
          <ListItem label="Setting option" description="Description of this setting" />
          <Divider />
          <ListItem label="Another option" description="More details here" />
        </Card>
    </div>
  );
}
