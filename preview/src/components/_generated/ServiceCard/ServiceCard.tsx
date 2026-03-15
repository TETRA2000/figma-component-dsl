import type { HTMLAttributes, ReactNode } from 'react';
import styles from './ServiceCard.module.css';

interface ServiceCardProps extends HTMLAttributes<HTMLDivElement> {
  icon: ReactNode;
  title: string;
  description: string;
  imageUrl?: string;
}

export function ServiceCard({
  icon,
  title,
  description,
  imageUrl,
  className,
  ...props
}: ServiceCardProps) {
  const cls = [styles.root, className ?? ''].filter(Boolean).join(' ');

  return (
    <div className={cls} {...props}>
      {imageUrl && (
        <div className={styles.imageArea}>
          <img src={imageUrl} alt={title} className={styles.image} />
        </div>
      )}
      <div className={styles.body}>
        <div className={styles.iconWrap}>{icon}</div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
