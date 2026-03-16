import styles from './SpecialCard.module.css';

interface SpecialCardProps {
  dishName?: string;
  description?: string;
  price?: string;
}

export function SpecialCard({
  dishName = 'Truffle Risotto',
  description = 'Creamy Arborio rice with black truffle, aged Parmesan, and a drizzle of truffle oil',
  price = '$42',
}: SpecialCardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.badge}>Chef's Special</span>
      <h2 className={styles.dishName}>{dishName}</h2>
      <p className={styles.description}>{description}</p>
      <span className={styles.price}>{price}</span>
    </div>
  );
}
