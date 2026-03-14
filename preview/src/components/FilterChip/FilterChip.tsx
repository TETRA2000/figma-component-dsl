import type { HTMLAttributes } from 'react';
import styles from './FilterChip.module.css';

interface FilterChipProps extends HTMLAttributes<HTMLButtonElement> {
  label: string;
  active?: boolean;
}

export function FilterChip({
  label,
  active = false,
  className,
  ...props
}: FilterChipProps) {
  const cls = [
    styles.root,
    active ? styles.active : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  return (
    <button className={cls} {...props}>
      {label}
    </button>
  );
}
