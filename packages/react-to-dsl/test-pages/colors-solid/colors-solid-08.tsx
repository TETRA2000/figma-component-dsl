function Badge({ label, color, textColor }: { label: string; color: string; textColor?: string }) {
  return (
    <div style={{ backgroundColor: color, color: textColor || '#fff', padding: '4px 12px', borderRadius: 9999, fontSize: 12, fontWeight: 600, display: 'inline-flex' }}>
      <span>{label}</span>
    </div>
  );
}

export default function colors_solid_08() {
  return (
    <div data-testid="root" style={{ padding: 16, backgroundColor: '#fafafa', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ backgroundColor: '#e74c3c', padding: 16, borderRadius: 8 }}>
          <Badge label="#e74c3c" color="#fff" textColor="#333" />
        </div>
        <div style={{ backgroundColor: '#3498db', padding: 16, borderRadius: 8 }}>
          <Badge label="#3498db" color="#333" textColor="#fff" />
        </div>
        <div style={{ backgroundColor: '#2ecc71', padding: 16, borderRadius: 8 }}>
          <Badge label="#2ecc71" color="#333" textColor="#fff" />
        </div>
    </div>
  );
}
