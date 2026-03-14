import { Star } from 'lucide-react';
import type { Testimonial } from '@/components/types';
import styles from './TestimonialCard.module.css';

export function TestimonialCard({ quote, author, title, avatar, rating }: Testimonial) {
  return (
    <div className={styles.card}>
      {rating && (
        <div className={styles.stars}>
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} size={16} fill="currentColor" />
          ))}
        </div>
      )}
      <blockquote className={styles.quote}>"{quote}"</blockquote>
      <div className={styles.author}>
        {avatar && (
          <img src={avatar} alt={author} className={styles.avatar} />
        )}
        <div>
          <div className={styles.name}>{author}</div>
          <div className={styles.title}>{title}</div>
        </div>
      </div>
    </div>
  );
}
