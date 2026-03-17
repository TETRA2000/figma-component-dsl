export default function badges_tags_04() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#fff' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          <div style={{ backgroundColor: '#61dafb', padding: '4px 12px', borderRadius: 9999, display: 'inline-flex' }}>
            <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>React</span>
          </div>
          <div style={{ backgroundColor: '#3178c6', padding: '4px 12px', borderRadius: 9999, display: 'inline-flex' }}>
            <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>TypeScript</span>
          </div>
          <div style={{ backgroundColor: '#68a063', padding: '4px 12px', borderRadius: 9999, display: 'inline-flex' }}>
            <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>Node.js</span>
          </div>
          <div style={{ backgroundColor: '#264de4', padding: '4px 12px', borderRadius: 9999, display: 'inline-flex' }}>
            <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>CSS</span>
          </div>
        </div>
    </div>
  );
}
