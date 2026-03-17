export default function layout_sizing_03() {
  return (
    <div data-testid="root" style={{ display: 'flex', flexDirection: 'row', gap: 8, padding: 16, backgroundColor: '#f5f5f5' }}>
        <div style={{ flexGrow: 1, height: 50, backgroundColor: '#9b59b6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 12 }}>Grow 1</span>
        </div>
        <div style={{ flexGrow: 2, height: 50, backgroundColor: '#1abc9c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 12 }}>Grow 2</span>
        </div>
    </div>
  );
}
