import { type HTMLAttributes } from 'react';
import styles from './ProgressBar.module.css';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: number;
  color?: string;
}

export function ProgressBar({
  label,
  value,
  color = '#3b82f6',
  className,
  ...props
}: ProgressBarProps) {
  return (
    <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')} {...props}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <span className={styles.percentage}>{value}%</span>
      </div>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${value}%`, background: color }}
        />
      </div>
    </div>
  );
}
