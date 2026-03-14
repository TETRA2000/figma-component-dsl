import { type HTMLAttributes } from 'react';
import styles from './PricingTier.module.css';

export interface PricingTierProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  price: string;
  period?: string;
  features: string[];
  highlighted?: boolean;
  ctaLabel?: string;
}

export function PricingTier({
  name,
  price,
  period = '/mo',
  features,
  highlighted = false,
  ctaLabel = 'Get Started',
  className,
  ...props
}: PricingTierProps) {
  return (
    <div className={[styles.root, highlighted ? styles.highlighted : '', className ?? ''].filter(Boolean).join(' ')} {...props}>
      {highlighted && <div className={styles.badge}>Most Popular</div>}
      <div className={styles.header}>
        <span className={styles.name}>{name}</span>
        <div className={styles.priceRow}>
          <span className={styles.price}>{price}</span>
          <span className={styles.period}>{period}</span>
        </div>
      </div>
      <div className={styles.divider} />
      <ul className={styles.features}>
        {features.map((f) => (
          <li key={f} className={styles.feature}>
            <span className={styles.check}>✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <button className={[styles.cta, highlighted ? styles.ctaHighlighted : ''].filter(Boolean).join(' ')}>
        {ctaLabel}
      </button>
    </div>
  );
}
