import styles from './GameCard.module.css';

interface GameCardProps {
  title: string;
  genre: string;
  price: string;
  rating: string;
  imageColor?: string;
}

export function GameCard({
  title,
  genre,
  price,
  rating,
  imageColor = '#6d28d9',
}: GameCardProps) {
  return (
    <div className={styles.card}>
      <div
        className={styles.cover}
        style={{ background: `linear-gradient(135deg, ${imageColor}, #0f172a)` }}
      >
        <span className={styles.ratingBadge}>{rating}</span>
      </div>
      <div className={styles.info}>
        <span className={styles.genre}>{genre}</span>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.footer}>
          <span className={styles.price}>{price}</span>
          <button className={styles.buyBtn}>Buy Now</button>
        </div>
      </div>
    </div>
  );
}
