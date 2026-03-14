import { type HTMLAttributes } from 'react';
import styles from './StatCard.module.css';

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  accentColor?: string;
}

export function StatCard({
  label,
  value,
  change,
  trend,
  accentColor = '#3b82f6',
  className,
  ...props
}: StatCardProps) {
  return (
    <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')} {...props}>
      <div className={styles.accent} style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}88)` }} />
      <div className={styles.content}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
        <span className={[styles.change, styles[trend]].join(' ')}>
          {trend === 'up' ? '\u2191' : '\u2193'} {change}
        </span>
      </div>
    </div>
  );
}
