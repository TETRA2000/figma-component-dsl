import styles from './StatCard.module.css';

interface StatCardProps {
  label?: string;
  value?: string;
  change?: string;
  positive?: boolean;
}

export function StatCard({ label = 'Revenue', value = '$48,250', change = '+12.5%', positive = true }: StatCardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
      <span className={`${styles.change} ${positive ? styles.positive : styles.negative}`}>{change}</span>
    </div>
  );
}
