import styles from './NowPlaying.module.css';

interface NowPlayingProps {
  title?: string;
  podcastName?: string;
  progress?: number;
  isPlaying?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
  onTogglePlay?: () => void;
}

export function NowPlaying({
  title = 'The Future of AI',
  podcastName = 'Tech Talks Daily',
  progress = 35,
  isPlaying = true,
  gradientFrom = '#7c3aed',
  gradientTo = '#2563eb',
  onTogglePlay,
}: NowPlayingProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>
      <div className={styles.content}>
        <div
          className={styles.art}
          style={{ background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)` }}
        />
        <div className={styles.info}>
          <span className={styles.title}>{title}</span>
          <span className={styles.podcastName}>{podcastName}</span>
        </div>
        <button className={styles.playPause} onClick={onTogglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="3" y="2" width="4" height="12" rx="1" fill="currentColor" />
              <rect x="9" y="2" width="4" height="12" rx="1" fill="currentColor" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 2V14L14 8L4 2Z" fill="currentColor" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
