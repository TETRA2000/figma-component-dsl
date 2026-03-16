import styles from './Blockquote.module.css';

interface BlockquoteProps {
  quote?: string;
  author?: string;
}

export function Blockquote({
  quote = 'Design is not just what it looks like and feels like. Design is how it works.',
  author = 'Steve Jobs',
}: BlockquoteProps) {
  return (
    <div className={styles.blockquote}>
      <p className={styles.quote}>{quote}</p>
      <span className={styles.author}>— {author}</span>
    </div>
  );
}
