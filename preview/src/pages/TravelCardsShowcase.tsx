import { PropertyCard } from '../components/PropertyCard/PropertyCard';
import { PriceBadge } from '../components/PriceBadge/PriceBadge';
import { FilterChip } from '../components/FilterChip/FilterChip';

export function TravelCardsShowcase() {
  return (
    <div style={{ maxWidth: 1440, margin: '0 auto', background: '#ffffff', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 32px',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 24, fontWeight: 700, color: '#ff5a5f' }}>
          TravelStay
        </span>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <PriceBadge label="Superhost" variant="highlight" />
          <PriceBadge label="Guest favorite" variant="default" />
        </div>
      </div>

      {/* Filter bar */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        padding: '16px 32px',
        borderBottom: '1px solid #e5e7eb',
        background: '#f7f7f7',
      }}>
        <FilterChip label="Beach" active />
        <FilterChip label="Mountain" />
        <FilterChip label="City" />
        <FilterChip label="Countryside" />
      </div>

      {/* Card grid */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 24,
        padding: '32px',
        flexWrap: 'wrap',
      }}>
        <PropertyCard
          title="Cozy Mountain Cabin"
          location="Aspen, Colorado"
          price="$185"
          rating={4.8}
        />
        <PropertyCard
          title="Beachfront Villa"
          location="Tulum, Mexico"
          price="$250"
          rating={4.9}
        />
        <PropertyCard
          title="Downtown Loft"
          location="New York, NY"
          price="$320"
          rating={4.6}
        />
      </div>
    </div>
  );
}
