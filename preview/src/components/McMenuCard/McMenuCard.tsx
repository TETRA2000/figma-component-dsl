import type { HTMLAttributes } from 'react';
import styles from './McMenuCard.module.css';

type Size = 'sm' | 'md' | 'lg';

interface McMenuCardProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  description?: string;
  price: string;
  calories?: string;
  badge?: string;
  imageUrl?: string;
  size?: Size;
}

export function McMenuCard({
  name,
  description,
  price,
  calories,
  badge,
  imageUrl,
  size = 'md',
  className,
  ...props
}: McMenuCardProps) {
  const cls = [
    styles.root,
    styles[size],
    className ?? '',
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} {...props}>
      <div className={styles.imageArea}>
        {imageUrl ? (
          <img src={imageUrl} alt={name} className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span className={styles.placeholderIcon}>🍔</span>
          </div>
        )}
        {badge && <span className={styles.badge}>{badge}</span>}
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        {description && <p className={styles.description}>{description}</p>}
        <div className={styles.footer}>
          <span className={styles.price}>{price}</span>
          {calories && <span className={styles.calories}>{calories} Cal</span>}
        </div>
      </div>
    </div>
  );
}
