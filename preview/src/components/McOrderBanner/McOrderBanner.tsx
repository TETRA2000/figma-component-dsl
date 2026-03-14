import type { ReactNode, HTMLAttributes } from 'react';
import styles from './McOrderBanner.module.css';

type Variant = 'promo' | 'delivery' | 'reward' | 'info';

interface McOrderBannerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function McOrderBanner({
  variant = 'promo',
  title,
  subtitle,
  action,
  className,
  ...props
}: McOrderBannerProps) {
  const cls = [
    styles.root,
    styles[variant],
    className ?? '',
  ].filter(Boolean).join(' ');

  const icons: Record<Variant, string> = {
    promo: '🎉',
    delivery: '🛵',
    reward: '⭐',
    info: 'ℹ️',
  };

  return (
    <div className={cls} {...props}>
      <span className={styles.icon}>{icons[variant]}</span>
      <div className={styles.content}>
        <span className={styles.title}>{title}</span>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
