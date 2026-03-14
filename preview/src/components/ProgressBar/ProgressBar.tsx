import type { HTMLAttributes } from 'react';
import styles from './ProgressBar.module.css';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: number;
  max?: number;
  color?: 'blue' | 'emerald' | 'amber';
}

export function ProgressBar({
  label,
  value,
  max = 100,
  color = 'blue',
  className,
  ...rest
}: ProgressBarProps) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')} {...rest}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}/{max}</span>
      </div>
      <div className={styles.track}>
        <div className={[styles.fill, styles[color]].join(' ')} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
