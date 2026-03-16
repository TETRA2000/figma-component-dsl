import styles from './AlbumCard.module.css';

interface AlbumCardProps {
  title?: string;
  artist?: string;
}

export function AlbumCard({ title = 'Midnight Vibes', artist = 'Lunar Echo' }: AlbumCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cover} />
      <div className={styles.info}>
        <span className={styles.title}>{title}</span>
        <span className={styles.artist}>{artist}</span>
      </div>
    </div>
  );
}
