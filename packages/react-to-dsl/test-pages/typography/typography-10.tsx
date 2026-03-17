export default function typography_10() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#ffffff' }}>
        <p style={{ fontSize: 40, fontWeight: 500, color: '#16a085', textAlign: 'left' as const, lineHeight: 1.8, textDecoration: 'underline' }}>The quick brown fox jumps over the lazy dog</p>
        <p style={{ fontSize: 36, fontWeight: 400, color: '#666666', marginTop: 8 }}>Secondary text with different styling</p>
    </div>
  );
}
