import type { ReactNode } from 'react';
import styles from './KanbanColumn.module.css';

interface KanbanColumnProps {
  title?: string;
  count?: number;
  color?: string;
  children?: ReactNode;
}

export function KanbanColumn({
  title = 'To Do',
  count = 3,
  color = '#3b82f6',
  children,
}: KanbanColumnProps) {
  return (
    <div className={styles.column}>
      <div className={styles.topBorder} style={{ background: color }} />
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.count} style={{ background: `${color}18`, color }}>
          {count}
        </span>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
