import { McButton } from '../components/McButton/McButton';
import { McBadge } from '../components/McBadge/McBadge';
import { McMenuCard } from '../components/McMenuCard/McMenuCard';
import { McOrderBanner } from '../components/McOrderBanner/McOrderBanner';

export function McDonaldsShowcase() {
  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      {/* Header */}
      <header style={{
        background: '#292929',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 32 }}>🍟</span>
          <span style={{
            fontFamily: "'Speedee', system-ui, sans-serif",
            fontSize: 24,
            fontWeight: 700,
            color: '#ffbc0d',
          }}>McDonald's</span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <McButton variant="secondary" size="sm">Order Now</McButton>
          <McButton variant="ghost" size="sm" style={{ color: '#fff' }}>Sign In</McButton>
        </div>
      </header>

      {/* Hero Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #da291c 0%, #ff5722 50%, #ffbc0d 100%)',
        padding: '64px 32px',
        textAlign: 'center',
        color: '#ffffff',
      }}>
        <McBadge variant="new">Limited Time</McBadge>
        <h1 style={{
          fontFamily: "'Speedee', system-ui, sans-serif",
          fontSize: 56,
          fontWeight: 700,
          margin: '16px 0 12px',
          lineHeight: 1.1,
        }}>i'm lovin' it</h1>
        <p style={{
          fontFamily: "'Speedee', system-ui, sans-serif",
          fontSize: 20,
          fontWeight: 400,
          opacity: 0.9,
          margin: '0 0 32px',
        }}>Discover our new menu items, deals, and rewards</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <McButton variant="secondary" size="lg">View Menu</McButton>
          <McButton variant="outline" size="lg" style={{ borderColor: '#fff', color: '#fff' }}>Find a Restaurant</McButton>
        </div>
      </section>

      {/* Banners */}
      <section style={{ padding: '32px', maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <McOrderBanner
          variant="delivery"
          title="Free McDelivery"
          subtitle="On orders over $20. Use code FREEMCD at checkout."
          action={<McButton variant="primary" size="sm">Order Now</McButton>}
        />
        <McOrderBanner
          variant="reward"
          title="Earn Double Points Today"
          subtitle="MyMcDonald's Rewards members earn 2x points on all orders."
        />
        <McOrderBanner
          variant="info"
          title="Mobile Order & Pay"
          subtitle="Skip the line — order ahead with the McDonald's app."
        />
      </section>

      {/* Badges showcase */}
      <section style={{ padding: '0 32px 32px', maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: "'Speedee', system-ui, sans-serif",
          fontSize: 14,
          fontWeight: 700,
          color: '#999',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 12,
        }}>Categories</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <McBadge variant="promo">Hot Deal</McBadge>
          <McBadge variant="new">New Item</McBadge>
          <McBadge variant="limited">Limited Time</McBadge>
          <McBadge variant="value">Value Pick</McBadge>
        </div>
      </section>

      {/* Menu Grid */}
      <section style={{ padding: '32px', maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: "'Speedee', system-ui, sans-serif",
          fontSize: 32,
          fontWeight: 700,
          color: '#292929',
          marginBottom: 8,
        }}>Popular Items</h2>
        <p style={{
          fontFamily: "'Speedee', system-ui, sans-serif",
          fontSize: 16,
          color: '#6f6f6f',
          marginBottom: 24,
        }}>Our most-loved menu items</p>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <McMenuCard
            name="Big Mac"
            description="Two all-beef patties, special sauce, lettuce, cheese, pickles, onions on a sesame seed bun."
            price="$5.99"
            calories="550"
            badge="Classic"
          />
          <McMenuCard
            name="Quarter Pounder with Cheese"
            description="A quarter pound of 100% fresh beef with two slices of melty American cheese."
            price="$6.49"
            calories="520"
          />
          <McMenuCard
            name="10 Piece McNuggets"
            description="Tender, juicy chicken McNuggets with your choice of dipping sauce."
            price="$4.99"
            calories="410"
            badge="Fan Favorite"
          />
          <McMenuCard
            name="McFlurry with OREO"
            description="Creamy vanilla soft serve with OREO cookie pieces mixed in."
            price="$3.99"
            calories="510"
            badge="Sweet Treat"
          />
        </div>
      </section>

      {/* Value Picks */}
      <section style={{
        padding: '48px 32px',
        background: '#ffbc0d',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <h2 style={{
              fontFamily: "'Speedee', system-ui, sans-serif",
              fontSize: 32,
              fontWeight: 700,
              color: '#292929',
              margin: 0,
            }}>$1 $2 $3 Dollar Menu</h2>
            <McBadge variant="value">Best Value</McBadge>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <McMenuCard name="McChicken" price="$1.69" calories="400" size="sm" />
            <McMenuCard name="Small Fries" price="$1.89" calories="220" size="sm" />
            <McMenuCard name="Hash Brown" price="$1.49" calories="140" size="sm" />
            <McMenuCard name="Vanilla Cone" price="$1.69" calories="200" size="sm" />
            <McMenuCard name="Hot Fudge Sundae" price="$2.49" calories="330" size="sm" />
          </div>
        </div>
      </section>

      {/* Buttons showcase */}
      <section style={{ padding: '48px 32px', maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: "'Speedee', system-ui, sans-serif",
          fontSize: 24,
          fontWeight: 700,
          color: '#292929',
          marginBottom: 24,
        }}>Button Variants</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <McButton variant="primary" size="sm">Small</McButton>
            <McButton variant="primary" size="md">Medium</McButton>
            <McButton variant="primary" size="lg">Large</McButton>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <McButton variant="primary">Primary</McButton>
            <McButton variant="secondary">Secondary</McButton>
            <McButton variant="outline">Outline</McButton>
            <McButton variant="ghost">Ghost</McButton>
          </div>
          <McButton variant="primary" fullWidth>Full Width Order Button</McButton>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#292929',
        padding: '32px',
        textAlign: 'center',
        color: '#999',
        fontFamily: "'Speedee', system-ui, sans-serif",
        fontSize: 13,
      }}>
        © 2026 McDonald's. All rights reserved.
      </footer>
    </div>
  );
}
