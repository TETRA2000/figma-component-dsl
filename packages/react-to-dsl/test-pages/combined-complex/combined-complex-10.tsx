function Badge({ label, color, textColor }: { label: string; color: string; textColor?: string }) {
  return (
    <div style={{ backgroundColor: color, color: textColor || '#fff', padding: '4px 12px', borderRadius: 9999, fontSize: 12, fontWeight: 600, display: 'inline-flex' }}>
      <span>{label}</span>
    </div>
  );
}

function Button({ children, color, textColor }: { children: React.ReactNode; color?: string; textColor?: string }) {
  return (
    <div style={{ backgroundColor: color || '#3498db', padding: '8px 16px', borderRadius: 4, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: textColor || '#fff', fontSize: 14, fontWeight: 600 }}>{children}</span>
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#333' }}>{title}</h2>
      {subtitle && <p style={{ fontSize: 14, color: '#666' }}>{subtitle}</p>}
    </div>
  );
}

function FeatureItem({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
      <div style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#3498db', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: '#fff', fontSize: 14 }}>{icon}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flexGrow: 1 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>{title}</span>
        <span style={{ fontSize: 12, color: '#666' }}>{description}</span>
      </div>
    </div>
  );
}

export default function combined_complex_10() {
  return (
    <div data-testid="root" style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
        <div style={{ backgroundColor: '#3498db', padding: '48px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <Badge label="New" color="rgba(255,255,255,0.2)" textColor="#fff" />
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff' }}>Welcome</h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', textAlign: 'center' as const }}>Build amazing things with our platform.</p>
          <Button color="#fff" textColor="#3498db">Get Started</Button>
        </div>
        <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <SectionHeader title="Features" subtitle="What we offer" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <FeatureItem icon="F" title="Fast" description="Lorem ipsum dolor sit amet." />
            <FeatureItem icon="S" title="Secure" description="Lorem ipsum dolor sit amet." />
            <FeatureItem icon="S" title="Scalable" description="Lorem ipsum dolor sit amet." />
          </div>
        </div>
    </div>
  );
}
