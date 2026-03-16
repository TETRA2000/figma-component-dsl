import styles from './AlbumHeader.module.css';

interface AlbumHeaderProps {
  title?: string;
  artist?: string;
  year?: number;
  trackCount?: number;
  gradientFrom?: string;
  gradientTo?: string;
}

export function AlbumHeader({
  title = 'Album Title',
  artist = 'Artist Name',
  year = 2026,
  trackCount = 10,
  gradientFrom = '#7c3aed',
  gradientTo = '#2563eb',
}: AlbumHeaderProps) {
  return (
    <div className={styles.header}>
      <div
        className={styles.art}
        style={{ background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)` }}
      />
      <div className={styles.info}>
        <span className={styles.label}>Album</span>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.details}>
          <span className={styles.artist}>{artist}</span>
          <span className={styles.dot}>&middot;</span>
          <span className={styles.meta}>{year}</span>
          <span className={styles.dot}>&middot;</span>
          <span className={styles.meta}>{trackCount} tracks</span>
        </div>
      </div>
    </div>
  );
}
