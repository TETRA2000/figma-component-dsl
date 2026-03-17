export default function corner_radius_08() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#f5f5f5' }}>
        <div style={{ borderRadius: '8px 16px 8px 16px', backgroundColor: '#3498db', padding: 24 }}>
          <p style={{ color: '#fff', fontSize: 14, textAlign: 'center' as const }}>Border radius: 8px 16px 8px 16px</p>
        </div>
    </div>
  );
}
