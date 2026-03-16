import styles from './CategoryPill.module.css';

interface CategoryPillProps {
  label?: string;
}

export function CategoryPill({ label = 'Chill' }: CategoryPillProps) {
  return (
    <div className={styles.pill}>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
