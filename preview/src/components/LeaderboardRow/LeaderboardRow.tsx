import type { HTMLAttributes } from 'react';
import styles from './LeaderboardRow.module.css';

export interface LeaderboardRowProps extends HTMLAttributes<HTMLDivElement> {
  rank: number;
  username: string;
  score: string;
  avatar?: string;
}

export function LeaderboardRow({
  rank,
  username,
  score,
  className,
  ...rest
}: LeaderboardRowProps) {
  const isTop3 = rank <= 3;
  return (
    <div className={[styles.root, isTop3 ? styles.top3 : '', className ?? ''].filter(Boolean).join(' ')} {...rest}>
      <span className={[styles.rank, isTop3 ? styles.rankGlow : ''].filter(Boolean).join(' ')}>
        #{rank}
      </span>
      <div className={styles.avatar} />
      <span className={styles.username}>{username}</span>
      <span className={styles.score}>{score}</span>
    </div>
  );
}
