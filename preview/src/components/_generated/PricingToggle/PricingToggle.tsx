import styles from './PricingToggle.module.css';

interface PricingToggleProps {
  isAnnual?: boolean;
  onToggle?: (annual: boolean) => void;
}

export function PricingToggle({ isAnnual = false, onToggle }: PricingToggleProps) {
  return (
    <div className={styles.wrapper}>
      <span className={`${styles.option} ${!isAnnual ? styles.active : styles.inactive}`}>Monthly</span>
      <button
        className={styles.track}
        onClick={() => onToggle?.(!isAnnual)}
        aria-label={`Switch to ${isAnnual ? 'monthly' : 'annual'} billing`}
        type="button"
      >
        <span className={`${styles.thumb} ${isAnnual ? styles.thumbRight : styles.thumbLeft}`} />
      </button>
      <span className={`${styles.option} ${isAnnual ? styles.active : styles.inactive}`}>
        Annual
        <span className={styles.badge}>Save 20%</span>
      </span>
    </div>
  );
}
