import styles from './QuickAction.module.css';

interface QuickActionProps {
  label: string;
  iconColor?: string;
}

export function QuickAction({
  label,
  iconColor = '#3b82f6',
}: QuickActionProps) {
  return (
    <div className={styles.action}>
      <div className={styles.circle} style={{ background: `${iconColor}20`, borderColor: `${iconColor}40` }}>
        <div className={styles.innerDot} style={{ background: iconColor }} />
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
