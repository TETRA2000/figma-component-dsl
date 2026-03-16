import styles from './VitalCard.module.css';

interface VitalCardProps {
  label?: string;
  value?: string;
  unit?: string;
  icon?: string;
  status?: 'normal' | 'warning' | 'critical';
  color?: string;
}

const statusColors: Record<string, string> = {
  normal: '#10b981',
  warning: '#f59e0b',
  critical: '#ef4444',
};

const statusLabels: Record<string, string> = {
  normal: 'Normal',
  warning: 'Warning',
  critical: 'Critical',
};

export function VitalCard({
  label = 'Heart Rate',
  value = '72',
  unit = 'bpm',
  icon = '\u2764\ufe0f',
  status = 'normal',
  color = '#0d9488',
}: VitalCardProps) {
  const dotColor = statusColors[status] ?? statusColors.normal;
  const statusText = statusLabels[status] ?? statusLabels.normal;

  return (
    <div className={styles.card}>
      <div className={styles.statusBar} style={{ background: color }} />
      <div className={styles.iconRow}>
        <div className={styles.icon} style={{ background: `${color}15` }}>
          {icon}
        </div>
        <div className={styles.statusDot} style={{ background: dotColor }} />
      </div>
      <span className={styles.label}>{label}</span>
      <div>
        <span className={styles.value}>{value}</span>
        <span className={styles.unit}>{unit}</span>
      </div>
      <span className={styles.statusLabel} style={{ color: dotColor }}>{statusText}</span>
    </div>
  );
}
