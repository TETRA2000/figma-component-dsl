export default function typography_12() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#ffffff' }}>
        <p style={{ fontSize: 16, fontWeight: 700, color: '#2c3e50', textAlign: 'right' as const, lineHeight: 1.5, letterSpacing: 2 }}>Typography variant 12 — font size 16px, weight 700</p>
        <p style={{ fontSize: 12, fontWeight: 400, color: '#666666', marginTop: 8 }}>Secondary text with different styling</p>
    </div>
  );
}
