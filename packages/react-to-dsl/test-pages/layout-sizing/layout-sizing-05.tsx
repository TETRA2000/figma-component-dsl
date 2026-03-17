export default function layout_sizing_05() {
  return (
    <div data-testid="root" style={{ display: 'flex', flexDirection: 'row', gap: 8, padding: 16, backgroundColor: '#f5f5f5' }}>
        <div style={{ width: 80, height: 100, backgroundColor: '#2ecc71' }}>
        <span>Content</span>
        </div>
        <div style={{ width: 80, height: 60, backgroundColor: '#e67e22' }}>
        <span>Content</span>
        </div>
    </div>
  );
}
