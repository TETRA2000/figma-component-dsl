function Badge({ label, color, textColor }: { label: string; color: string; textColor?: string }) {
  return (
    <div style={{ backgroundColor: color, color: textColor || '#fff', padding: '4px 12px', borderRadius: 9999, fontSize: 12, fontWeight: 600, display: 'inline-flex' }}>
      <span>{label}</span>
    </div>
  );
}

export default function clip_content_02() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#f5f5f5' }}>
        <div style={{ width: 200, height: 150, overflow: 'hidden', backgroundColor: '#ecf0f1', border: '1px solid #bdc3c7', borderRadius: 8 }}>
          <div style={{ width: 160, height: 160, backgroundColor: '#3498db', borderRadius: 4 }}>
            <Badge label="Overflowing" color="#e74c3c" />
          </div>
        </div>
    </div>
  );
}
