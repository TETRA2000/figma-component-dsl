export default function layout_vertical_01() {
  return (
    <div data-testid="root" style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'stretch', padding: 16, backgroundColor: '#fafafa', minWidth: 200 }}>
        <div style={{ height: 30, backgroundColor: '#1abc9c' }}>

        </div>
        <div style={{ height: 40, backgroundColor: '#e67e22' }}>

        </div>
        <div style={{ height: 50, backgroundColor: '#3498db' }}>

        </div>
    </div>
  );
}
