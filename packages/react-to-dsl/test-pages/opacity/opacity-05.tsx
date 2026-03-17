export default function opacity_05() {
  return (
    <div data-testid="root" style={{ padding: 16, backgroundColor: '#f5f5f5' }}>
        <div style={{ opacity: 0.5, backgroundColor: '#3498db', padding: 24, borderRadius: 8 }}>
          <p style={{ color: '#fff', fontSize: 16 }}>Opacity: 0.5</p>
        </div>
        <div style={{ backgroundColor: '#e74c3c', padding: 24, borderRadius: 8, marginTop: 12 }}>
          <p style={{ color: '#fff', fontSize: 16 }}>Full opacity reference</p>
        </div>
    </div>
  );
}
