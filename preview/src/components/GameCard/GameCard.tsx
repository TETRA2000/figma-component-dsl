import { type HTMLAttributes } from 'react';
import styles from './GameCard.module.css';

export interface GameCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  genre: string;
  players: string;
  accentColor?: 'pink' | 'blue' | 'green';
}

export function GameCard({
  title,
  genre,
  players,
  accentColor = 'pink',
  className,
  ...props
}: GameCardProps) {
  return (
    <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')} {...props}>
      <div className={[styles.imagePlaceholder, styles[accentColor]].join(' ')} />
      <div className={styles.body}>
        <span className={styles.genre}>{genre}</span>
        <span className={styles.title}>{title}</span>
        <div className={styles.footer}>
          <span className={styles.players}>{players} playing</span>
        </div>
      </div>
    </div>
  );
}
