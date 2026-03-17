export default function combined_complex_01() {
  return (
    <div data-testid="root" style={{ display: 'flex', flexDirection: 'row', minHeight: 400, backgroundColor: '#f5f5f5' }}>
        <div style={{ width: 200, backgroundColor: '#2c3e50', padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Dashboard</h3>
          <div style={{ padding: '8px 12px', borderRadius: 4, backgroundColor: '#e74c3c' }}>
            <span style={{ color: '#fff', fontSize: 14 }}>Overview</span>
          </div>
          <div style={{ padding: '8px 12px', borderRadius: 4, backgroundColor: 'transparent' }}>
            <span style={{ color: '#fff', fontSize: 14 }}>Analytics</span>
          </div>
          <div style={{ padding: '8px 12px', borderRadius: 4, backgroundColor: 'transparent' }}>
            <span style={{ color: '#fff', fontSize: 14 }}>Settings</span>
          </div>
        </div>
        <div style={{ flexGrow: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#333' }}>Overview</h2>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
            <div style={{ flexGrow: 1, backgroundColor: '#fff', borderRadius: 8, padding: 16, border: '1px solid #e0e0e0' }}>
              <p style={{ fontSize: 12, color: '#999' }}>Users</p>
              <p style={{ fontSize: 24, fontWeight: 700, color: '#e74c3c', marginTop: 4 }}>1234</p>
            </div>
            <div style={{ flexGrow: 1, backgroundColor: '#fff', borderRadius: 8, padding: 16, border: '1px solid #e0e0e0' }}>
              <p style={{ fontSize: 12, color: '#999' }}>Revenue</p>
              <p style={{ fontSize: 24, fontWeight: 700, color: '#e74c3c', marginTop: 4 }}>2468</p>
            </div>
            <div style={{ flexGrow: 1, backgroundColor: '#fff', borderRadius: 8, padding: 16, border: '1px solid #e0e0e0' }}>
              <p style={{ fontSize: 12, color: '#999' }}>Orders</p>
              <p style={{ fontSize: 24, fontWeight: 700, color: '#e74c3c', marginTop: 4 }}>3702</p>
            </div>
          </div>
        </div>
    </div>
  );
}
