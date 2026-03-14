import { HTMLAttributes } from 'react';
import styles from './BrutalistHero.module.css';

export interface BrutalistHeroProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}

export function BrutalistHero({
  title = 'DESIGN IS NOT DECORATION',
  subtitle = 'Raw. Honest. Functional.',
  className,
  ...props
}: BrutalistHeroProps) {
  return (
    <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')} {...props}>
      <div className={styles.badge}>BRUTALIST</div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
      <div className={styles.cta}>EXPLORE NOW →</div>
    </div>
  );
}
