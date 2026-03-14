import { type HTMLAttributes } from 'react';
import styles from './IngredientRow.module.css';

export interface IngredientRowProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  amount: string;
  step?: number;
}

export function IngredientRow({
  name,
  amount,
  step,
  className,
  ...props
}: IngredientRowProps) {
  return (
    <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')} {...props}>
      <div className={styles.left}>
        {step !== undefined && <span className={styles.step}>{step}</span>}
        <span className={styles.name}>{name}</span>
      </div>
      <span className={styles.amount}>{amount}</span>
    </div>
  );
}
