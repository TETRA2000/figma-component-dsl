export default function borders_strokes_05() {
  return (
    <div data-testid="root" style={{ padding: 16, backgroundColor: '#f5f5f5' }}>
        <div style={{ border: '2px solid #e67e22', padding: 24, backgroundColor: '#fff' }}>
          <p style={{ fontSize: 14, color: '#333' }}>Border: 2px solid #e67e22</p>
          <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>Content inside bordered container</p>
        </div>
    </div>
  );
}
