export default function layout_sizing_09() {
  return (
    <div data-testid="root" style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 16, backgroundColor: '#f5f5f5', height: 400 }}>
        <div style={{ width: 100, height: 50, backgroundColor: '#9b59b6' }}>
        <span>Content</span>
        </div>
        <div style={{ flexGrow: 1, height: 50, backgroundColor: '#1abc9c' }}>
        <span>Content</span>
        </div>
        <div style={{ width: 80, height: 50, backgroundColor: '#e74c3c' }}>
        <span>Content</span>
        </div>
    </div>
  );
}
