import type { HTMLAttributes } from 'react';
import styles from './CorporateHero.module.css';

interface CorporateHeroProps extends HTMLAttributes<HTMLElement> {
  companyName: string;
  tagline: string;
  subtitle?: string;
  imageUrl?: string;
}

export function CorporateHero({
  companyName,
  tagline,
  subtitle,
  imageUrl,
  className,
  ...props
}: CorporateHeroProps) {
  const cls = [styles.root, className ?? ''].filter(Boolean).join(' ');

  return (
    <section className={cls} {...props}>
      <div className={styles.overlay} />
      {imageUrl && (
        <img src={imageUrl} alt="" className={styles.bgImage} />
      )}
      <div className={styles.content}>
        <span className={styles.companyName}>{companyName}</span>
        <h1 className={styles.tagline}>{tagline}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </section>
  );
}
