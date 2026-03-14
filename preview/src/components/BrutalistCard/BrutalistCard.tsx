import { HTMLAttributes } from 'react';
import styles from './BrutalistCard.module.css';

export interface BrutalistCardProps extends HTMLAttributes<HTMLDivElement> {
  number?: string;
  title?: string;
  description?: string;
}

export function BrutalistCard({
  number = '01',
  title = 'TYPOGRAPHY',
  description = 'Type is the voice of design. Make it loud.',
  className,
  ...props
}: BrutalistCardProps) {
  return (
    <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')} {...props}>
      <div className={styles.number}>{number}</div>
      <div className={styles.divider} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
