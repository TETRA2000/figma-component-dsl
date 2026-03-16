import styles from './ForecastDay.module.css';

interface ForecastDayProps {
  day?: string;
  high?: number;
  low?: number;
  icon?: string;
}

export function ForecastDay({
  day = 'Mon',
  high = 74,
  low = 58,
  icon = '⛅',
}: ForecastDayProps) {
  return (
    <div className={styles.container}>
      <span className={styles.day}>{day}</span>
      <span className={styles.icon}>{icon}</span>
      <div className={styles.temps}>
        <span className={styles.high}>{high}°</span>
        <span className={styles.low}>{low}°</span>
      </div>
    </div>
  );
}
