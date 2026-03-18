function NavItem({ label, active, color }: { label: string; active?: boolean; color?: string }) {
  return (
    <span style={{ color: color || '#333', fontSize: 14, fontWeight: active ? 600 : 400, padding: '8px 12px', borderBottom: active ? '2px solid currentColor' : 'none' }}>
      {label}
    </span>
  );
}

function Avatar({ color, size }: { color: string; size?: number }) {
  const s = size || 40;
  return <div style={{ width: s, height: s, borderRadius: s / 2, backgroundColor: color }} />;
}

export default function navigation_01() {
  return (
    <div data-testid="root" style={{ backgroundColor: '#f5f5f5' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#2c3e50', padding: '12px 24px' }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#ffffff' }}>Logo</span>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <NavItem label="Home" active={true} color="#ffffff" />
            <NavItem label="About" active={false} color="#ffffff" />
            <NavItem label="Products" active={false} color="#ffffff" />
            <NavItem label="Contact" active={false} color="#ffffff" />
          </div>
          <Avatar color="#fff" size={32} />
        </div>
    </div>
  );
}
