import styles from './StatBar.module.css';

interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
}

export function StatBar({
  label,
  value,
  maxValue = 100,
  color = '#39ff14',
}: StatBarProps) {
  const pct = Math.min((value / maxValue) * 100, 100);

  return (
    <div className={styles.stat}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}/{maxValue}</span>
      </div>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}
