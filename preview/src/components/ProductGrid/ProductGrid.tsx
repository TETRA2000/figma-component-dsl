import type { HTMLAttributes } from 'react';
import styles from './ProductGrid.module.css';
import { ProductCard } from '../ProductCard/ProductCard';

type Columns = 2 | 3 | 4 | 5;

interface Product {
  image: string;
  title: string;
  rating?: number;
  reviewCount?: number;
  price: string;
  originalPrice?: string;
  discount?: string;
  prime?: boolean;
  badge?: string;
  inStock?: boolean;
}

interface ProductGridProps extends HTMLAttributes<HTMLElement> {
  title: string;
  subtitle?: string;
  products: Product[];
  columns?: Columns;
}

export function ProductGrid({
  title,
  subtitle,
  products,
  columns = 4,
  className,
  ...props
}: ProductGridProps) {
  const cls = [styles.root, className ?? ''].filter(Boolean).join(' ');
  const gridCls = [styles.grid, styles[`cols${columns}`]].join(' ');

  return (
    <section className={cls} {...props}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        <div className={gridCls}>
          {products.map((product, i) => (
            <ProductCard key={i} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
