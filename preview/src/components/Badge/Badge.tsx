import type { ReactNode } from 'react';
import styles from './Badge.module.css';

type Variant = 'default' | 'primary' | 'success' | 'warning';

interface BadgeProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  const cls = [styles.badge, styles[variant], className ?? '']
    .filter(Boolean)
    .join(' ');

  return <span className={cls}>{children}</span>;
}
