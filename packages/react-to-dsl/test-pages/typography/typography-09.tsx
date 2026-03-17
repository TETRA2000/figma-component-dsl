export default function typography_09() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#ffffff' }}>
        <p style={{ fontSize: 36, fontWeight: 400, color: '#2980b9', textAlign: 'right' as const, lineHeight: 1.6 }}>The quick brown fox jumps over the lazy dog</p>
        <p style={{ fontSize: 32, fontWeight: 400, color: '#666666', marginTop: 8 }}>Secondary text with different styling</p>
    </div>
  );
}
