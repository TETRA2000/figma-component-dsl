import { type HTMLAttributes } from 'react';
import styles from './TransactionRow.module.css';

export interface TransactionRowProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  category: string;
  amount: string;
  date: string;
  type: 'credit' | 'debit';
  iconBg?: string;
}

export function TransactionRow({
  title,
  category,
  amount,
  date,
  type,
  iconBg = '#e3f2fd',
  className,
  ...props
}: TransactionRowProps) {
  return (
    <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')} {...props}>
      <div className={styles.left}>
        <div className={styles.icon} style={{ background: iconBg }}>
          {type === 'credit' ? '+' : '−'}
        </div>
        <div className={styles.info}>
          <span className={styles.title}>{title}</span>
          <span className={styles.category}>{category}</span>
        </div>
      </div>
      <div className={styles.right}>
        <span className={[styles.amount, styles[type]].join(' ')}>{amount}</span>
        <span className={styles.date}>{date}</span>
      </div>
    </div>
  );
}
