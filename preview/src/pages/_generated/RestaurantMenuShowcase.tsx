import { MenuItem } from '../../components/_generated/MenuItem/MenuItem';
import { MenuCategory } from '../../components/_generated/MenuCategory/MenuCategory';
import { SpecialCard } from '../../components/_generated/SpecialCard/SpecialCard';

export function RestaurantMenuShowcase() {
  return (
    <div style={{ background: '#faf7f2', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ padding: '56px 120px 0', textAlign: 'center' }}>
        <h1 style={{ color: '#2c2418', fontSize: 48, fontWeight: 700, margin: 0, letterSpacing: '-0.03em' }}>
          La Maison
        </h1>
        <p style={{ color: '#8c7e6a', fontSize: 16, margin: '8px 0 0', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>
          Fine Dining &middot; Est. 1987
        </p>
      </div>

      {/* Chef's Special */}
      <div style={{ padding: '40px 120px 0', maxWidth: 960, margin: '0 auto' }}>
        <SpecialCard
          dishName="Truffle Risotto"
          description="Creamy Arborio rice with black truffle, aged Parmesan, and a drizzle of truffle oil"
          price="$42"
        />
      </div>

      {/* Starters */}
      <div style={{ padding: '48px 120px 0', maxWidth: 960, margin: '0 auto' }}>
        <MenuCategory name="Starters">
          <MenuItem
            name="French Onion Soup"
            description="Classic slow-cooked onion soup with Gruyere crouton"
            price="$14"
            dietaryTags={['V']}
            popular
          />
          <MenuItem
            name="Tuna Tartare"
            description="Fresh yellowfin tuna with avocado, sesame, and citrus ponzu"
            price="$19"
            dietaryTags={['GF']}
          />
          <MenuItem
            name="Burrata Caprese"
            description="Creamy burrata with heirloom tomatoes, basil oil, and aged balsamic"
            price="$16"
            dietaryTags={['V', 'GF']}
          />
        </MenuCategory>
      </div>

      {/* Mains */}
      <div style={{ padding: '40px 120px 0', maxWidth: 960, margin: '0 auto' }}>
        <MenuCategory name="Mains">
          <MenuItem
            name="Filet Mignon"
            description="8oz center-cut tenderloin with truffle mash and red wine jus"
            price="$52"
            dietaryTags={['GF']}
            popular
          />
          <MenuItem
            name="Pan-Seared Branzino"
            description="Mediterranean sea bass with saffron fennel and caper relish"
            price="$38"
            dietaryTags={['GF', 'DF']}
          />
          <MenuItem
            name="Wild Mushroom Ravioli"
            description="Handmade pasta filled with porcini and ricotta in sage brown butter"
            price="$29"
            dietaryTags={['V']}
          />
        </MenuCategory>
      </div>

      {/* Desserts */}
      <div style={{ padding: '40px 120px 0', maxWidth: 960, margin: '0 auto' }}>
        <MenuCategory name="Desserts">
          <MenuItem
            name="Creme Brulee"
            description="Classic Tahitian vanilla custard with caramelized sugar crust"
            price="$14"
            dietaryTags={['V', 'GF']}
            popular
          />
          <MenuItem
            name="Chocolate Fondant"
            description="Warm dark chocolate cake with molten center and vanilla bean ice cream"
            price="$16"
            dietaryTags={['V']}
          />
        </MenuCategory>
      </div>

      {/* Footer */}
      <div style={{ padding: '56px 120px 48px', textAlign: 'center', marginTop: 16 }}>
        <div style={{ width: 60, height: 1, background: '#d4cbbf', margin: '0 auto 24px' }} />
        <p style={{ color: '#8c7e6a', fontSize: 14, margin: 0, lineHeight: 1.8 }}>
          Open Tuesday &ndash; Sunday &middot; 5:30 PM &ndash; 11:00 PM
        </p>
        <p style={{ color: '#b0a594', fontSize: 13, margin: '4px 0 0' }}>
          Reservations recommended &middot; 212-555-0178
        </p>
      </div>
    </div>
  );
}
