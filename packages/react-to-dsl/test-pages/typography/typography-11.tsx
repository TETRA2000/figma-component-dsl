export default function typography_11() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#ffffff' }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: '#d35400', textAlign: 'center' as const, lineHeight: 1.3 }}>Typography variant 11 — font size 14px, weight 600</p>
        <p style={{ fontSize: 12, fontWeight: 400, color: '#666666', marginTop: 8 }}>Secondary text with different styling</p>
    </div>
  );
}
