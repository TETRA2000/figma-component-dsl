export default function typography_01() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#ffffff' }}>
        <p style={{ fontSize: 12, fontWeight: 400, color: '#333333', textAlign: 'left' as const, lineHeight: 1.2 }}>The quick brown fox jumps over the lazy dog</p>
    </div>
  );
}
