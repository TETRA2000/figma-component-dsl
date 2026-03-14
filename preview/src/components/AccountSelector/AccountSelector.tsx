import { type HTMLAttributes } from 'react';
import styles from './AccountSelector.module.css';

export interface AccountSelectorProps extends HTMLAttributes<HTMLDivElement> {
  accounts: { label: string; active?: boolean }[];
}

export function AccountSelector({
  accounts,
  className,
  ...props
}: AccountSelectorProps) {
  return (
    <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')} {...props}>
      {accounts.map((acc) => (
        <div key={acc.label} className={[styles.tab, acc.active ? styles.active : ''].filter(Boolean).join(' ')}>
          {acc.label}
        </div>
      ))}
    </div>
  );
}
