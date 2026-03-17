export default function layout_sizing_02() {
  return (
    <div data-testid="root" style={{ display: 'flex', flexDirection: 'row', gap: 8, padding: 16, backgroundColor: '#f5f5f5' }}>
        <div style={{ flexGrow: 1, height: 50, backgroundColor: '#2ecc71', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 12 }}>Grow 1</span>
        </div>
        <div style={{ width: 100, height: 50, backgroundColor: '#e67e22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 12 }}>Fixed</span>
        </div>
    </div>
  );
}
