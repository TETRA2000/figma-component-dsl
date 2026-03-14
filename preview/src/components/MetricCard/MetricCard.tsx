import styles from './MetricCard.module.css';

interface MetricCardProps {
  label: string;
  value: string;
  change: string;
  positive?: boolean;
  accentColor?: string;
}

export function MetricCard({
  label,
  value,
  change,
  positive = true,
  accentColor = '#6366f1',
}: MetricCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.accent} style={{ background: accentColor }} />
      <div className={styles.content}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
        <span className={`${styles.change} ${positive ? styles.positive : styles.negative}`}>
          {positive ? '+' : ''}{change}
        </span>
      </div>
    </div>
  );
}
