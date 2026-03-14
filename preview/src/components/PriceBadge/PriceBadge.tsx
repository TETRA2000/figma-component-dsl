import styles from './PriceBadge.module.css';

type Variant = 'default' | 'highlight';

interface PriceBadgeProps {
  variant?: Variant;
  label?: string;
  className?: string;
}

export function PriceBadge({
  variant = 'default',
  label = 'Superhost',
  className,
}: PriceBadgeProps) {
  const cls = [styles.badge, styles[variant], className ?? '']
    .filter(Boolean)
    .join(' ');

  return <span className={cls}>{label}</span>;
}
