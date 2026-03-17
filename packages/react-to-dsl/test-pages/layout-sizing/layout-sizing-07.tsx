export default function layout_sizing_07() {
  return (
    <div data-testid="root" style={{ display: 'flex', flexDirection: 'row', gap: 8, padding: 16, backgroundColor: '#f5f5f5' }}>
        <div style={{ minWidth: 100, height: 50, backgroundColor: '#e74c3c', flexGrow: 1 }}>
        <span>Content</span>
        </div>
        <div style={{ minWidth: 150, height: 50, backgroundColor: '#3498db', flexGrow: 1 }}>
        <span>Content</span>
        </div>
    </div>
  );
}
