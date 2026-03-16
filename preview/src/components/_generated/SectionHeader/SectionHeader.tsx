import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  title?: string;
  subtitle?: string;
}

export function SectionHeader({ title = 'Overview', subtitle = 'Last 30 days' }: SectionHeaderProps) {
  return (
    <div className={styles.header}>
      <span className={styles.title}>{title}</span>
      <span className={styles.subtitle}>{subtitle}</span>
    </div>
  );
}
