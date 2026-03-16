import styles from './FilterChip.module.css';

interface FilterChipProps {
  label?: string;
  active?: boolean;
}

export function FilterChip({
  label = 'All',
  active = false,
}: FilterChipProps) {
  return (
    <span className={active ? styles.chipActive : styles.chip}>
      {label}
    </span>
  );
}
