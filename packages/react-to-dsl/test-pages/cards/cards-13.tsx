function Card({ title, children, accentColor }: { title: string; children?: React.ReactNode; accentColor?: string }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: 8, padding: 20, border: '1px solid #e0e0e0', overflow: 'hidden' }}>
      <h3 style={{ fontSize: 18, fontWeight: 600, color: '#333', marginBottom: 8 }}>{title}</h3>
      {children}
      {accentColor && <div style={{ height: 3, backgroundColor: accentColor, marginTop: 12, borderRadius: 2 }} />}
    </div>
  );
}

function ProgressBar({ percent, color }: { percent: number; color?: string }) {
  return (
    <div style={{ width: '100%', height: 8, backgroundColor: '#eee', borderRadius: 4, overflow: 'hidden' }}>
      <div style={{ width: percent + '%', height: '100%', backgroundColor: color || '#3498db', borderRadius: 4 }} />
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

function Button({ children, color, textColor }: { children: React.ReactNode; color?: string; textColor?: string }) {
  return (
    <div style={{ backgroundColor: color || '#3498db', padding: '8px 16px', borderRadius: 4, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: textColor || '#fff', fontSize: 14, fontWeight: 600 }}>{children}</span>
    </div>
  );
}

export default function cards_13() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#f5f5f5' }}>
        <Card title="Project Card 13">
          <ProgressBar percent={82} color="#2ecc71" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
            <FeatureItem icon="A" title="Feature One" description="First feature description" />
            <FeatureItem icon="B" title="Feature Two" description="Second feature description" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
            <Button color="#2ecc71">View Details</Button>
          </div>
        </Card>
    </div>
  );
}
