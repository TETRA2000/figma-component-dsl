import styles from './AuthorByline.module.css';

interface AuthorBylineProps {
  name?: string;
  role?: string;
}

export function AuthorByline({ name = 'Elena Vasquez', role = 'Senior Designer' }: AuthorBylineProps) {
  return (
    <div className={styles.byline}>
      <div className={styles.avatar} />
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <span className={styles.role}>{role}</span>
      </div>
    </div>
  );
}
