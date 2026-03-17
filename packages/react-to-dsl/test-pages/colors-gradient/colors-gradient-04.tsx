export default function colors_gradient_04() {
  return (
    <div data-testid="root" style={{ padding: 16, backgroundColor: '#f5f5f5' }}>
        <div style={{ background: 'linear-gradient(to right, #f093fb, #f5576c)', padding: 32, borderRadius: 8 }}>
          <p style={{ color: '#fff', fontSize: 18, fontWeight: 600, textAlign: 'center' as const }}>Gradient background</p>
        </div>
    </div>
  );
}
