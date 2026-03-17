export default function typography_07() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#ffffff' }}>
        <p style={{ fontSize: 28, fontWeight: 700, color: '#8e44ad', textAlign: 'left' as const, lineHeight: 1.4 }}>The quick brown fox jumps over the lazy dog</p>
        <p style={{ fontSize: 24, fontWeight: 400, color: '#666666', marginTop: 8 }}>Secondary text with different styling</p>
    </div>
  );
}
