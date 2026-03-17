export default function cards_12() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#f5f5f5' }}>
        <div style={{ backgroundColor: '#fafafa', borderRadius: 8, padding: 20, border: '1px solid #e0e0e0', overflow: 'hidden' }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: '#333', marginBottom: 8 }}>Card 12</h3>
          <p style={{ fontSize: 14, color: '#666', lineHeight: 1.5, marginBottom: 16 }}>Card with action buttons at the bottom.</p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <div style={{ backgroundColor: '#3498db', padding: '8px 16px', borderRadius: 4 }}>
              <span style={{ color: '#fff', fontSize: 14 }}>Action</span>
            </div>
            <div style={{ backgroundColor: '#eee', padding: '8px 16px', borderRadius: 4 }}>
              <span style={{ color: '#333', fontSize: 14 }}>Cancel</span>
            </div>
          </div>
        </div>
    </div>
  );
}
