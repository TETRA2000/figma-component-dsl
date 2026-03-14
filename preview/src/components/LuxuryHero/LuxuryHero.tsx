import { HTMLAttributes } from 'react';
import styles from './LuxuryHero.module.css';

export interface LuxuryHeroProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}

export function LuxuryHero({
  title = 'MAISON NOIR',
  subtitle = 'Where elegance meets innovation. A curated experience for the discerning.',
  className,
  ...props
}: LuxuryHeroProps) {
  return (
    <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')} {...props}>
      <div className={styles.badge}>EST. 2024</div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.goldLine} />
      <p className={styles.subtitle}>{subtitle}</p>
      <button className={styles.cta}>DISCOVER</button>
    </div>
  );
}
