export default function layout_sizing_06() {
  return (
    <div data-testid="root" style={{ display: 'flex', flexDirection: 'row', gap: 8, padding: 16, backgroundColor: '#f5f5f5' }}>
        <div style={{ padding: 16, backgroundColor: '#9b59b6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 12 }}>Hug</span>
        </div>
        <div style={{ padding: 24, backgroundColor: '#1abc9c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 12 }}>Hug</span>
        </div>
    </div>
  );
}
