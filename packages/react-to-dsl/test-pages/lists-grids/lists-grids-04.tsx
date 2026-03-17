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

export default function lists_grids_04() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <SectionHeader title="List 4" subtitle="List layout" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FeatureItem icon="A" title="Feature 1" description="Description for feature 1" />
          <FeatureItem icon="B" title="Feature 2" description="Description for feature 2" />
          <FeatureItem icon="C" title="Feature 3" description="Description for feature 3" />
        </div>
    </div>
  );
}
