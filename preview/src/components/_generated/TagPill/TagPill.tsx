import styles from './TagPill.module.css';

interface TagPillProps {
  label?: string;
}

export function TagPill({ label = 'Design' }: TagPillProps) {
  return <span className={styles.pill}>{label}</span>;
}
