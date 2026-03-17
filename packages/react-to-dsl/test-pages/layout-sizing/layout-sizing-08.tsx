export default function layout_sizing_08() {
  return (
    <div data-testid="root" style={{ display: 'flex', flexDirection: 'row', gap: 8, padding: 16, backgroundColor: '#f5f5f5' }}>
        <div style={{ maxWidth: 200, height: 50, backgroundColor: '#2ecc71', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 12 }}>Max 200</span>
        </div>
        <div style={{ height: 50, backgroundColor: '#e67e22', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 12 }}>Fill</span>
        </div>
    </div>
  );
}
