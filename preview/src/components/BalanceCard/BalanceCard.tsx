import { type HTMLAttributes } from 'react';
import styles from './BalanceCard.module.css';

export interface BalanceCardProps extends HTMLAttributes<HTMLDivElement> {
  accountName: string;
  accountNumber: string;
  balance: string;
  currency?: string;
}

export function BalanceCard({
  accountName,
  accountNumber,
  balance,
  currency = 'USD',
  className,
  ...props
}: BalanceCardProps) {
  return (
    <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')} {...props}>
      <div className={styles.top}>
        <div className={styles.avatar}>{accountName[0]}</div>
        <div className={styles.info}>
          <span className={styles.name}>{accountName}</span>
          <span className={styles.number}>{accountNumber}</span>
        </div>
      </div>
      <div className={styles.bottom}>
        <span className={styles.balanceLabel}>Available Balance</span>
        <div className={styles.balanceRow}>
          <span className={styles.balance}>{balance}</span>
          <span className={styles.currency}>{currency}</span>
        </div>
      </div>
    </div>
  );
}
