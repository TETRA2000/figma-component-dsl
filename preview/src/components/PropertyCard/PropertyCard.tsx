import styles from './PropertyCard.module.css';

interface PropertyCardProps {
  title?: string;
  location?: string;
  price?: string;
  rating?: number;
  className?: string;
}

export function PropertyCard({
  title = 'Cozy Mountain Cabin',
  location = 'Aspen, Colorado',
  price = '$185',
  rating = 4.8,
  className,
}: PropertyCardProps) {
  const cls = [styles.card, className ?? ''].filter(Boolean).join(' ');

  return (
    <div className={cls}>
      <div className={styles.imageArea} />
      <div className={styles.body}>
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
          <span className={styles.rating}>&#9733; {rating}</span>
        </div>
        <span className={styles.location}>{location}</span>
        <div className={styles.footer}>
          <span className={styles.price}>{price}</span>
          <span className={styles.perNight}> / night</span>
        </div>
      </div>
    </div>
  );
}
