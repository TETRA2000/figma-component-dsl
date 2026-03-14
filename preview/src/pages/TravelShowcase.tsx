import { PropertyCard } from '../components/PropertyCard/PropertyCard';
import { FilterChip } from '../components/FilterChip/FilterChip';
import { PriceBadge } from '../components/PriceBadge/PriceBadge';

const properties = [
  {
    title: 'Cozy mountain cabin with lake view',
    location: 'Lake Tahoe, California',
    price: '$185',
    rating: '4.92',
    reviews: 128,
    imageColor: '#8ba89e',
    superhost: true,
  },
  {
    title: 'Modern downtown loft near restaurants',
    location: 'Portland, Oregon',
    price: '$120',
    rating: '4.85',
    reviews: 74,
    imageColor: '#b8a990',
    superhost: false,
  },
  {
    title: 'Beachfront bungalow with private deck',
    location: 'Malibu, California',
    price: '$310',
    rating: '4.97',
    reviews: 203,
    imageColor: '#7aafc4',
    superhost: true,
  },
  {
    title: 'Historic brownstone apartment in city center',
    location: 'Boston, Massachusetts',
    price: '$145',
    rating: '4.78',
    reviews: 56,
    imageColor: '#c4a27a',
    superhost: false,
  },
];

const filters = [
  { label: 'All', active: true },
  { label: 'Beachfront', active: false },
  { label: 'Mountain', active: false },
  { label: 'City', active: false },
  { label: 'Countryside', active: false },
  { label: 'Superhost', active: false },
];

export function TravelShowcase() {
  return (
    <div
      style={{
        maxWidth: 1440,
        margin: '0 auto',
        background: '#f7f7f7',
        minHeight: '100vh',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          background: '#ffffff',
          padding: '20px 40px',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#ff5a5f' }}>
          StayFinder
        </h1>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <PriceBadge price="$100" period="avg" />
          <span style={{ color: '#717171', fontSize: 13 }}>to</span>
          <PriceBadge price="$500" period="avg" highlight />
        </div>
      </header>

      {/* Filter bar */}
      <div
        style={{
          padding: '16px 40px',
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          background: '#ffffff',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        {filters.map((f) => (
          <FilterChip key={f.label} label={f.label} active={f.active} />
        ))}
      </div>

      {/* Results heading */}
      <div style={{ padding: '24px 40px 8px' }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: '#222222' }}>
          300+ stays in your area
        </h2>
        <p style={{ margin: '4px 0 0', fontSize: 14, color: '#717171' }}>
          Prices include fees and taxes
        </p>
      </div>

      {/* Property grid */}
      <div
        style={{
          padding: '16px 40px 40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 24,
        }}
      >
        {properties.map((p) => (
          <PropertyCard key={p.title} {...p} />
        ))}
      </div>
    </div>
  );
}
