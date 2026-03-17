export default function spacing_padding_10() {
  return (
    <div data-testid="root" style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '12px 24px 12px 24px', backgroundColor: '#f0f0f0' }}>
        <div style={{ backgroundColor: '#e74c3c', padding: 12 }}>
          <p style={{ color: '#fff', fontSize: 14 }}>Item 1</p>
        </div>
        <div style={{ backgroundColor: '#3498db', padding: 12 }}>
          <p style={{ color: '#fff', fontSize: 14 }}>Item 2</p>
        </div>
        <div style={{ backgroundColor: '#2ecc71', padding: 12 }}>
          <p style={{ color: '#fff', fontSize: 14 }}>Item 3</p>
        </div>
    </div>
  );
}
