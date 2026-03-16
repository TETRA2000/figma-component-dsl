import styles from './AgentCard.module.css';

interface AgentCardProps {
  name?: string;
  initials?: string;
  phone?: string;
  rating?: number;
  reviewCount?: number;
}

export function AgentCard({
  name = 'Sarah Johnson',
  initials = 'SJ',
  phone = '(512) 555-0147',
  rating = 4.9,
  reviewCount = 127,
}: AgentCardProps) {
  const stars = '\u2605'.repeat(Math.floor(rating));
  return (
    <div className={styles.card}>
      <div className={styles.avatar}>{initials}</div>
      <h4 className={styles.name}>{name}</h4>
      <p className={styles.phone}>{phone}</p>
      <div className={styles.rating}>
        <span>{stars}</span>
        <span>{rating}</span>
        <span className={styles.ratingCount}>({reviewCount} reviews)</span>
      </div>
    </div>
  );
}
