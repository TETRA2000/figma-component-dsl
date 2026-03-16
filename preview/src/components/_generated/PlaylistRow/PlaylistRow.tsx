import styles from './PlaylistRow.module.css';

interface PlaylistRowProps {
  index?: number;
  title?: string;
  artist?: string;
  duration?: string;
}

export function PlaylistRow({
  index = 1,
  title = 'Electric Dreams',
  artist = 'Neon Pulse',
  duration = '3:42',
}: PlaylistRowProps) {
  return (
    <div className={styles.row}>
      <span className={styles.index}>{index}</span>
      <div className={styles.thumb} />
      <div className={styles.meta}>
        <span className={styles.title}>{title}</span>
        <span className={styles.artist}>{artist}</span>
      </div>
      <span className={styles.duration}>{duration}</span>
    </div>
  );
}
