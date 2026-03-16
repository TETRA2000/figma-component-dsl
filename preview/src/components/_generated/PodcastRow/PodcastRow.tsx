import styles from './PodcastRow.module.css';

interface PodcastRowProps {
  name?: string;
  author?: string;
  episodeCount?: number;
  gradientFrom?: string;
  gradientTo?: string;
}

export function PodcastRow({
  name = 'Tech Talks Daily',
  author = 'Sarah Chen',
  episodeCount = 128,
  gradientFrom = '#7c3aed',
  gradientTo = '#2563eb',
}: PodcastRowProps) {
  return (
    <div className={styles.row}>
      <div
        className={styles.art}
        style={{ background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)` }}
      />
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <span className={styles.author}>{author}</span>
      </div>
      <span className={styles.episodes}>{episodeCount} eps</span>
    </div>
  );
}
