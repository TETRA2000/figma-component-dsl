import styles from './MiniCalendar.module.css';

interface MiniCalendarProps {
  month?: string;
  year?: number;
  todayDate?: number;
  dates?: (number | null)[];
}

const DEFAULT_DATES: (number | null)[] = [
  null, null, null, null, null, null, 1,
  2, 3, 4, 5, 6, 7, 8,
  9, 10, 11, 12, 13, 14, 15,
  16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29,
  30, 31, null, null, null, null, null,
];

const DAY_HEADERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function MiniCalendar({
  month = 'March',
  year = 2026,
  todayDate = 16,
  dates = DEFAULT_DATES,
}: MiniCalendarProps) {
  const rows: (number | null)[][] = [];
  for (let i = 0; i < dates.length; i += 7) {
    rows.push(dates.slice(i, i + 7));
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <span className={styles.monthYear}>
          {month} {year}
        </span>
      </div>
      <div className={styles.grid}>
        {DAY_HEADERS.map((day, i) => (
          <span key={`h-${i}`} className={styles.dayHeader}>
            {day}
          </span>
        ))}
        {rows.map((row, ri) =>
          row.map((date, ci) => (
            <span
              key={`${ri}-${ci}`}
              className={
                date === todayDate
                  ? styles.dateToday
                  : date
                    ? styles.date
                    : styles.dateEmpty
              }
            >
              {date ?? ''}
            </span>
          )),
        )}
      </div>
    </div>
  );
}
