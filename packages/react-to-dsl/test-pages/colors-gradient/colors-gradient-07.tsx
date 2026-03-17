export default function colors_gradient_07() {
  return (
    <div data-testid="root" style={{ padding: 16, backgroundColor: '#f5f5f5' }}>
        <div style={{ background: 'linear-gradient(120deg, #84fab0, #8fd3f4)', padding: 32, borderRadius: 8 }}>
          <p style={{ color: '#fff', fontSize: 18, fontWeight: 600, textAlign: 'center' as const }}>Gradient background</p>
        </div>
    </div>
  );
}
