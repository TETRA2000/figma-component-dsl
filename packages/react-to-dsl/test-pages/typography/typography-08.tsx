export default function typography_08() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#ffffff' }}>
        <p style={{ fontSize: 32, fontWeight: 700, color: '#c0392b', textAlign: 'center' as const, lineHeight: 1.5, letterSpacing: 1 }}>The quick brown fox jumps over the lazy dog</p>
        <p style={{ fontSize: 28, fontWeight: 400, color: '#666666', marginTop: 8 }}>Secondary text with different styling</p>
    </div>
  );
}
