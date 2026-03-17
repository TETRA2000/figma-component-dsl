export default function layout_horizontal_02() {
  return (
    <div data-testid="root" style={{ display: 'flex', flexDirection: 'row', gap: 4, justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: '#f5f5f5', minHeight: 120 }}>
        <div style={{ width: 40, height: 54, backgroundColor: '#e74c3c' }}>

        </div>
        <div style={{ width: 60, height: 67, backgroundColor: '#3498db' }}>

        </div>
        <div style={{ width: 80, height: 40, backgroundColor: '#2ecc71' }}>

        </div>
        <div style={{ width: 100, height: 53, backgroundColor: '#f39c12' }}>

        </div>
    </div>
  );
}
