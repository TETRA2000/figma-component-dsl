export default function layout_horizontal_10() {
  return (
    <div data-testid="root" style={{ display: 'flex', flexDirection: 'row', gap: 12, justifyContent: 'flex-start', alignItems: 'stretch', padding: 16, backgroundColor: '#f5f5f5', minHeight: 120 }}>
        <div style={{ width: 40, height: 70, backgroundColor: '#e74c3c' }}>

        </div>
        <div style={{ width: 60, height: 43, backgroundColor: '#3498db' }}>

        </div>
        <div style={{ width: 80, height: 56, backgroundColor: '#2ecc71' }}>

        </div>
        <div style={{ width: 100, height: 69, backgroundColor: '#f39c12' }}>

        </div>
    </div>
  );
}
