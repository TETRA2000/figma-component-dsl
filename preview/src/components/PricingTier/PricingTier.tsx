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
    <div
      className={[styles.root, highlighted ? styles.highlighted : styles.default, className ?? ''].filter(Boolean).join(' ')}
      {...props}
    >
      <div className={styles.header}>
        <span className={styles.name}>{name}</span>
        <div className={styles.priceRow}>
          <span className={styles.price}>{price}</span>
          <span className={styles.period}>{period}</span>
        </div>
      </div>
      <div className={styles.features}>
        {features.map((f) => (
          <div key={f} className={styles.featureRow}>
            <span className={styles.check}>✓</span>
            <span className={styles.featureText}>{f}</span>
          </div>
        ))}
      </div>
      <button className={[styles.cta, highlighted ? styles.ctaHighlighted : styles.ctaDefault].join(' ')}>
        {ctaLabel}
      </button>
    </div>
  );
}
