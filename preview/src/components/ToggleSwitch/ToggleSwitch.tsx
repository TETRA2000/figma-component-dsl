import type { InputHTMLAttributes } from 'react';
import styles from './ToggleSwitch.module.css';

type Size = 'sm' | 'md' | 'lg';

interface ToggleSwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  size?: Size;
  label?: string;
}

export function ToggleSwitch({
  size = 'md',
  label,
  className,
  id,
  ...props
}: ToggleSwitchProps) {
  const cls = [
    styles.root,
    styles[size],
    className ?? '',
  ].filter(Boolean).join(' ');

  const inputId = id ?? (label ? `toggle-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);

  return (
    <label className={cls} htmlFor={inputId}>
      <input
        type="checkbox"
        className={styles.input}
        id={inputId}
        {...props}
      />
      <span className={styles.track}>
        <span className={styles.thumb} />
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}
