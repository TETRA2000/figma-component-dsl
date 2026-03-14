import { Container } from '@/components/Container/Container';
import type { StatItem } from '@/components/types';
import styles from './Stats.module.css';

type Variant = 'inline' | 'cards';

interface StatsProps {
  stats: StatItem[];
  variant?: Variant;
}

export function Stats({ stats, variant = 'inline' }: StatsProps) {
  return (
    <section className={`${styles.section} ${styles[variant]}`}>
      <Container maxWidth="xl">
        <div className={styles.grid}>
          {stats.map((stat, i) => (
            <div key={i} className={styles.stat}>
              <span className={styles.value}>{stat.value}</span>
              <span className={styles.label}>{stat.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
