import styles from './AccountCard.module.css';

interface AccountCardProps {
  type: string;
  accountNumber: string;
  balance: string;
  currency?: string;
}

export function AccountCard({
  type,
  accountNumber,
  balance,
  currency = 'USD',
}: AccountCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.type}>{type}</span>
        <span className={styles.account}>{accountNumber}</span>
      </div>
      <div className={styles.balanceSection}>
        <span className={styles.label}>Available Balance</span>
        <span className={styles.balance}>{balance}</span>
        <span className={styles.currency}>{currency}</span>
      </div>
    </div>
  );
}
