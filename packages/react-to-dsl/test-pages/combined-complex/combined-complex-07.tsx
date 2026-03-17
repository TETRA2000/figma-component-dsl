export default function combined_complex_07() {
  return (
    <div data-testid="root" style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
        <div style={{ backgroundColor: '#e67e22', padding: '48px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff' }}>Welcome</h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', textAlign: 'center' as const }}>Build amazing things with our platform.</p>
        </div>
        <div style={{ padding: 32, display: 'flex', flexDirection: 'row', gap: 24, justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#e67e22', opacity: 0.1 }}>

            </div>
            <p style={{ fontSize: 16, fontWeight: 600, color: '#333' }}>Fast</p>
            <p style={{ fontSize: 13, color: '#666', textAlign: 'center' as const }}>Lorem ipsum dolor sit amet.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#e67e22', opacity: 0.1 }}>

            </div>
            <p style={{ fontSize: 16, fontWeight: 600, color: '#333' }}>Secure</p>
            <p style={{ fontSize: 13, color: '#666', textAlign: 'center' as const }}>Lorem ipsum dolor sit amet.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#e67e22', opacity: 0.1 }}>

            </div>
            <p style={{ fontSize: 16, fontWeight: 600, color: '#333' }}>Scalable</p>
            <p style={{ fontSize: 13, color: '#666', textAlign: 'center' as const }}>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
    </div>
  );
}
