import styles from './FilterChip.module.css';

interface FilterChipProps {
  label?: string;
  active?: boolean;
  className?: string;
}

export function FilterChip({
  label = 'Beach',
  active = false,
  className,
}: FilterChipProps) {
  const cls = [styles.chip, active ? styles.active : styles.inactive, className ?? '']
    .filter(Boolean)
    .join(' ');

  return <button className={cls}>{label}</button>;
}
