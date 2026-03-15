import type { HTMLAttributes } from 'react';
import styles from './NewsItem.module.css';

type Category = 'press' | 'ir' | 'product' | 'event';

interface NewsItemProps extends HTMLAttributes<HTMLDivElement> {
  date: string;
  category: Category;
  title: string;
  imageUrl?: string;
}

const categoryLabels: Record<Category, string> = {
  press: 'Press Release',
  ir: 'IR',
  product: 'Product',
  event: 'Event',
};

export function NewsItem({
  date,
  category = 'press',
  title,
  imageUrl,
  className,
  ...props
}: NewsItemProps) {
  const cls = [styles.root, className ?? ''].filter(Boolean).join(' ');

  return (
    <div className={cls} {...props}>
      {imageUrl && (
        <div className={styles.thumb}>
          <img src={imageUrl} alt="" className={styles.thumbImage} />
        </div>
      )}
      <div className={styles.body}>
        <div className={styles.meta}>
          <time className={styles.date}>{date}</time>
          <span className={`${styles.category} ${styles[category]}`}>
            {categoryLabels[category]}
          </span>
        </div>
        <p className={styles.title}>{title}</p>
      </div>
    </div>
  );
}
