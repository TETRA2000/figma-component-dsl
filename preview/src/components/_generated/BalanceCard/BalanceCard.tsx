import styles from './BalanceCard.module.css';

interface BalanceCardProps {
  label?: string;
  amount?: string;
  accountNo?: string;
}

export function BalanceCard({ label = 'Total Balance', amount = '$24,580.45', accountNo = '•••• 4892' }: BalanceCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <span className={styles.label}>{label}</span>
        <span className={styles.account}>{accountNo}</span>
      </div>
      <span className={styles.amount}>{amount}</span>
      <div className={styles.actions}>
        <div className={styles.actionBtn}>Send</div>
        <div className={styles.actionBtn}>Receive</div>
        <div className={styles.actionBtn}>Pay</div>
      </div>
    </div>
  );
}
