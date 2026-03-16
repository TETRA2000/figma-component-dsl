import { ProductImage } from '../../components/_generated/ProductImage/ProductImage';
import { ProductInfo } from '../../components/_generated/ProductInfo/ProductInfo';
import { ReviewCard } from '../../components/_generated/ReviewCard/ReviewCard';

export function EcommerceProductShowcase() {
  return (
    <div
      style={{
        background: '#ffffff',
        minHeight: '100vh',
        fontFamily: "'Inter', sans-serif",
        padding: '48px 40px',
      }}
    >
      {/* Product Section */}
      <div
        style={{
          display: 'flex',
          gap: 48,
          maxWidth: 1040,
          margin: '0 auto',
        }}
      >
        {/* Left: Image */}
        <ProductImage mainColor="#2563eb" accentColor="#7c3aed" />

        {/* Right: Info */}
        <ProductInfo
          name="Minimalist Desk Lamp"
          rating={4.8}
          reviewCount={256}
          price="$89.99"
          originalPrice="$119.99"
          description="Illuminate your workspace with this sleek, adjustable desk lamp. Featuring a minimalist design, touch-dimming controls, and a warm LED light that reduces eye strain during late-night work sessions."
          sizes={['S', 'M', 'L']}
        />
      </div>

      {/* Reviews Section */}
      <div
        style={{
          maxWidth: 1040,
          margin: '64px auto 0',
        }}
      >
        <h2
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: '#111827',
            margin: '0 0 24px',
            letterSpacing: '-0.01em',
          }}
        >
          Customer Reviews
        </h2>
        <div style={{ display: 'flex', gap: 16 }}>
          <ReviewCard
            name="Sarah M."
            initials="SM"
            rating={5}
            text="Absolutely love this lamp! The warm light is perfect for my home office and the dimming feature is super intuitive. Build quality feels premium."
            date="Feb 14, 2026"
            color="#2563eb"
          />
          <ReviewCard
            name="Alex K."
            initials="AK"
            rating={4}
            text="Great design and solid construction. Took a star off because the base is a bit smaller than I expected, but overall a fantastic desk lamp."
            date="Jan 28, 2026"
            color="#7c3aed"
          />
          <ReviewCard
            name="Chris P."
            initials="CP"
            rating={5}
            text="Best desk lamp I have owned. The minimalist look pairs beautifully with my setup. Touch controls are responsive and the light temperature is just right."
            date="Jan 10, 2026"
            color="#059669"
          />
        </div>
      </div>
    </div>
  );
}
