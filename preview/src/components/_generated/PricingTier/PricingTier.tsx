import type { ReactNode } from 'react';
import styles from './PricingTier.module.css';

interface PricingTierProps {
  tierName?: string;
  price?: string;
  period?: string;
  description?: string;
  highlighted?: boolean;
  ctaLabel?: string;
  onCtaClick?: () => void;
  children?: ReactNode;
}

export function PricingTier({
  tierName = 'Pro',
  price = '$29',
  period = '/mo',
  description = 'Best for growing teams',
  highlighted = false,
  ctaLabel = 'Get Started',
  onCtaClick,
  children,
}: PricingTierProps) {
  return (
    <div className={`${styles.card} ${highlighted ? styles.highlighted : styles.default}`}>
      {highlighted && <div className={styles.popularBadge}>Most Popular</div>}
      <div className={styles.header}>
        <span className={styles.tierName}>{tierName}</span>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.priceRow}>
        <span className={styles.price}>{price}</span>
        <span className={styles.period}>{period}</span>
      </div>
      <div className={styles.features}>{children}</div>
      <button
        className={`${styles.cta} ${highlighted ? styles.ctaHighlighted : styles.ctaDefault}`}
        onClick={onCtaClick}
        type="button"
      >
        {ctaLabel}
      </button>
    </div>
  );
}
