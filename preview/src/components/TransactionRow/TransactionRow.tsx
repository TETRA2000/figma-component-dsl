import styles from './TransactionRow.module.css';

interface TransactionRowProps {
  merchant: string;
  category: string;
  amount: string;
  date: string;
  positive?: boolean;
  iconColor?: string;
}

export function TransactionRow({
  merchant,
  category,
  amount,
  date,
  positive = false,
  iconColor = '#3b82f6',
}: TransactionRowProps) {
  return (
    <div className={styles.row}>
      <div className={styles.icon} style={{ background: iconColor }} />
      <div className={styles.info}>
        <span className={styles.merchant}>{merchant}</span>
        <span className={styles.category}>{category}</span>
      </div>
      <div className={styles.amountSection}>
        <span className={`${styles.amount} ${positive ? styles.positive : ''}`}>
          {positive ? '+' : '-'}{amount}
        </span>
        <span className={styles.date}>{date}</span>
      </div>
    </div>
  );
}
