export default function cards_01() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#f5f5f5' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: 4, padding: 16, border: '1px solid #e0e0e0', overflow: 'hidden' }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: '#333', marginBottom: 8 }}>Card Title 1</h3>
          <p style={{ fontSize: 14, color: '#666', lineHeight: 1.5 }}>This is a simple card with a title and body text. It demonstrates basic card layout patterns.</p>
        </div>
    </div>
  );
}
