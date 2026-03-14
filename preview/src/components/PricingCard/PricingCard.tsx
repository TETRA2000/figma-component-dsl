import { Check } from 'lucide-react';
import { Button } from '@/components/Button/Button';
import type { PricingPlan } from '@/components/types';
import styles from './PricingCard.module.css';

export function PricingCard({
  name,
  price,
  period = '/mo',
  description,
  features,
  cta,
  highlighted = false,
}: PricingPlan) {
  return (
    <div className={`${styles.card} ${highlighted ? styles.highlighted : ''}`}>
      {highlighted && <div className={styles.popularBadge}>Most Popular</div>}
      <div className={styles.header}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.priceRow}>
          <span className={styles.price}>{price}</span>
          {period && <span className={styles.period}>{period}</span>}
        </div>
      </div>
      <ul className={styles.features}>
        {features.map((feature, i) => (
          <li key={i} className={styles.featureItem}>
            <Check size={18} className={styles.check} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        variant={highlighted ? 'primary' : 'outline'}
        fullWidth
      >
        {cta}
      </Button>
    </div>
  );
}
