import styles from './ReviewCard.module.css';

interface ReviewCardProps {
  name?: string;
  initials?: string;
  rating?: number;
  text?: string;
  date?: string;
  color?: string;
}

export function ReviewCard({
  name = 'Jane Doe',
  initials = 'JD',
  rating = 5,
  text = 'Great product!',
  date = 'Jan 1, 2025',
  color = '#2563eb',
}: ReviewCardProps) {
  const stars = '\u2605'.repeat(rating) + '\u2606'.repeat(5 - rating);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar} style={{ background: color }}>
          <span className={styles.initials}>{initials}</span>
        </div>
        <div className={styles.headerInfo}>
          <span className={styles.name}>{name}</span>
          <span className={styles.stars}>{stars}</span>
        </div>
      </div>
      <p className={styles.text}>{text}</p>
      <span className={styles.date}>{date}</span>
    </div>
  );
}
