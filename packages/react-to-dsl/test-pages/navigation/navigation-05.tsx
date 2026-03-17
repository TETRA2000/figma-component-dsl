export default function navigation_05() {
  return (
    <div data-testid="root" style={{ backgroundColor: '#f5f5f5' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#16213e', padding: '12px 24px' }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#ffffff' }}>Logo</span>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 24, alignItems: 'center' }}>
            <span style={{ color: '#ffffff', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>Home</span>
            <span style={{ color: '#ffffff', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>About</span>
            <span style={{ color: '#ffffff', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>Products</span>
            <span style={{ color: '#ffffff', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>Contact</span>
            <span style={{ color: '#ffffff', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>Blog</span>
          </div>
        </div>
    </div>
  );
}
