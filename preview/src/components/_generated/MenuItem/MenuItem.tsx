import styles from './MenuItem.module.css';

interface MenuItemProps {
  name?: string;
  description?: string;
  price?: string;
  dietaryTags?: string[];
  popular?: boolean;
}

export function MenuItem({
  name = 'Grilled Salmon',
  description = 'Pan-seared Atlantic salmon with lemon butter sauce and seasonal vegetables',
  price = '$28',
  dietaryTags = ['GF'],
  popular = false,
}: MenuItemProps) {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.nameRow}>
          <h3 className={styles.name}>{name}</h3>
          {popular && <span className={styles.popularBadge}>Popular</span>}
        </div>
        <span className={styles.price}>{price}</span>
      </div>
      <p className={styles.description}>{description}</p>
      {dietaryTags.length > 0 && (
        <div className={styles.tags}>
          {dietaryTags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
}
