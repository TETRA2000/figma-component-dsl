import styles from './IngredientItem.module.css';

interface IngredientItemProps {
  name?: string;
  amount?: string;
  checked?: boolean;
}

export function IngredientItem({
  name = 'Spaghetti',
  amount = '200g',
  checked = false,
}: IngredientItemProps) {
  return (
    <div className={styles.row}>
      <span className={`${styles.checkbox} ${checked ? styles.checked : ''}`}>
        {checked ? '\u2713' : ''}
      </span>
      <span className={styles.name}>{name}</span>
      <span className={styles.amount}>{amount}</span>
    </div>
  );
}
