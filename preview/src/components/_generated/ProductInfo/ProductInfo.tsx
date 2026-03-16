import { useState } from 'react';
import styles from './ProductInfo.module.css';

interface ProductInfoProps {
  name?: string;
  rating?: number;
  reviewCount?: number;
  price?: string;
  originalPrice?: string;
  description?: string;
  sizes?: string[];
}

export function ProductInfo({
  name = 'Product Name',
  rating = 4.5,
  reviewCount = 128,
  price = '$49.99',
  originalPrice = '$79.99',
  description = 'A wonderful product that you will love.',
  sizes = ['S', 'M', 'L'],
}: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState<string>(sizes[1] ?? sizes[0] ?? '');

  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const stars =
    '\u2605'.repeat(fullStars) +
    (hasHalf ? '\u00BD' : '') +
    '\u2606'.repeat(5 - fullStars - (hasHalf ? 1 : 0));

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.name}>{name}</h1>

      <div className={styles.ratingRow}>
        <span className={styles.stars}>{stars}</span>
        <span className={styles.ratingValue}>{rating}</span>
        <span className={styles.reviewCount}>({reviewCount} reviews)</span>
      </div>

      <div className={styles.priceRow}>
        <span className={styles.price}>{price}</span>
        {originalPrice && (
          <span className={styles.originalPrice}>{originalPrice}</span>
        )}
      </div>

      <p className={styles.description}>{description}</p>

      <div className={styles.sizeSection}>
        <span className={styles.sizeLabel}>Size</span>
        <div className={styles.sizePills}>
          {sizes.map((size) => (
            <button
              key={size}
              className={`${styles.sizePill} ${size === selectedSize ? styles.sizePillActive : ''}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <button className={styles.addToCart}>Add to Cart</button>
    </div>
  );
}
