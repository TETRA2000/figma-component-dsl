export default function layout_sizing_01() {
  return (
    <div data-testid="root" style={{ display: 'flex', flexDirection: 'row', gap: 8, padding: 16, backgroundColor: '#f5f5f5' }}>
        <div style={{ width: 100, height: 50, backgroundColor: '#e74c3c' }}>
        <span>Content</span>
        </div>
        <div style={{ width: 200, height: 50, backgroundColor: '#3498db' }}>
        <span>Content</span>
        </div>
    </div>
  );
}
