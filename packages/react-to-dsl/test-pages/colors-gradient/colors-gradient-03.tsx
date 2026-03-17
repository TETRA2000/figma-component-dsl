export default function colors_gradient_03() {
  return (
    <div data-testid="root" style={{ padding: 16, backgroundColor: '#f5f5f5' }}>
        <div style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', padding: 32, borderRadius: 8 }}>
          <p style={{ color: '#fff', fontSize: 18, fontWeight: 600, textAlign: 'center' as const }}>Gradient background</p>
        </div>
    </div>
  );
}
