export default function badges_tags_02() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#fff' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          <div style={{ backgroundColor: '#2ecc71', padding: '4px 12px', borderRadius: 9999, display: 'inline-flex' }}>
            <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>Active</span>
          </div>
          <div style={{ backgroundColor: '#f39c12', padding: '4px 12px', borderRadius: 9999, display: 'inline-flex' }}>
            <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>Pending</span>
          </div>
          <div style={{ backgroundColor: '#e74c3c', padding: '4px 12px', borderRadius: 9999, display: 'inline-flex' }}>
            <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>Closed</span>
          </div>
        </div>
    </div>
  );
}
