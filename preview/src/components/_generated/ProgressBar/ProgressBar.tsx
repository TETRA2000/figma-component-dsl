import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  label?: string;
  value?: number;
  color?: string;
}

export function ProgressBar({ label = 'Sales Target', value = 72, color = '#3b82f6' }: ProgressBarProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}%</span>
      </div>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  );
}
