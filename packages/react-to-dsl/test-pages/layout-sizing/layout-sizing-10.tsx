export default function layout_sizing_10() {
  return (
    <div data-testid="root" style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 16, backgroundColor: '#f5f5f5', height: 400 }}>
        <div style={{ height: 60, backgroundColor: '#3498db' }}>
        <span>Content</span>
        </div>
        <div style={{ flexGrow: 1, backgroundColor: '#2ecc71' }}>
        <span>Content</span>
        </div>
        <div style={{ height: 40, backgroundColor: '#e67e22' }}>
        <span>Content</span>
        </div>
    </div>
  );
}
