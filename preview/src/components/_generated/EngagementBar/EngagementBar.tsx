import styles from './EngagementBar.module.css';

interface EngagementBarProps {
  likes?: number;
  comments?: number;
  shares?: number;
  bookmarks?: number;
}

export function EngagementBar({
  likes = 42,
  comments = 5,
  shares = 3,
  bookmarks = 12,
}: EngagementBarProps) {
  return (
    <div className={styles.bar}>
      <button className={styles.action} type="button">
        <svg className={styles.icon} viewBox="0 0 24 24" width="18" height="18">
          <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.56-1.13-1.666-1.84-2.908-1.91z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span className={styles.count}>{formatCount(likes)}</span>
      </button>

      <button className={styles.action} type="button">
        <svg className={styles.icon} viewBox="0 0 24 24" width="18" height="18">
          <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.25-.893 4.41-2.485 6l-4.765 4.77-.753-.49-3.727-2.42a.88.88 0 0 0-.486-.14H9.756c-4.421 0-8.005-3.58-8.005-8z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span className={styles.count}>{formatCount(comments)}</span>
      </button>

      <button className={styles.action} type="button">
        <svg className={styles.icon} viewBox="0 0 24 24" width="18" height="18">
          <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" fill="currentColor" />
        </svg>
        <span className={styles.count}>{formatCount(shares)}</span>
      </button>

      <button className={styles.action} type="button">
        <svg className={styles.icon} viewBox="0 0 24 24" width="18" height="18">
          <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span className={styles.count}>{formatCount(bookmarks)}</span>
      </button>
    </div>
  );
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}
