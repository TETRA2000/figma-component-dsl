import styles from './StepCounter.module.css';

interface StepCounterProps {
  steps?: number;
  goal?: number;
  color?: string;
}

export function StepCounter({
  steps = 8432,
  goal = 10000,
  color = '#84cc16',
}: StepCounterProps) {
  const progress = Math.min(steps / goal, 1);
  const percentage = Math.round(progress * 100);
  const remaining = goal - steps;

  return (
    <div className={styles.container}>
      <div>
        <span className={styles.stepCount}>{steps.toLocaleString()}</span>
        <span className={styles.goalText}> / {goal.toLocaleString()} steps</span>
      </div>
      <div className={styles.progressBarTrack}>
        <div
          className={styles.progressBarFill}
          style={{ width: `${percentage}%`, background: color }}
        />
      </div>
      <div className={styles.footer}>
        <span className={styles.percentage} style={{ color }}>{percentage}% complete</span>
        <span className={styles.remaining}>{remaining.toLocaleString()} to go</span>
      </div>
    </div>
  );
}
