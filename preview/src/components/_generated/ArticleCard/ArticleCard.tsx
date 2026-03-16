import styles from './ArticleCard.module.css';

interface ArticleCardProps {
  title?: string;
  excerpt?: string;
  date?: string;
  tag?: string;
}

export function ArticleCard({
  title = 'The Art of Simplicity in Design',
  excerpt = 'Exploring how minimalist approaches lead to better user experiences and more impactful design outcomes.',
  date = 'Mar 12, 2026',
  tag = 'Design',
}: ArticleCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imagePlaceholder} />
      <div className={styles.content}>
        <span className={styles.tag}>{tag}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>
        <span className={styles.date}>{date}</span>
      </div>
    </div>
  );
}
