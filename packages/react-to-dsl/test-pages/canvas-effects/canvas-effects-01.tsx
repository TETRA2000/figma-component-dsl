export default function CanvasEffects01() {
  return (
    <div data-testid="root" style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 32, backgroundColor: '#f0f0f0' }}>
      {/* Box shadow */}
      <div style={{
        padding: 24,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      }}>
        <span style={{ fontSize: 16, fontWeight: 600, color: '#333333' }}>Card with Shadow</span>
      </div>

      {/* Text shadow */}
      <span style={{
        fontSize: 32,
        fontWeight: 700,
        color: '#1a1a2e',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
      }}>
        Shadow Text
      </span>

      {/* Text transform */}
      <span style={{
        fontSize: 14,
        fontWeight: 600,
        color: '#666666',
        textTransform: 'uppercase',
        letterSpacing: '2px',
      }}>
        uppercase label
      </span>

      {/* Rotation */}
      <div style={{
        width: 80,
        height: 80,
        backgroundColor: '#7c3aed',
        borderRadius: 8,
        transform: 'rotate(15deg)',
      }} />

      {/* Blend mode */}
      <div style={{
        width: 120,
        height: 40,
        backgroundColor: '#e74c3c',
        mixBlendMode: 'multiply',
        borderRadius: 4,
      }} />
    </div>
  );
}
