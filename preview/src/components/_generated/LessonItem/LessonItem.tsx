import styles from './LessonItem.module.css';

interface LessonItemProps {
  number?: number;
  title?: string;
  subtitle?: string;
  duration?: string;
  completed?: boolean;
}

export function LessonItem({
  number = 1,
  title = 'Introduction to the Course',
  subtitle = 'Getting started with the basics',
  duration = '8 min',
  completed = false,
}: LessonItemProps) {
  return (
    <div className={completed ? styles.itemCompleted : styles.item}>
      <div className={completed ? styles.numberCompleted : styles.number}>
        {number}
      </div>
      <div className={styles.body}>
        <p className={completed ? styles.titleCompleted : styles.title}>
          {title}
        </p>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <span className={styles.duration}>{duration}</span>
      <div
        className={
          completed ? styles.checkmarkCompleted : styles.checkmark
        }
      />
    </div>
  );
}
