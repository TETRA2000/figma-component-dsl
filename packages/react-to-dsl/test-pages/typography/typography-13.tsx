function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#333' }}>{title}</h2>
      {subtitle && <p style={{ fontSize: 14, color: '#666' }}>{subtitle}</p>}
    </div>
  );
}

export default function typography_13() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SectionHeader title="Section 13" subtitle="Typography test" />
        <p style={{ fontSize: 18, fontWeight: 400, color: '#7f8c8d', textAlign: 'left' as const, lineHeight: 1.7 }}>Typography variant 13 — font size 18px, weight 400</p>
        <p style={{ fontSize: 14, fontWeight: 400, color: '#666666', marginTop: 8 }}>Secondary text with different styling</p>
    </div>
  );
}
