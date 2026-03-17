function Badge({ label, color, textColor }: { label: string; color: string; textColor?: string }) {
  return (
    <div style={{ backgroundColor: color, color: textColor || '#fff', padding: '4px 12px', borderRadius: 9999, fontSize: 12, fontWeight: 600, display: 'inline-flex' }}>
      <span>{label}</span>
    </div>
  );
}

export default function borders_strokes_05() {
  return (
    <div data-testid="root" style={{ padding: 16, backgroundColor: '#f5f5f5' }}>
        <div style={{ border: '2px solid #e67e22', padding: 24, backgroundColor: '#fff', borderRadius: 8 }}>
          <Badge label="Border: 2px" color="#3498db" />
          <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>Content inside bordered container</p>
        </div>
    </div>
  );
}
