export default function cards_10() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#f5f5f5' }}>
        <div style={{ backgroundColor: '#f0f7ff', borderRadius: 8, padding: 20, border: '1px solid #e0e0e0' }}>
          <div style={{ backgroundColor: '#9b59b6', padding: 12, borderRadius: '8px 8px 0 0', margin: '-20px -20px 16px -20px' }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>Featured Card</h3>
          </div>
          <p style={{ fontSize: 14, color: '#666', lineHeight: 1.5 }}>Card content with an accent header section.</p>
        </div>
    </div>
  );
}
