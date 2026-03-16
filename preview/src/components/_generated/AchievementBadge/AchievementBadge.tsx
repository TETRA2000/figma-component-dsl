import styles from './AchievementBadge.module.css';

interface AchievementBadgeProps {
  name?: string;
  earned?: boolean;
  statusLabel?: string;
}

export function AchievementBadge({
  name = 'Fast Learner',
  earned = true,
  statusLabel = 'Earned',
}: AchievementBadgeProps) {
  return (
    <div className={styles.badge}>
      <div className={earned ? styles.circleEarned : styles.circle}>
        <div
          className={
            earned ? styles.iconPlaceholderEarned : styles.iconPlaceholder
          }
        />
      </div>
      <p className={earned ? styles.name : styles.nameUnearned}>{name}</p>
      <p className={earned ? styles.status : styles.statusUnearned}>
        {statusLabel}
      </p>
    </div>
  );
}
