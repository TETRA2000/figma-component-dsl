import styles from './LeaderboardRow.module.css';

interface LeaderboardRowProps {
  rank: number;
  username: string;
  score: string;
  level: string;
  highlighted?: boolean;
}

export function LeaderboardRow({
  rank,
  username,
  score,
  level,
  highlighted = false,
}: LeaderboardRowProps) {
  return (
    <div className={`${styles.row} ${highlighted ? styles.highlighted : ''}`}>
      <span className={styles.rank}>#{rank}</span>
      <div className={styles.avatar} />
      <div className={styles.userInfo}>
        <span className={styles.username}>{username}</span>
        <span className={styles.level}>Lvl {level}</span>
      </div>
      <span className={styles.score}>{score}</span>
    </div>
  );
}
