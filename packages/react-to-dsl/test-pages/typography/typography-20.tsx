function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#333' }}>{title}</h2>
      {subtitle && <p style={{ fontSize: 14, color: '#666' }}>{subtitle}</p>}
    </div>
  );
}

export default function typography_20() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SectionHeader title="Section 20" subtitle="Typography test" />
        <p style={{ fontSize: 36, fontWeight: 500, color: '#27ae60', textAlign: 'right' as const, lineHeight: 1.6, letterSpacing: 1, textDecoration: 'underline' }}>Typography variant 20 — font size 36px, weight 500</p>
        <p style={{ fontSize: 32, fontWeight: 400, color: '#666666', marginTop: 8 }}>Secondary text with different styling</p>
    </div>
  );
}
