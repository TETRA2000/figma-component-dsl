import type { HTMLAttributes } from 'react';
import styles from './GameCard.module.css';

export interface GameCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  genre: string;
  players: string;
  rating: string;
  isLive?: boolean;
}

export function GameCard({
  title,
  genre,
  players,
  rating,
  isLive = false,
  className,
  ...rest
}: GameCardProps) {
  return (
    <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')} {...rest}>
      <div className={styles.imageArea}>
        {isLive && <span className={styles.liveBadge}>LIVE</span>}
      </div>
      <div className={styles.info}>
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
          <span className={styles.rating}>{rating}</span>
        </div>
        <span className={styles.genre}>{genre}</span>
        <span className={styles.players}>{players}</span>
      </div>
    </div>
  );
}
