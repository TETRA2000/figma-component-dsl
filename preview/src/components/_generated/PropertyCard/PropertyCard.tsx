import styles from './PropertyCard.module.css';

interface PropertyCardProps {
  price?: string;
  address?: string;
  neighborhood?: string;
  beds?: number;
  baths?: number;
  sqft?: string;
}

export function PropertyCard({
  price = '$450,000',
  address = '1234 Maple Street',
  neighborhood = 'Downtown, Austin TX',
  beds = 3,
  baths = 2,
  sqft = '1,850',
}: PropertyCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imagePlaceholder}>
        <span className={styles.priceBadge}>{price}</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.address}>{address}</h3>
        <p className={styles.neighborhood}>{neighborhood}</p>
        <div className={styles.specs}>
          <span className={styles.spec}>
            {beds} <span className={styles.specLabel}>beds</span>
          </span>
          <span className={styles.spec}>
            {baths} <span className={styles.specLabel}>baths</span>
          </span>
          <span className={styles.spec}>
            {sqft} <span className={styles.specLabel}>sqft</span>
          </span>
        </div>
      </div>
    </div>
  );
}
