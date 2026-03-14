import type { HTMLAttributes } from 'react';
import styles from './SegmentedControl.module.css';

type Size = 'sm' | 'md' | 'lg';

interface SegmentedControlProps extends HTMLAttributes<HTMLDivElement> {
  items: string[];
  value?: string;
  size?: Size;
  onValueChange?: (value: string) => void;
}

export function SegmentedControl({
  items,
  value,
  size = 'md',
  onValueChange,
  className,
  ...props
}: SegmentedControlProps) {
  const selectedValue = value ?? items[0];

  const cls = [
    styles.root,
    styles[size],
    className ?? '',
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} role="tablist" {...props}>
      {items.map((item) => (
        <button
          key={item}
          role="tab"
          aria-selected={item === selectedValue}
          className={[
            styles.segment,
            item === selectedValue ? styles.active : '',
          ].filter(Boolean).join(' ')}
          onClick={() => onValueChange?.(item)}
          type="button"
        >
          {item}
        </button>
      ))}
    </div>
  );
}
