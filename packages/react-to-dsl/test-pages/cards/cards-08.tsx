export default function cards_08() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#f5f5f5' }}>
        <div style={{ backgroundColor: '#f8f9fa', borderRadius: 12, padding: 24, border: '1px solid #e0e0e0' }}>
          <div style={{ backgroundColor: '#2ecc71', padding: 12, borderRadius: '12px 12px 0 0', margin: '-24px -24px 16px -24px' }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>Featured Card</h3>
          </div>
          <p style={{ fontSize: 14, color: '#666', lineHeight: 1.5 }}>Card content with an accent header section.</p>
        </div>
    </div>
  );
}
