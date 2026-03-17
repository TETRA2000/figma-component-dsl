function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#333' }}>{title}</h2>
      {subtitle && <p style={{ fontSize: 14, color: '#666' }}>{subtitle}</p>}
    </div>
  );
}

function Badge({ label, color, textColor }: { label: string; color: string; textColor?: string }) {
  return (
    <div style={{ backgroundColor: color, color: textColor || '#fff', padding: '4px 12px', borderRadius: 9999, fontSize: 12, fontWeight: 600, display: 'inline-flex' }}>
      <span>{label}</span>
    </div>
  );
}

function Tag({ label, color }: { label: string; color: string }) {
  return (
    <div style={{ backgroundColor: color, color: '#fff', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 500, display: 'inline-flex' }}>
      <span>{label}</span>
    </div>
  );
}

function Chip({ label, selected, color }: { label: string; selected?: boolean; color?: string }) {
  const bg = selected ? (color || '#3498db') : '#f0f0f0';
  const textColor = selected ? '#fff' : '#333';
  return (
    <div style={{ backgroundColor: bg, color: textColor, padding: '6px 14px', borderRadius: 16, fontSize: 13, fontWeight: 500, display: 'inline-flex' }}>
      <span>{label}</span>
    </div>
  );
}

export default function badges_tags_03() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#fff', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <SectionHeader title="Badges" />
        <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          <Badge label="v1.0" color="#3498db" />
          <Badge label="v2.0" color="#9b59b6" />
          <Badge label="Beta" color="#e67e22" />
        </div>
        <SectionHeader title="Tags" />
        <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          <Tag label="v1.0" color="#3498db" />
          <Tag label="v2.0" color="#9b59b6" />
          <Tag label="Beta" color="#e67e22" />
        </div>
        <SectionHeader title="Chips" />
        <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          <Chip label="v1.0" selected={true} color="#3498db" />
          <Chip label="v2.0" selected={false} color="#9b59b6" />
          <Chip label="Beta" selected={false} color="#e67e22" />
        </div>
    </div>
  );
}
