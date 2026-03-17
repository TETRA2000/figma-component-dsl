export default function corner_radius_04() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#f5f5f5' }}>
        <div style={{ borderRadius: 12, backgroundColor: '#3498db', padding: 24 }}>
          <p style={{ color: '#fff', fontSize: 14, textAlign: 'center' as const }}>Border radius: 12px</p>
        </div>
    </div>
  );
}
