export default function layout_horizontal_03() {
  return (
    <div data-testid="root" style={{ display: 'flex', flexDirection: 'row', gap: 8, justifyContent: 'flex-end', alignItems: 'flex-start', padding: 16, backgroundColor: '#f5f5f5', minHeight: 120 }}>
        <div style={{ width: 40, height: 61, backgroundColor: '#e74c3c' }}>

        </div>
        <div style={{ width: 60, height: 74, backgroundColor: '#3498db' }}>

        </div>
        <div style={{ width: 80, height: 47, backgroundColor: '#2ecc71' }}>

        </div>
        <div style={{ width: 100, height: 60, backgroundColor: '#f39c12' }}>

        </div>
        <div style={{ width: 120, height: 73, backgroundColor: '#9b59b6' }}>

        </div>
    </div>
  );
}
