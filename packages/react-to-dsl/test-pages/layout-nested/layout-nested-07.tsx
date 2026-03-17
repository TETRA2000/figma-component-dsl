function Badge({ label, color, textColor }: { label: string; color: string; textColor?: string }) {
  return (
    <div style={{ backgroundColor: color, color: textColor || '#fff', padding: '4px 12px', borderRadius: 9999, fontSize: 12, fontWeight: 600, display: 'inline-flex' }}>
      <span>{label}</span>
    </div>
  );
}

export default function layout_nested_07() {
  return (
    <div data-testid="root" style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 16, backgroundColor: '#f5f5f5' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 8, padding: 8, backgroundColor: '#eee', borderRadius: 4 }}>
            <Badge label="Item 1" color="#e74c3c" />
            <Badge label="Item 2" color="#3498db" />
            <Badge label="Item 3" color="#2ecc71" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 8, padding: 8, backgroundColor: '#eee', borderRadius: 4 }}>
            <Badge label="Item 4" color="#2ecc71" />
            <Badge label="Item 5" color="#f39c12" />
            <Badge label="Item 6" color="#9b59b6" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 8, padding: 8, backgroundColor: '#eee', borderRadius: 4 }}>
            <Badge label="Item 7" color="#9b59b6" />
            <Badge label="Item 8" color="#1abc9c" />
            <Badge label="Item 9" color="#e74c3c" />
        </div>
    </div>
  );
}
