function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#333' }}>{title}</h2>
      {subtitle && <p style={{ fontSize: 14, color: '#666' }}>{subtitle}</p>}
    </div>
  );
}

export default function typography_05() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SectionHeader title="Section 5" subtitle="Typography test" />
        <p style={{ fontSize: 20, fontWeight: 600, color: '#3498db', textAlign: 'left' as const, lineHeight: 1.8, textDecoration: 'underline' }}>The quick brown fox jumps over the lazy dog</p>
    </div>
  );
}
