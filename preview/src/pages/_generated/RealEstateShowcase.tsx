import { PropertyCard } from '../../components/_generated/PropertyCard/PropertyCard';
import { FilterChip } from '../../components/_generated/FilterChip/FilterChip';
import { AgentCard } from '../../components/_generated/AgentCard/AgentCard';

export function RealEstateShowcase() {
  return (
    <div style={{ background: '#fafaf8', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ background: '#0f172a', padding: '48px 120px 40px' }}>
        <h1 style={{ color: '#ffffff', fontSize: 40, fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>
          Find Your Dream Home
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 16, margin: '8px 0 24px' }}>
          Browse thousands of listings in your area
        </p>
        <div
          style={{
            background: '#ffffff',
            borderRadius: 12,
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            maxWidth: 560,
          }}
        >
          <span style={{ color: '#94a3b8', fontSize: 20 }}>&#128205;</span>
          <span style={{ color: '#94a3b8', fontSize: 15, fontFamily: "'Inter', sans-serif" }}>
            Search by city, neighborhood, or ZIP code...
          </span>
        </div>
      </div>

      {/* Filter chips row */}
      <div style={{ display: 'flex', gap: 10, padding: '24px 120px', flexWrap: 'wrap' }}>
        <FilterChip label="All" active />
        <FilterChip label="Houses" />
        <FilterChip label="Apartments" />
        <FilterChip label="Condos" />
        <FilterChip label="Townhouses" />
      </div>

      {/* Main content */}
      <div style={{ display: 'flex', gap: 32, padding: '0 120px 48px' }}>
        {/* Property cards grid */}
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', flex: 1 }}>
          <PropertyCard
            price="$450,000"
            address="1234 Maple Street"
            neighborhood="Downtown, Austin TX"
            beds={3}
            baths={2}
            sqft="1,850"
          />
          <PropertyCard
            price="$725,000"
            address="567 Lakeview Drive"
            neighborhood="Westlake Hills, Austin TX"
            beds={4}
            baths={3}
            sqft="2,640"
          />
          <PropertyCard
            price="$325,000"
            address="890 Cedar Park Lane"
            neighborhood="Cedar Park, Austin TX"
            beds={2}
            baths={2}
            sqft="1,200"
          />
        </div>

        {/* Sidebar */}
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', margin: 0, fontFamily: "'Inter', sans-serif" }}>
            Featured Agent
          </h3>
          <AgentCard
            name="Sarah Johnson"
            initials="SJ"
            phone="(512) 555-0147"
            rating={4.9}
            reviewCount={127}
          />
        </div>
      </div>
    </div>
  );
}
