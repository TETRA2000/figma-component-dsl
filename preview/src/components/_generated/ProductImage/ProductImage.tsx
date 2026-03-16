import styles from './ProductImage.module.css';

interface ProductImageProps {
  mainColor?: string;
  accentColor?: string;
}

export function ProductImage({
  mainColor = '#2563eb',
  accentColor = '#7c3aed',
}: ProductImageProps) {
  const thumbnails = [0, 1, 2, 3];

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.mainImage}
        style={{
          background: `linear-gradient(135deg, ${mainColor} 0%, ${accentColor} 100%)`,
        }}
      />
      <div className={styles.thumbnailRow}>
        {thumbnails.map((i) => (
          <div
            key={i}
            className={styles.thumbnail}
            style={{
              background: `linear-gradient(135deg, ${mainColor} ${i * 10}%, ${accentColor} 100%)`,
              opacity: i === 0 ? 1 : 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
}
