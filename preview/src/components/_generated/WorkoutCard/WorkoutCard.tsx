import styles from './WorkoutCard.module.css';

interface WorkoutCardProps {
  type?: string;
  duration?: string;
  calories?: string;
  date?: string;
  icon?: string;
}

export function WorkoutCard({
  type = 'Morning Run',
  duration = '32 min',
  calories = '320 cal',
  date = 'Mar 16',
  icon = '',
}: WorkoutCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className={styles.icon}>{icon}</span>
          <span className={styles.type}>{type}</span>
        </div>
        <span className={styles.date}>{date}</span>
      </div>
      <div className={styles.metrics}>
        <div className={styles.metric}>
          <span className={styles.metricValue}>{duration}</span>
          <span className={styles.metricLabel}>Duration</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricValue}>{calories}</span>
          <span className={styles.metricLabel}>Calories</span>
        </div>
      </div>
    </div>
  );
}
