export default function cards_06() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#f5f5f5' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: 4, padding: 0, border: '1px solid #e0e0e0', overflow: 'hidden' }}>
          <div style={{ backgroundColor: '#e74c3c', height: 4, borderRadius: '4px 4px 0 0' }}>

          </div>
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#333' }}>Featured Card</h3>
            <p style={{ fontSize: 14, color: '#666', lineHeight: 1.5 }}>Card content with an accent top bar.</p>
          </div>
        </div>
    </div>
  );
}
