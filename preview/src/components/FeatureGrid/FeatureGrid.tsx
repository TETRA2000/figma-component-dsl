import { Container } from '@/components/Container/Container';
import { Badge } from '@/components/Badge/Badge';
import { FeatureCard } from '@/components/FeatureCard/FeatureCard';
import type { Feature } from '@/components/types';
import styles from './FeatureGrid.module.css';

type Columns = 2 | 3 | 4;

interface FeatureGridProps {
  badge?: string;
  title: string;
  subtitle?: string;
  features: Feature[];
  columns?: Columns;
}

export function FeatureGrid({
  badge,
  title,
  subtitle,
  features,
  columns = 3,
}: FeatureGridProps) {
  return (
    <section className={styles.section}>
      <Container maxWidth="xl">
        <div className={styles.header}>
          {badge && <Badge variant="primary">{badge}</Badge>}
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        <div className={styles.grid} style={{ '--cols': columns } as React.CSSProperties}>
          {features.map((feature, i) => (
            <FeatureCard key={i} {...feature} />
          ))}
        </div>
      </Container>
    </section>
  );
}
