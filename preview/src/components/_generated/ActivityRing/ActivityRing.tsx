import styles from './ActivityRing.module.css';

interface ActivityRingProps {
  value?: string;
  label?: string;
  color?: string;
  progress?: number;
}

export function ActivityRing({
  value = '580',
  label = 'Move',
  color = '#ff6347',
  progress = 0.75,
}: ActivityRingProps) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(progress, 1));

  return (
    <div className={styles.ring}>
      <div className={styles.circle}>
        <svg className={styles.circleSvg} viewBox="0 0 120 120">
          <circle className={styles.trackCircle} cx="60" cy="60" r={radius} />
          <circle
            className={styles.progressCircle}
            cx="60"
            cy="60"
            r={radius}
            stroke={color}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className={styles.valueOverlay}>
          <span className={styles.value}>{value}</span>
        </div>
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
