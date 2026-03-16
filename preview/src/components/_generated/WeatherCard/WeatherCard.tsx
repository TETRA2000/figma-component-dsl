import styles from './WeatherCard.module.css';

interface WeatherCardProps {
  city?: string;
  temp?: number;
  condition?: string;
  high?: number;
  low?: number;
  color?: 'sunny' | 'cloudy' | 'rainy' | 'default';
}

const gradients: Record<string, string> = {
  sunny: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
  cloudy: 'linear-gradient(135deg, #8e9eab 0%, #4a6fa5 100%)',
  rainy: 'linear-gradient(135deg, #536976 0%, #292e49 100%)',
  default: 'linear-gradient(135deg, #56ccf2 0%, #2f80ed 100%)',
};

export function WeatherCard({
  city = 'San Francisco',
  temp = 72,
  condition = 'Partly Cloudy',
  high = 76,
  low = 58,
  color = 'default',
}: WeatherCardProps) {
  return (
    <div className={styles.card} style={{ background: gradients[color] || gradients.default }}>
      <span className={styles.city}>{city}</span>
      <span className={styles.temp}>{temp}°</span>
      <span className={styles.condition}>{condition}</span>
      <div className={styles.range}>
        <span className={styles.rangeLabel}>H:{high}°</span>
        <span className={styles.rangeLabel}>L:{low}°</span>
      </div>
    </div>
  );
}
