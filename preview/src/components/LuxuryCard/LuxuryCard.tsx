import { HTMLAttributes } from 'react';
import styles from './LuxuryCard.module.css';

export interface LuxuryCardProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  title?: string;
  description?: string;
}

export function LuxuryCard({
  label = 'COLLECTION',
  title = 'Midnight Series',
  description = 'Crafted with precision and care for those who appreciate the finer details.',
  className,
  ...props
}: LuxuryCardProps) {
  return (
    <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')} {...props}>
      <div className={styles.label}>{label}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.line} />
    </div>
  );
}
