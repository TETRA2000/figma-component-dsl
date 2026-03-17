export default function lists_grids_04() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#f5f5f5' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: 8, padding: 16 }}>
            <div style={{ width: 40, height: 40, backgroundColor: '#e74c3c', borderRadius: 20, marginBottom: 8 }}>

            </div>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>Item 1</p>
            <p style={{ fontSize: 12, color: '#999', marginTop: 4 }}>Description text</p>
          </div>
          <div style={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: 8, padding: 16 }}>
            <div style={{ width: 40, height: 40, backgroundColor: '#3498db', borderRadius: 20, marginBottom: 8 }}>

            </div>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>Item 2</p>
            <p style={{ fontSize: 12, color: '#999', marginTop: 4 }}>Description text</p>
          </div>
          <div style={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: 8, padding: 16 }}>
            <div style={{ width: 40, height: 40, backgroundColor: '#2ecc71', borderRadius: 20, marginBottom: 8 }}>

            </div>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>Item 3</p>
            <p style={{ fontSize: 12, color: '#999', marginTop: 4 }}>Description text</p>
          </div>
        </div>
    </div>
  );
}
