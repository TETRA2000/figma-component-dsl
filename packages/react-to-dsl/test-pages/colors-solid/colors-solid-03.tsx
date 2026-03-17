function Badge({ label, color, textColor }: { label: string; color: string; textColor?: string }) {
  return (
    <div style={{ backgroundColor: color, color: textColor || '#fff', padding: '4px 12px', borderRadius: 9999, fontSize: 12, fontWeight: 600, display: 'inline-flex' }}>
      <span>{label}</span>
    </div>
  );
}

export default function colors_solid_03() {
  return (
    <div data-testid="root" style={{ padding: 16, backgroundColor: '#fafafa', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ backgroundColor: '#2ecc71', padding: 16, borderRadius: 8 }}>
          <Badge label="#2ecc71" color="#333" textColor="#fff" />
        </div>
        <div style={{ backgroundColor: '#27ae60', padding: 16, borderRadius: 8 }}>
          <Badge label="#27ae60" color="#fff" textColor="#333" />
        </div>
        <div style={{ backgroundColor: '#55efc4', padding: 16, borderRadius: 8 }}>
          <Badge label="#55efc4" color="#333" textColor="#fff" />
        </div>
    </div>
  );
}
