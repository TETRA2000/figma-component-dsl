export default function badges_tags_03() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#fff' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          <div style={{ backgroundColor: '#3498db', padding: '4px 12px', borderRadius: 9999, display: 'inline-flex' }}>
            <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>v1.0</span>
          </div>
          <div style={{ backgroundColor: '#9b59b6', padding: '4px 12px', borderRadius: 9999, display: 'inline-flex' }}>
            <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>v2.0</span>
          </div>
          <div style={{ backgroundColor: '#e67e22', padding: '4px 12px', borderRadius: 9999, display: 'inline-flex' }}>
            <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>Beta</span>
          </div>
        </div>
    </div>
  );
}
