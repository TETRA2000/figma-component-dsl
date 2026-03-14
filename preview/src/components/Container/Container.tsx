import type { ReactNode } from 'react';
import styles from './Container.module.css';

type MaxWidth = 'sm' | 'md' | 'lg' | 'xl';

interface ContainerProps {
  maxWidth?: MaxWidth;
  padding?: boolean;
  children: ReactNode;
  className?: string;
}

export function Container({
  maxWidth = 'xl',
  padding = true,
  children,
  className,
}: ContainerProps) {
  const cls = [
    styles.container,
    styles[maxWidth],
    padding ? styles.padded : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={cls}>{children}</div>;
}
