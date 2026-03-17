function Badge({ label, color, textColor }: { label: string; color: string; textColor?: string }) {
  return (
    <div style={{ backgroundColor: color, color: textColor || '#fff', padding: '4px 12px', borderRadius: 9999, fontSize: 12, fontWeight: 600, display: 'inline-flex' }}>
      <span>{label}</span>
    </div>
  );
}

export default function colors_solid_04() {
  return (
    <div data-testid="root" style={{ padding: 16, backgroundColor: '#fafafa', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ backgroundColor: '#f39c12', padding: 16, borderRadius: 8 }}>
          <Badge label="#f39c12" color="#333" textColor="#fff" />
        </div>
        <div style={{ backgroundColor: '#e67e22', padding: 16, borderRadius: 8 }}>
          <Badge label="#e67e22" color="#333" textColor="#fff" />
        </div>
        <div style={{ backgroundColor: '#ffeaa7', padding: 16, borderRadius: 8 }}>
          <Badge label="#ffeaa7" color="#333" textColor="#fff" />
        </div>
    </div>
  );
}
