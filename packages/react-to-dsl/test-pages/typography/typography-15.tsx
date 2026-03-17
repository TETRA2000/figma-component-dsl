export default function typography_15() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#ffffff' }}>
        <p style={{ fontSize: 24, fontWeight: 600, color: '#3498db', textAlign: 'left' as const, lineHeight: 1.6, textDecoration: 'underline' }}>Typography variant 15 — font size 24px, weight 600</p>
        <p style={{ fontSize: 20, fontWeight: 400, color: '#666666', marginTop: 8 }}>Secondary text with different styling</p>
    </div>
  );
}
