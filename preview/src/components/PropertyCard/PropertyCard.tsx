import type { HTMLAttributes, ReactNode } from 'react';
import styles from './PropertyCard.module.css';

interface PropertyCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  location: string;
  price: string;
  rating: string;
  reviews: number;
  imageColor?: string;
  superhost?: boolean;
}

export function PropertyCard({
  title,
  location,
  price,
  rating,
  reviews,
  imageColor = '#d4c5b9',
  superhost = false,
  className,
  ...props
}: PropertyCardProps) {
  const cls = [styles.root, className ?? ''].filter(Boolean).join(' ');

  return (
    <div className={cls} {...props}>
      <div className={styles.imageArea} style={{ backgroundColor: imageColor }}>
        {superhost && <span className={styles.superhostBadge}>SUPERHOST</span>}
      </div>
      <div className={styles.details}>
        <div className={styles.topRow}>
          <span className={styles.location}>{location}</span>
          <span className={styles.ratingRow}>
            <span className={styles.star}>&#9733;</span>
            <span className={styles.ratingText}>{rating}</span>
            <span className={styles.reviewCount}>({reviews})</span>
          </span>
        </div>
        <p className={styles.title}>{title}</p>
        <p className={styles.price}>
          <strong>{price}</strong> / night
        </p>
      </div>
    </div>
  );
}
