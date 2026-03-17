export default function typography_06() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#ffffff' }}>
        <p style={{ fontSize: 24, fontWeight: 600, color: '#27ae60', textAlign: 'center' as const, lineHeight: 1.2 }}>The quick brown fox jumps over the lazy dog</p>
        <p style={{ fontSize: 20, fontWeight: 400, color: '#666666', marginTop: 8 }}>Secondary text with different styling</p>
    </div>
  );
}
