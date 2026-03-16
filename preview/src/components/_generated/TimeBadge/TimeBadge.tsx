import styles from './TimeBadge.module.css';

interface TimeBadgeProps {
  minutes?: number;
}

export function TimeBadge({ minutes = 30 }: TimeBadgeProps) {
  return (
    <div className={styles.badge}>
      <span className={styles.icon}>{'\u23F1'}</span>
      <span className={styles.value}>{minutes}m</span>
    </div>
  );
}
