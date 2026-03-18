export default function SvgBasic01() {
  return (
    <div data-testid="root" style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24, backgroundColor: '#f8f9fa' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 22h20L12 2z" fill="#e74c3c" />
        </svg>
        <span style={{ fontSize: 16, fontWeight: 500, color: '#333333' }}>Warning Icon</span>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="14" fill="#3498db" />
          <path d="M14 10h4v8h-4zM14 20h4v4h-4z" fill="#ffffff" />
        </svg>
        <span style={{ fontSize: 16, fontWeight: 500, color: '#333333' }}>Info Badge</span>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="40" height="40" rx="8" fill="#2ecc71" />
          <path d="M14 24l6 6 14-14" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ fontSize: 18, fontWeight: 600, color: '#333333' }}>Success Check</span>
      </div>
    </div>
  );
}
