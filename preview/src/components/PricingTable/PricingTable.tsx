import { Container } from '@/components/Container/Container';
import { Badge } from '@/components/Badge/Badge';
import { PricingCard } from '@/components/PricingCard/PricingCard';
import type { PricingPlan } from '@/components/types';
import styles from './PricingTable.module.css';

interface PricingTableProps {
  badge?: string;
  title: string;
  subtitle?: string;
  plans: PricingPlan[];
}

export function PricingTable({ badge, title, subtitle, plans }: PricingTableProps) {
  return (
    <section className={styles.section}>
      <Container maxWidth="xl">
        <div className={styles.header}>
          {badge && <Badge variant="primary">{badge}</Badge>}
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        <div className={styles.grid}>
          {plans.map((plan, i) => (
            <PricingCard key={i} {...plan} />
          ))}
        </div>
      </Container>
    </section>
  );
}
