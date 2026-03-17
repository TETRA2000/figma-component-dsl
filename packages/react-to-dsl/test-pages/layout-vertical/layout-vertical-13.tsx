function Badge({ label, color, textColor }: { label: string; color: string; textColor?: string }) {
  return (
    <div style={{ backgroundColor: color, color: textColor || '#fff', padding: '4px 12px', borderRadius: 9999, fontSize: 12, fontWeight: 600, display: 'inline-flex' }}>
      <span>{label}</span>
    </div>
  );
}

export default function layout_vertical_13() {
  return (
    <div data-testid="root" style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center', padding: 16, backgroundColor: '#fafafa', minWidth: 200 }}>
        <Badge label="First" color="#1abc9c" />
        <Badge label="Second" color="#e67e22" />
        <Badge label="Third" color="#3498db" />
    </div>
  );
}
