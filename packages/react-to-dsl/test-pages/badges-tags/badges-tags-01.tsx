export default function badges_tags_01() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#fff' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          <div style={{ backgroundColor: '#e74c3c', padding: '4px 12px', borderRadius: 9999, display: 'inline-flex' }}>
            <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>New</span>
          </div>
          <div style={{ backgroundColor: '#3498db', padding: '4px 12px', borderRadius: 9999, display: 'inline-flex' }}>
            <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>Sale</span>
          </div>
          <div style={{ backgroundColor: '#f39c12', padding: '4px 12px', borderRadius: 9999, display: 'inline-flex' }}>
            <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>Hot</span>
          </div>
        </div>
    </div>
  );
}
