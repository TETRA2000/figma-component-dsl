import styles from './UsernameTag.module.css';

interface UsernameTagProps {
  name?: string;
  level?: string;
}

export function UsernameTag({ name = 'xNova_', level = 'Lv. 42' }: UsernameTagProps) {
  return (
    <div className={styles.tag}>
      <span className={styles.name}>{name}</span>
      <span className={styles.level}>{level}</span>
    </div>
  );
}
