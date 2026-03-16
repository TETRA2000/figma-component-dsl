import styles from './WeatherDetail.module.css';

interface WeatherDetailProps {
  label?: string;
  value?: string;
  unit?: string;
}

export function WeatherDetail({
  label = 'Humidity',
  value = '65',
  unit = '%',
}: WeatherDetailProps) {
  return (
    <div className={styles.card}>
      <span className={styles.label}>{label}</span>
      <div className={styles.valueRow}>
        <span className={styles.value}>{value}</span>
        <span className={styles.unit}>{unit}</span>
      </div>
    </div>
  );
}
