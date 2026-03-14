import type { HTMLAttributes } from 'react';
import styles from './PriceTag.module.css';

interface PriceTagProps extends HTMLAttributes<HTMLDivElement> {
  price: string;
  originalPrice?: string;
  discount?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function PriceTag({
  price,
  originalPrice,
  discount,
  label,
  size = 'md',
  className,
  ...props
}: PriceTagProps) {
  const cls = [styles.root, styles[size], className ?? ''].filter(Boolean).join(' ');

  return (
    <div className={cls} {...props}>
      {discount && <span className={styles.discount}>{discount}</span>}
      <span className={styles.price}>
        {label && <span className={styles.label}>{label}</span>}
        {price}
      </span>
      {originalPrice && (
        <span className={styles.original}>
          List: <span className={styles.strikethrough}>{originalPrice}</span>
        </span>
      )}
    </div>
  );
}
