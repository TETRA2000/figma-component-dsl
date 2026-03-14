import { type HTMLAttributes } from 'react';
import styles from './RecipeCard.module.css';

export interface RecipeCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  time: string;
  difficulty: string;
  imageBg?: string;
  tags?: string[];
}

export function RecipeCard({
  title,
  description,
  time,
  difficulty,
  imageBg = '#f9e4c8',
  tags = [],
  className,
  ...props
}: RecipeCardProps) {
  return (
    <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')} {...props}>
      <div className={styles.image} style={{ background: imageBg }}>
        <div className={styles.timeBadge}>{time}</div>
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.difficulty}>{difficulty}</span>
          {tags.map((t) => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
