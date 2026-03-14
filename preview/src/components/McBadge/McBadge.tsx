import type { ReactNode, HTMLAttributes } from 'react';
import styles from './McBadge.module.css';

type Variant = 'promo' | 'new' | 'limited' | 'value';

interface McBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
  children: ReactNode;
}

export function McBadge({
  variant = 'promo',
  children,
  className,
  ...props
}: McBadgeProps) {
  const cls = [
    styles.root,
    styles[variant],
    className ?? '',
  ].filter(Boolean).join(' ');

  return (
    <span className={cls} {...props}>
      {children}
    </span>
  );
}
