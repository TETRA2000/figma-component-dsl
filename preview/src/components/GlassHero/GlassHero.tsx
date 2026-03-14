import { HTMLAttributes } from 'react';
import styles from './GlassHero.module.css';

export interface GlassHeroProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}

export function GlassHero({
  title = 'The Future of Design',
  subtitle = 'Transparent, layered, and beautiful.',
  className,
  ...props
}: GlassHeroProps) {
  return (
    <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')} {...props}>
      <div className={styles.glassPanel}>
        <div className={styles.badge}>GLASS UI</div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <button className={styles.cta}>Get Started</button>
      </div>
    </div>
  );
}
