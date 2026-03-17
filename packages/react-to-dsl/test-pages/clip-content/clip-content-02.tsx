export default function clip_content_02() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#f5f5f5' }}>
        <div style={{ width: 200, height: 150, overflow: 'hidden', backgroundColor: '#ecf0f1', border: '1px solid #bdc3c7', borderRadius: 8 }}>
          <div style={{ width: 160, height: 160, backgroundColor: '#3498db', borderRadius: 4 }}>
            <p style={{ color: '#fff', fontSize: 12, padding: 8 }}>Overflowing content</p>
          </div>
        </div>
    </div>
  );
}
