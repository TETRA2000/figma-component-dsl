import styles from './FeatureCheckRow.module.css';

interface FeatureCheckRowProps {
  label?: string;
  included?: boolean;
}

export function FeatureCheckRow({ label = 'Feature', included = true }: FeatureCheckRowProps) {
  return (
    <div className={styles.row}>
      <span className={`${styles.icon} ${included ? styles.check : styles.cross}`}>
        {included ? '✓' : '✕'}
      </span>
      <span className={`${styles.label} ${included ? styles.includedLabel : styles.excludedLabel}`}>
        {label}
      </span>
    </div>
  );
}
