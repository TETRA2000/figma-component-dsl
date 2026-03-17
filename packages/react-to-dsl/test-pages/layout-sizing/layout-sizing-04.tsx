export default function layout_sizing_04() {
  return (
    <div data-testid="root" style={{ display: 'flex', flexDirection: 'row', gap: 8, padding: 16, backgroundColor: '#f5f5f5' }}>
        <div style={{ width: '100%', height: 40, backgroundColor: '#e74c3c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 12 }}>Full Width</span>
        </div>
        <div style={{ width: '100%', height: 40, backgroundColor: '#3498db', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 12 }}>Full Width</span>
        </div>
    </div>
  );
}
