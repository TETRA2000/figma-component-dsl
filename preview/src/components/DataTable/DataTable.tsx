import styles from './DataTable.module.css';

interface DataRow {
  name: string;
  value: string;
  trend: string;
  status: 'up' | 'down' | 'flat';
}

interface DataTableProps {
  title: string;
  rows: DataRow[];
}

export function DataTable({ title, rows }: DataTableProps) {
  return (
    <div className={styles.table}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.header}>
        <span className={styles.headerCell}>Channel</span>
        <span className={styles.headerCell}>Revenue</span>
        <span className={styles.headerCell}>Trend</span>
      </div>
      {rows.map((row, i) => (
        <div key={i} className={styles.row}>
          <span className={styles.name}>{row.name}</span>
          <span className={styles.value}>{row.value}</span>
          <span className={`${styles.trend} ${styles[row.status]}`}>{row.trend}</span>
        </div>
      ))}
    </div>
  );
}
