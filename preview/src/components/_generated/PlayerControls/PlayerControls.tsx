import styles from './PlayerControls.module.css';

interface PlayerControlsProps {
  currentTime?: string;
  totalTime?: string;
  progress?: number;
}

export function PlayerControls({
  currentTime = '0:00',
  totalTime = '0:00',
  progress = 0,
}: PlayerControlsProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.buttons}>
        <button className={styles.controlBtn} type="button">Prev</button>
        <button className={styles.playBtn} type="button">&#9654;</button>
        <button className={styles.controlBtn} type="button">Next</button>
      </div>
      <div className={styles.progressRow}>
        <span className={styles.time}>{currentTime}</span>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
        <span className={styles.time}>{totalTime}</span>
      </div>
    </div>
  );
}
