import { type HTMLAttributes } from 'react';
import styles from './LiveBadge.module.css';

export interface LiveBadgeProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
}

export function LiveBadge({
  label = 'LIVE',
  className,
  ...props
}: LiveBadgeProps) {
  return (
    <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')} {...props}>
      <div className={styles.dot} />
      <span className={styles.label}>{label}</span>
    </div>
  );
}
