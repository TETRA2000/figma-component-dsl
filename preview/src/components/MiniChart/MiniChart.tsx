import styles from './MiniChart.module.css';

interface MiniChartProps {
  title: string;
  bars: number[];
  barColor?: string;
  maxValue?: number;
}

export function MiniChart({
  title,
  bars,
  barColor = '#6366f1',
  maxValue,
}: MiniChartProps) {
  const max = maxValue ?? Math.max(...bars);
  return (
    <div className={styles.chart}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.barContainer}>
        {bars.map((val, i) => (
          <div key={i} className={styles.barWrapper}>
            <div
              className={styles.bar}
              style={{
                height: `${(val / max) * 100}%`,
                background: barColor,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
