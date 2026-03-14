import type { HTMLAttributes } from 'react';
import styles from './ProductCard.module.css';
import { StarRating } from '../StarRating/StarRating';
import { PriceTag } from '../PriceTag/PriceTag';

interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  rating?: number;
  reviewCount?: number;
  price: string;
  originalPrice?: string;
  discount?: string;
  prime?: boolean;
  badge?: string;
  inStock?: boolean;
}

export function ProductCard({
  image,
  title,
  rating,
  reviewCount,
  price,
  originalPrice,
  discount,
  prime = false,
  badge,
  inStock = true,
  className,
  ...props
}: ProductCardProps) {
  const cls = [styles.root, className ?? ''].filter(Boolean).join(' ');

  return (
    <div className={cls} {...props}>
      <div className={styles.imageWrap}>
        {badge && <span className={styles.badge}>{badge}</span>}
        <img className={styles.image} src={image} alt={title} />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        {rating !== undefined && (
          <StarRating rating={rating} reviewCount={reviewCount} size="sm" />
        )}
        <PriceTag
          price={price}
          originalPrice={originalPrice}
          discount={discount}
          size="md"
        />
        {prime && (
          <span className={styles.prime}>
            <span className={styles.primeCheck}>✓</span> prime
          </span>
        )}
        <span className={inStock ? styles.inStock : styles.outOfStock}>
          {inStock ? 'In Stock' : 'Currently unavailable'}
        </span>
        <button className={styles.addToCart} type="button">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
