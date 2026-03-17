export default function typography_16() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#ffffff' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#1a1a1a', textAlign: 'right' as const, lineHeight: 1.2, letterSpacing: 1 }}>Typography variant 16 — font size 12px, weight 700</p>
        <p style={{ fontSize: 12, fontWeight: 400, color: '#666666', marginTop: 8 }}>Secondary text with different styling</p>
    </div>
  );
}
