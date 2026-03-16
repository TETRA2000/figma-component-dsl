import styles from './MetricRow.module.css';

interface MetricRowProps {
  label?: string;
  value?: string;
  trend?: string;
  positive?: boolean;
}

export function MetricRow({ label = 'Active Users', value = '2,847', trend = '+5.3%', positive = true }: MetricRowProps) {
  return (
    <div className={styles.row}>
      <div className={styles.dot} style={{ background: positive ? '#10b981' : '#f59e0b' }} />
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
      <span className={`${styles.trend} ${positive ? styles.positive : styles.negative}`}>{trend}</span>
    </div>
  );
}
