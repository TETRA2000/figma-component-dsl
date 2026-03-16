import styles from './LeaderboardRow.module.css';

interface LeaderboardRowProps {
  rank?: number;
  name?: string;
  score?: string;
  isTop?: boolean;
}

export function LeaderboardRow({ rank = 1, name = 'xNova_', score = '48,250 pts', isTop = false }: LeaderboardRowProps) {
  return (
    <div className={`${styles.row} ${isTop ? styles.top : ''}`}>
      <span className={styles.rank}>#{rank}</span>
      <div className={styles.avatar} />
      <span className={styles.name}>{name}</span>
      <span className={styles.score}>{score}</span>
    </div>
  );
}
