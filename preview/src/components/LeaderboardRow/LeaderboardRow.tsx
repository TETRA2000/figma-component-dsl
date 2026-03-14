import { type HTMLAttributes } from 'react';
import styles from './LeaderboardRow.module.css';

export interface LeaderboardRowProps extends HTMLAttributes<HTMLDivElement> {
  rank: number;
  username: string;
  score: string;
}

export function LeaderboardRow({
  rank,
  username,
  score,
  className,
  ...props
}: LeaderboardRowProps) {
  return (
    <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')} {...props}>
      <span className={styles.rank}>#{rank}</span>
      <span className={styles.username}>{username}</span>
      <span className={styles.score}>{score}</span>
    </div>
  );
}
