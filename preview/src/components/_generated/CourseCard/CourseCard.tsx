import styles from './CourseCard.module.css';

interface CourseCardProps {
  title?: string;
  instructor?: string;
  lessonsCount?: number;
  duration?: string;
  progress?: number;
  category?: string;
}

export function CourseCard({
  title = 'Introduction to Web Development',
  instructor = 'Sarah Johnson',
  lessonsCount = 24,
  duration = '12h 30m',
  progress = 65,
  category = 'Development',
}: CourseCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.thumbnail}>
        <span className={styles.categoryBadge}>{category}</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.instructor}>{instructor}</p>
        <div className={styles.meta}>
          <span className={styles.lessons}>{lessonsCount} lessons</span>
          <span className={styles.duration}>{duration}</span>
        </div>
        <div className={styles.progressSection}>
          <div className={styles.progressHeader}>
            <span className={styles.progressLabel}>Progress</span>
            <span className={styles.progressPercent}>{progress}%</span>
          </div>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
