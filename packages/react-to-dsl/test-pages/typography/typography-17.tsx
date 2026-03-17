function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#333' }}>{title}</h2>
      {subtitle && <p style={{ fontSize: 14, color: '#666' }}>{subtitle}</p>}
    </div>
  );
}

export default function typography_17() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SectionHeader title="Section 17" subtitle="Typography test" />
        <p style={{ fontSize: 16, fontWeight: 400, color: '#333333', textAlign: 'center' as const, lineHeight: 1.5 }}>Typography variant 17 — font size 16px, weight 400</p>
        <p style={{ fontSize: 12, fontWeight: 400, color: '#666666', marginTop: 8 }}>Secondary text with different styling</p>
    </div>
  );
}
