import type { HTMLAttributes } from 'react';
import styles from './LiveBadge.module.css';

export interface LiveBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  label?: string;
  variant?: 'live' | 'trending' | 'new';
}

export function LiveBadge({
  label,
  variant = 'live',
  className,
  ...rest
}: LiveBadgeProps) {
  const defaultLabels = { live: 'LIVE', trending: 'TRENDING', new: 'NEW' };
  return (
    <span
      className={[styles.root, styles[variant], className ?? ''].filter(Boolean).join(' ')}
      {...rest}
    >
      {variant === 'live' && <span className={styles.dot} />}
      {label ?? defaultLabels[variant]}
    </span>
  );
}
