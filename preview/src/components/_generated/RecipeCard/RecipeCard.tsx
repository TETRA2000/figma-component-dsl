import styles from './RecipeCard.module.css';

interface RecipeCardProps {
  title?: string;
  cookingTime?: string;
  rating?: number;
  imageGradient?: string;
}

export function RecipeCard({
  title = 'Pasta Carbonara',
  cookingTime = '30 min',
  rating = 4.5,
  imageGradient = 'linear-gradient(135deg, #ff9800 0%, #ff5722 100%)',
}: RecipeCardProps) {
  const stars = Array.from({ length: 5 }, (_, i) => (i < Math.floor(rating) ? '\u2605' : '\u2606'));

  return (
    <div className={styles.card}>
      <div className={styles.image} style={{ background: imageGradient }} />
      <div className={styles.content}>
        <span className={styles.title}>{title}</span>
        <div className={styles.meta}>
          <span className={styles.time}>{cookingTime}</span>
          <span className={styles.rating}>{stars.join('')}</span>
        </div>
      </div>
    </div>
  );
}
