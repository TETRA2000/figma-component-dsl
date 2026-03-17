function Badge({ label, color, textColor }: { label: string; color: string; textColor?: string }) {
  return (
    <div style={{ backgroundColor: color, color: textColor || '#fff', padding: '4px 12px', borderRadius: 9999, fontSize: 12, fontWeight: 600, display: 'inline-flex' }}>
      <span>{label}</span>
    </div>
  );
}

export default function spacing_padding_10() {
  return (
    <div data-testid="root" style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '12px 24px 12px 24px', backgroundColor: '#f0f0f0' }}>
        <Badge label="First" color="#e74c3c" />
        <Badge label="Second" color="#3498db" />
        <Badge label="Third" color="#2ecc71" />
    </div>
  );
}
