export default function navigation_10() {
  return (
    <div data-testid="root" style={{ backgroundColor: '#f5f5f5' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f8f9fa', padding: '12px 24px' }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#333333' }}>Logo</span>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 24, alignItems: 'center' }}>
            <span style={{ color: '#333333', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>Home</span>
            <span style={{ color: '#333333', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>About</span>
            <span style={{ color: '#333333', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>Products</span>
            <span style={{ color: '#333333', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>Contact</span>
          </div>
        </div>
    </div>
  );
}
