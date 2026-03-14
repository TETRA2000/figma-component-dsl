import type { ReactNode, HTMLAttributes } from 'react';
import styles from './GlassCard.module.css';

type Variant = 'default' | 'elevated' | 'filled';
type Size = 'sm' | 'md' | 'lg';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

export function GlassCard({
  variant = 'default',
  size = 'md',
  children,
  className,
  ...props
}: GlassCardProps) {
  const cls = [
    styles.root,
    styles[variant],
    styles[size],
    className ?? '',
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} {...props}>
      {children}
    </div>
  );
}
