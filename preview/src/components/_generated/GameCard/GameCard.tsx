import styles from './GameCard.module.css';

interface GameCardProps {
  title?: string;
  genre?: string;
  players?: string;
}

export function GameCard({ title = 'Cyber Nexus', genre = 'Action RPG', players = '24.5K playing' }: GameCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cover}>
        <div className={styles.liveBadge}>LIVE</div>
      </div>
      <div className={styles.info}>
        <span className={styles.title}>{title}</span>
        <span className={styles.genre}>{genre}</span>
        <span className={styles.players}>{players}</span>
      </div>
    </div>
  );
}
