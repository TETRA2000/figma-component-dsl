import type { HTMLAttributes } from 'react';
import styles from './CompanyProfile.module.css';

interface StatData {
  value: string;
  label: string;
}

interface CompanyProfileProps extends HTMLAttributes<HTMLElement> {
  heading: string;
  description: string;
  stats: StatData[];
  imageUrl?: string;
}

export function CompanyProfile({
  heading,
  description,
  stats,
  imageUrl,
  className,
  ...props
}: CompanyProfileProps) {
  const cls = [styles.root, className ?? ''].filter(Boolean).join(' ');

  return (
    <section className={cls} {...props}>
      <div className={styles.container}>
        <div className={styles.textColumn}>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.description}>{description}</p>
          <div className={styles.statsGrid}>
            {stats.map((stat, i) => (
              <div key={i} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        {imageUrl && (
          <div className={styles.imageColumn}>
            <img src={imageUrl} alt={heading} className={styles.image} />
          </div>
        )}
      </div>
    </section>
  );
}
