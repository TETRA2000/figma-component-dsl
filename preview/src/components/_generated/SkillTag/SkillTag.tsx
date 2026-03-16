import styles from './SkillTag.module.css';

interface SkillTagProps {
  label?: string;
}

export function SkillTag({ label = 'UI Design' }: SkillTagProps) {
  return <span className={styles.tag}>{label}</span>;
}
