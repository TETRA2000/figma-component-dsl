import type { HTMLAttributes } from 'react';
import styles from './PriceBadge.module.css';

interface PriceBadgeProps extends HTMLAttributes<HTMLDivElement> {
  price: string;
  period?: string;
  highlight?: boolean;
}

export function PriceBadge({
  price,
  period = 'night',
  highlight = false,
  className,
  ...props
}: PriceBadgeProps) {
  const cls = [
    styles.root,
    highlight ? styles.highlight : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} {...props}>
      <span className={styles.price}>{price}</span>
      <span className={styles.period}>/ {period}</span>
    </div>
  );
}
