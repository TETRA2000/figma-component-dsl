import type { ReactNode } from 'react';
import styles from './DayColumn.module.css';

interface DayColumnProps {
  dayName?: string;
  dateNumber?: number;
  isToday?: boolean;
  children?: ReactNode;
}

export function DayColumn({
  dayName = 'Mon',
  dateNumber = 16,
  isToday = false,
  children,
}: DayColumnProps) {
  return (
    <div className={styles.column}>
      <div className={styles.header}>
        <span className={styles.dayName}>{dayName}</span>
        <span className={isToday ? styles.dateToday : styles.date}>
          {dateNumber}
        </span>
      </div>
      <div className={styles.eventList}>{children}</div>
    </div>
  );
}
