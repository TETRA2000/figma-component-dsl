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

export default function badges_tags_05() {
  return (
    <div data-testid="root" style={{ padding: 24, backgroundColor: '#fff', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <SectionHeader title="Badges" />
        <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          <Badge label="Success" color="#2ecc71" />
          <Badge label="Warning" color="#f39c12" />
          <Badge label="Error" color="#e74c3c" />
          <Badge label="Info" color="#3498db" />
        </div>
        <SectionHeader title="Tags" />
        <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          <Tag label="Success" color="#2ecc71" />
          <Tag label="Warning" color="#f39c12" />
          <Tag label="Error" color="#e74c3c" />
          <Tag label="Info" color="#3498db" />
        </div>
        <SectionHeader title="Chips" />
        <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          <Chip label="Success" selected={true} color="#2ecc71" />
          <Chip label="Warning" selected={false} color="#f39c12" />
          <Chip label="Error" selected={false} color="#e74c3c" />
          <Chip label="Info" selected={false} color="#3498db" />
        </div>
    </div>
  );
}
