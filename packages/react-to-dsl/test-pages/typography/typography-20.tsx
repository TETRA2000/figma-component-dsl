export default function typography_20() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#ffffff' }}>
        <p style={{ fontSize: 36, fontWeight: 500, color: '#27ae60', textAlign: 'right' as const, lineHeight: 1.6, letterSpacing: 1, textDecoration: 'underline' }}>Typography variant 20 — font size 36px, weight 500</p>
        <p style={{ fontSize: 32, fontWeight: 400, color: '#666666', marginTop: 8 }}>Secondary text with different styling</p>
    </div>
  );
}
