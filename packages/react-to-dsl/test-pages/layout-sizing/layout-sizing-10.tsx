export default function layout_sizing_10() {
  return (
    <div data-testid="root" style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 16, backgroundColor: '#f5f5f5', height: 400 }}>
        <div style={{ height: 60, backgroundColor: '#3498db', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 12 }}>Fixed H</span>
        </div>
        <div style={{ flexGrow: 1, backgroundColor: '#2ecc71', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 12 }}>Grow</span>
        </div>
        <div style={{ height: 40, backgroundColor: '#e67e22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 12 }}>Fixed H</span>
        </div>
    </div>
  );
}
