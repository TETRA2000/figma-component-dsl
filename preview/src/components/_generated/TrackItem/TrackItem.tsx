import styles from './TrackItem.module.css';

interface TrackItemProps {
  number?: number;
  title?: string;
  artist?: string;
  duration?: string;
  artColor?: string;
  playing?: boolean;
}

export function TrackItem({
  number = 1,
  title = 'Untitled Track',
  artist = 'Unknown Artist',
  duration = '0:00',
  artColor = '#6b21a8',
  playing = false,
}: TrackItemProps) {
  return (
    <div className={`${styles.row} ${playing ? styles.playing : ''}`}>
      <span className={styles.number}>{playing ? '\u25B6' : number}</span>
      <div className={styles.art} style={{ background: artColor }} />
      <div className={styles.meta}>
        <span className={`${styles.title} ${playing ? styles.titlePlaying : ''}`}>{title}</span>
        <span className={styles.artist}>{artist}</span>
      </div>
      <span className={styles.duration}>{duration}</span>
    </div>
  );
}
