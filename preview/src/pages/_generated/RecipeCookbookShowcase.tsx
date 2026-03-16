import { RecipeCard } from '../../components/_generated/RecipeCard/RecipeCard';
import { IngredientItem } from '../../components/_generated/IngredientItem/IngredientItem';
import { TimeBadge } from '../../components/_generated/TimeBadge/TimeBadge';

const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert'];

export function RecipeCookbookShowcase() {
  return (
    <div style={{ background: '#fff8e1', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ background: '#5d4037', padding: '32px 40px 24px' }}>
        <h1 style={{ color: '#fff8e1', fontSize: 32, fontWeight: 700, margin: 0 }}>The Kitchen</h1>
        <p style={{ color: '#d7ccc8', fontSize: 14, margin: '6px 0 0', fontWeight: 400 }}>
          Discover recipes that inspire your next meal
        </p>
      </div>

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: 8, padding: '20px 40px 0', flexWrap: 'wrap' }}>
        {categories.map((cat, i) => (
          <button
            key={cat}
            style={{
              padding: '8px 20px',
              borderRadius: 20,
              border: 'none',
              cursor: 'pointer',
              background: i === 0 ? '#ff9800' : '#efebe9',
              color: i === 0 ? '#ffffff' : '#5d4037',
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured recipe */}
      <div style={{ padding: '28px 40px' }}>
        <h2 style={{ color: '#5d4037', fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>
          Featured Recipe
        </h2>
        <div
          style={{
            display: 'flex',
            gap: 28,
            background: '#ffffff',
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          }}
        >
          <div
            style={{
              width: 360,
              minHeight: 260,
              background: 'linear-gradient(135deg, #ff9800 0%, #e65100 100%)',
              flexShrink: 0,
            }}
          />
          <div style={{ padding: '24px 24px 24px 0', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ color: '#5d4037', fontSize: 22, fontWeight: 700, margin: 0 }}>
                  Classic Margherita Pizza
                </h3>
                <p style={{ color: '#8d6e63', fontSize: 13, margin: '4px 0 0' }}>
                  A timeless Italian classic with fresh basil and mozzarella
                </p>
              </div>
              <TimeBadge minutes={45} />
            </div>

            <div style={{ display: 'flex', gap: 16, marginTop: 4 }}>
              <span
                style={{
                  background: '#689f38',
                  color: '#fff',
                  padding: '4px 12px',
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                Vegetarian
              </span>
              <span
                style={{
                  background: '#ff9800',
                  color: '#fff',
                  padding: '4px 12px',
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                Popular
              </span>
            </div>

            <div style={{ marginTop: 8 }}>
              <span style={{ color: '#5d4037', fontSize: 13, fontWeight: 600 }}>Ingredients</span>
              <div style={{ marginTop: 4 }}>
                <IngredientItem name="Pizza dough" amount="1 ball" checked />
                <IngredientItem name="San Marzano tomatoes" amount="200g" checked />
                <IngredientItem name="Fresh mozzarella" amount="150g" />
                <IngredientItem name="Fresh basil" amount="handful" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recipe grid */}
      <div style={{ padding: '0 40px 40px' }}>
        <h2 style={{ color: '#5d4037', fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>
          Popular Recipes
        </h2>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <RecipeCard
            title="Pasta Carbonara"
            cookingTime="30 min"
            rating={5}
            imageGradient="linear-gradient(135deg, #ffcc80 0%, #ff9800 100%)"
          />
          <RecipeCard
            title="Berry Smoothie Bowl"
            cookingTime="10 min"
            rating={4}
            imageGradient="linear-gradient(135deg, #ce93d8 0%, #7b1fa2 100%)"
          />
          <RecipeCard
            title="Avocado Toast"
            cookingTime="15 min"
            rating={4}
            imageGradient="linear-gradient(135deg, #a5d6a7 0%, #388e3c 100%)"
          />
        </div>
      </div>
    </div>
  );
}
