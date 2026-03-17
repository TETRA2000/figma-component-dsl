export default function layout_horizontal_01() {
  return (
    <div data-testid="root" style={{ display: 'flex', flexDirection: 'row', gap: 0, justifyContent: 'flex-start', alignItems: 'stretch', padding: 16, backgroundColor: '#f5f5f5', minHeight: 120 }}>
        <div style={{ width: 40, height: 47, backgroundColor: '#e74c3c' }}>

        </div>
        <div style={{ width: 60, height: 60, backgroundColor: '#3498db' }}>

        </div>
        <div style={{ width: 80, height: 73, backgroundColor: '#2ecc71' }}>

        </div>
    </div>
  );
}
