import styles from './EpisodeCard.module.css';

interface EpisodeCardProps {
  title?: string;
  podcastName?: string;
  duration?: string;
  gradientFrom?: string;
  gradientTo?: string;
  onPlay?: () => void;
}

export function EpisodeCard({
  title = 'The Future of AI',
  podcastName = 'Tech Talks Daily',
  duration = '42 min',
  gradientFrom = '#7c3aed',
  gradientTo = '#2563eb',
  onPlay,
}: EpisodeCardProps) {
  return (
    <div className={styles.card}>
      <div
        className={styles.cover}
        style={{ background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)` }}
      />
      <div className={styles.info}>
        <span className={styles.title}>{title}</span>
        <span className={styles.podcastName}>{podcastName}</span>
        <div className={styles.meta}>
          <span className={styles.duration}>{duration}</span>
          <button className={styles.playButton} onClick={onPlay} aria-label="Play episode">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 1.5V12.5L12 7L3 1.5Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
