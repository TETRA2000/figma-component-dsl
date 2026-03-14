import { StarRating } from '../components/StarRating/StarRating';
import { PriceTag } from '../components/PriceTag/PriceTag';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { ProductGrid } from '../components/ProductGrid/ProductGrid';

const bestSellers = [
  {
    image: 'https://picsum.photos/seed/headphones/300/300',
    title: 'Wireless Bluetooth Headphones, Active Noise Cancelling Over-Ear Headphones with Microphone',
    rating: 4.5,
    reviewCount: 12847,
    price: '$49.99',
    originalPrice: '$79.99',
    discount: '-38%',
    prime: true,
    badge: 'Best Seller',
  },
  {
    image: 'https://picsum.photos/seed/keyboard/300/300',
    title: 'Mechanical Gaming Keyboard RGB Backlit, Hot-Swappable Switches, USB-C',
    rating: 4.3,
    reviewCount: 8562,
    price: '$59.99',
    originalPrice: '$89.99',
    discount: '-33%',
    prime: true,
  },
  {
    image: 'https://picsum.photos/seed/mouse/300/300',
    title: 'Ergonomic Wireless Mouse, 2.4G & Bluetooth, 6 Buttons, Adjustable DPI',
    rating: 4.7,
    reviewCount: 23491,
    price: '$24.99',
    prime: true,
    badge: 'Top Pick',
  },
  {
    image: 'https://picsum.photos/seed/charger/300/300',
    title: 'USB-C Fast Charger 65W GaN, Compact Foldable Wall Charger for MacBook, iPhone, iPad',
    rating: 4.6,
    reviewCount: 5213,
    price: '$29.99',
    originalPrice: '$45.99',
    discount: '-35%',
    prime: true,
  },
];

const deals = [
  {
    image: 'https://picsum.photos/seed/monitor/300/300',
    title: '27" 4K UHD Monitor, IPS Display, 99% sRGB, USB-C, Height Adjustable Stand',
    rating: 4.4,
    reviewCount: 3891,
    price: '$279.99',
    originalPrice: '$449.99',
    discount: '-38%',
    prime: true,
    badge: 'Deal of the Day',
  },
  {
    image: 'https://picsum.photos/seed/tablet/300/300',
    title: '10.2" Tablet, 64GB, Wi-Fi 6, 12MP Camera, All-Day Battery Life',
    rating: 4.8,
    reviewCount: 45012,
    price: '$199.99',
    originalPrice: '$329.99',
    discount: '-39%',
    prime: true,
    badge: 'Limited Deal',
  },
  {
    image: 'https://picsum.photos/seed/earbuds/300/300',
    title: 'True Wireless Earbuds, Active Noise Cancellation, 30hr Battery, IPX5 Waterproof',
    rating: 4.2,
    reviewCount: 7654,
    price: '$34.99',
    originalPrice: '$59.99',
    discount: '-42%',
    prime: true,
  },
  {
    image: 'https://picsum.photos/seed/webcam/300/300',
    title: '1080p HD Webcam with Privacy Cover, Built-in Microphone, Auto Light Correction',
    rating: 4.1,
    reviewCount: 2345,
    price: '$19.99',
    originalPrice: '$39.99',
    discount: '-50%',
    prime: true,
    badge: 'Lightning Deal',
  },
];

export function AmazonShowcase() {
  return (
    <div style={{ minHeight: '100vh', background: '#eaeded', fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Navbar */}
      <header style={{
        background: '#131921',
        padding: '8px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 24,
      }}>
        <span style={{ fontSize: 24, fontWeight: 700, color: '#fff', letterSpacing: -0.5 }}>
          Nova<span style={{ color: '#f0c14b' }}>Mart</span>
        </span>
        <div style={{
          flex: 1,
          display: 'flex',
          maxWidth: 700,
        }}>
          <input
            type="text"
            placeholder="Search products..."
            style={{
              flex: 1,
              padding: '8px 12px',
              border: 'none',
              borderRadius: '4px 0 0 4px',
              fontSize: 14,
              outline: 'none',
            }}
          />
          <button style={{
            background: '#f0c14b',
            border: 'none',
            borderRadius: '0 4px 4px 0',
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: 16,
          }}>
            🔍
          </button>
        </div>
        <div style={{ display: 'flex', gap: 20, color: '#fff', fontSize: 14 }}>
          <span>Account</span>
          <span>Orders</span>
          <span>🛒 Cart</span>
        </div>
      </header>

      {/* Sub-nav */}
      <div style={{
        background: '#232f3e',
        padding: '6px 24px',
        display: 'flex',
        gap: 16,
        fontSize: 13,
        color: '#ddd',
      }}>
        <span>All</span>
        <span>Today&apos;s Deals</span>
        <span>Electronics</span>
        <span>Home & Kitchen</span>
        <span>Books</span>
        <span>Fashion</span>
        <span>Customer Service</span>
      </div>

      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #232f3e 0%, #37475a 100%)',
        padding: '48px 24px',
        textAlign: 'center',
        color: '#fff',
      }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, margin: '0 0 8px' }}>
          Big Spring Sale
        </h1>
        <p style={{ fontSize: 18, color: '#ddd', margin: '0 0 24px' }}>
          Up to 50% off electronics, home, and more
        </p>
        <button style={{
          background: '#f0c14b',
          border: '1px solid #a88734',
          borderRadius: 4,
          padding: '12px 32px',
          fontSize: 16,
          fontWeight: 600,
          color: '#111',
          cursor: 'pointer',
        }}>
          Shop All Deals
        </button>
      </div>

      {/* Component Showcase */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>

        {/* Individual Components Demo */}
        <div style={{
          background: '#fff',
          borderRadius: 8,
          padding: 24,
          marginBottom: 32,
          border: '1px solid #ddd',
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 24px', color: '#0f1111' }}>
            Component Showcase
          </h2>

          {/* StarRating examples */}
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#565959', margin: '0 0 12px', textTransform: 'uppercase' }}>
              StarRating
            </h3>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'center' }}>
              <StarRating rating={5} reviewCount={45012} size="sm" />
              <StarRating rating={4.5} reviewCount={12847} size="md" />
              <StarRating rating={3.5} reviewCount={234} size="lg" />
              <StarRating rating={4} />
            </div>
          </div>

          {/* PriceTag examples */}
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#565959', margin: '0 0 12px', textTransform: 'uppercase' }}>
              PriceTag
            </h3>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <PriceTag price="$49.99" originalPrice="$79.99" discount="-38%" size="md" />
              <PriceTag price="$199.99" size="lg" />
              <PriceTag price="$9.99" originalPrice="$19.99" discount="-50%" label="Deal price" size="sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Product Grids */}
      <div style={{ background: '#fff', borderTop: '1px solid #ddd' }}>
        <ProductGrid
          title="Best Sellers in Electronics"
          subtitle="Updated hourly based on recent purchases"
          products={bestSellers}
          columns={4}
        />
      </div>

      <div style={{ background: '#fff', marginTop: 16, borderTop: '1px solid #ddd' }}>
        <ProductGrid
          title="Today's Deals"
          subtitle="Limited-time deals on top products"
          products={deals}
          columns={4}
        />
      </div>

      {/* Footer */}
      <footer style={{
        background: '#232f3e',
        padding: '32px 24px',
        textAlign: 'center',
        color: '#999',
        fontSize: 13,
        marginTop: 32,
      }}>
        <p style={{ margin: 0 }}>NovaMart — Amazon-style ecommerce component showcase</p>
      </footer>
    </div>
  );
}
