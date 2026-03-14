import { HTMLAttributes } from 'react';
import styles from './GlassFeatureCard.module.css';

export interface GlassFeatureCardProps extends HTMLAttributes<HTMLDivElement> {
  icon?: string;
  title?: string;
  description?: string;
}

export function GlassFeatureCard({
  icon = '◆',
  title = 'Feature',
  description = 'A powerful feature that makes everything better.',
  className,
  ...props
}: GlassFeatureCardProps) {
  return (
    <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')} {...props}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
