import type { HTMLAttributes } from 'react';
import styles from './StarRating.module.css';

interface StarRatingProps extends HTMLAttributes<HTMLDivElement> {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function StarRating({
  rating,
  reviewCount,
  size = 'md',
  className,
  ...props
}: StarRatingProps) {
  const cls = [styles.root, styles[size], className ?? ''].filter(Boolean).join(' ');

  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className={cls} {...props}>
      <span className={styles.stars} aria-label={`${rating} out of 5 stars`}>
        {'★'.repeat(fullStars)}
        {hasHalf && <span className={styles.halfStar}>★</span>}
        <span className={styles.empty}>{'★'.repeat(emptyStars)}</span>
      </span>
      {reviewCount !== undefined && (
        <span className={styles.count}>{reviewCount.toLocaleString()}</span>
      )}
    </div>
  );
}
