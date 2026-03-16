import styles from './NowPlayingBar.module.css';

interface NowPlayingBarProps {
  track?: string;
  artist?: string;
}

export function NowPlayingBar({
  track = 'Starlight Serenade',
  artist = 'Cosmic Waves',
}: NowPlayingBarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.left}>
        <div className={styles.thumb} />
        <div className={styles.meta}>
          <span className={styles.track}>{track}</span>
          <span className={styles.artist}>{artist}</span>
        </div>
      </div>
      <div className={styles.center}>
        <div className={styles.controls}>
          <div className={styles.controlBtn}>&#9664;&#9664;</div>
          <div className={styles.playBtn}>&#9654;</div>
          <div className={styles.controlBtn}>&#9654;&#9654;</div>
        </div>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.volumeTrack}>
          <div className={styles.volumeFill} />
        </div>
      </div>
    </div>
  );
}
