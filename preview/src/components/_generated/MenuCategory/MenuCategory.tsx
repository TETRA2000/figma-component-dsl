import type { ReactNode } from 'react';
import styles from './MenuCategory.module.css';

interface MenuCategoryProps {
  name?: string;
  children?: ReactNode;
}

export function MenuCategory({
  name = 'Starters',
  children,
}: MenuCategoryProps) {
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <span className={styles.name}>{name}</span>
        <div className={styles.line} />
      </div>
      <div className={styles.items}>{children}</div>
    </div>
  );
}
