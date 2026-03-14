import type { HTMLAttributes } from 'react';
import styles from './MetricRow.module.css';

export interface MetricRowProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  subtext?: string;
  disabled?: boolean;
}

export function MetricRow({
  label,
  value,
  subtext,
  disabled = false,
  className,
  ...rest
}: MetricRowProps) {
  return (
    <div className={[styles.root, disabled ? styles.disabled : '', className ?? ''].filter(Boolean).join(' ')} {...rest}>
      <span className={styles.label}>{label}</span>
      <div className={styles.right}>
        <span className={styles.value}>{value}</span>
        {subtext && <span className={styles.subtext}>{subtext}</span>}
      </div>
    </div>
  );
}
