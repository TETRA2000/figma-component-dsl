function Badge({ label, color, textColor }: { label: string; color: string; textColor?: string }) {
  return (
    <div style={{ backgroundColor: color, color: textColor || '#fff', padding: '4px 12px', borderRadius: 9999, fontSize: 12, fontWeight: 600, display: 'inline-flex' }}>
      <span>{label}</span>
    </div>
  );
}

function Button({ children, color, textColor }: { children: React.ReactNode; color?: string; textColor?: string }) {
  return (
    <div style={{ backgroundColor: color || '#3498db', padding: '8px 16px', borderRadius: 4, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: textColor || '#fff', fontSize: 14, fontWeight: 600 }}>{children}</span>
    </div>
  );
}

export default function layout_horizontal_01() {
  return (
    <div data-testid="root" style={{ display: 'flex', flexDirection: 'row', gap: 0, justifyContent: 'flex-start', alignItems: 'stretch', padding: 16, backgroundColor: '#f5f5f5', minHeight: 120 }}>
        <Badge label="Alpha" color="#e74c3c" />
        <Button color="#3498db">Beta</Button>
        <Badge label="Gamma" color="#2ecc71" />
    </div>
  );
}
