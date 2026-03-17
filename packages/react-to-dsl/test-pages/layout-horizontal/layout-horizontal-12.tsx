export default function layout_horizontal_12() {
  return (
    <div data-testid="root" style={{ display: 'flex', flexDirection: 'row', gap: 20, justifyContent: 'space-between', alignItems: 'flex-start', padding: 16, backgroundColor: '#f5f5f5', minHeight: 120 }}>
        <div style={{ width: 40, height: 44, backgroundColor: '#e74c3c' }}>

        </div>
        <div style={{ width: 60, height: 57, backgroundColor: '#3498db' }}>

        </div>
    </div>
  );
}
