export default function typography_18() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#ffffff' }}>
        <p style={{ fontSize: 20, fontWeight: 600, color: '#2c3e50', textAlign: 'left' as const, lineHeight: 1.8 }}>Typography variant 18 — font size 20px, weight 600</p>
        <p style={{ fontSize: 16, fontWeight: 400, color: '#666666', marginTop: 8 }}>Secondary text with different styling</p>
    </div>
  );
}
