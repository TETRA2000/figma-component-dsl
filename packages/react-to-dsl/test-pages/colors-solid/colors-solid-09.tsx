function Badge({ label, color, textColor }: { label: string; color: string; textColor?: string }) {
  return (
    <div style={{ backgroundColor: color, color: textColor || '#fff', padding: '4px 12px', borderRadius: 9999, fontSize: 12, fontWeight: 600, display: 'inline-flex' }}>
      <span>{label}</span>
    </div>
  );
}

export default function colors_solid_09() {
  return (
    <div data-testid="root" style={{ padding: 16, backgroundColor: '#fafafa', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ backgroundColor: '#f39c12', padding: 16, borderRadius: 8 }}>
          <Badge label="#f39c12" color="#333" textColor="#fff" />
        </div>
        <div style={{ backgroundColor: '#9b59b6', padding: 16, borderRadius: 8 }}>
          <Badge label="#9b59b6" color="#fff" textColor="#333" />
        </div>
        <div style={{ backgroundColor: '#1abc9c', padding: 16, borderRadius: 8 }}>
          <Badge label="#1abc9c" color="#333" textColor="#fff" />
        </div>
    </div>
  );
}
