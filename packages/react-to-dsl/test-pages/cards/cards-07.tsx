export default function cards_07() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#f5f5f5' }}>
        <div style={{ backgroundColor: '#fafafa', borderRadius: 8, padding: 0, border: '1px solid #e0e0e0', overflow: 'hidden' }}>
          <div style={{ backgroundColor: '#3498db', height: 4, borderRadius: '8px 8px 0 0' }}>

          </div>
          <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#333' }}>Featured Card</h3>
            <p style={{ fontSize: 14, color: '#666', lineHeight: 1.5 }}>Card content with an accent top bar.</p>
          </div>
        </div>
    </div>
  );
}
