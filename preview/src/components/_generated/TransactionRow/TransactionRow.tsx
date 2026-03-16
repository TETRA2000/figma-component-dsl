import styles from './TransactionRow.module.css';

interface TransactionRowProps {
  title?: string;
  category?: string;
  amount?: string;
  positive?: boolean;
  date?: string;
}

export function TransactionRow({
  title = 'Apple Store',
  category = 'Shopping',
  amount = '-$129.00',
  positive = false,
  date = 'Mar 15',
}: TransactionRowProps) {
  return (
    <div className={styles.row}>
      <div className={styles.icon} />
      <div className={styles.meta}>
        <span className={styles.title}>{title}</span>
        <span className={styles.category}>{category} · {date}</span>
      </div>
      <span className={`${styles.amount} ${positive ? styles.positive : styles.negative}`}>{amount}</span>
    </div>
  );
}
