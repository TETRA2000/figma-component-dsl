import type { HTMLAttributes } from 'react';
import styles from './StatCard.module.css';

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'flat';
}

export function StatCard({
  label,
  value,
  change,
  trend = 'flat',
  className,
  ...rest
}: StatCardProps) {
  return (
    <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')} {...rest}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
      {change && (
        <span className={[styles.change, styles[trend]].join(' ')}>
          {trend === 'up' ? '+' : trend === 'down' ? '' : ''}{change}
        </span>
      )}
    </div>
  );
}
