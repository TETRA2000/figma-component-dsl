function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#333' }}>{title}</h2>
      {subtitle && <p style={{ fontSize: 14, color: '#666' }}>{subtitle}</p>}
    </div>
  );
}

export default function typography_04() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SectionHeader title="Section 4" subtitle="Typography test" />
        <p style={{ fontSize: 18, fontWeight: 500, color: '#e74c3c', textAlign: 'right' as const, lineHeight: 1.6, letterSpacing: 1 }}>The quick brown fox jumps over the lazy dog</p>
    </div>
  );
}
