import { type HTMLAttributes } from 'react';
import styles from './MetricRow.module.css';

export interface MetricRowProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  subValue?: string;
  dotColor?: string;
}

export function MetricRow({
  label,
  value,
  subValue,
  dotColor = '#3b82f6',
  className,
  ...props
}: MetricRowProps) {
  return (
    <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')} {...props}>
      <div className={styles.left}>
        <span className={styles.dot} style={{ background: dotColor }} />
        <span className={styles.label}>{label}</span>
      </div>
      <div className={styles.right}>
        <span className={styles.value}>{value}</span>
        {subValue && <span className={styles.subValue}>{subValue}</span>}
      </div>
    </div>
  );
}
