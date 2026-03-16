import styles from './ChatHeader.module.css';

interface ChatHeaderProps {
  name: string;
  avatarInitials?: string;
  avatarColor?: string;
  online?: boolean;
  onBack?: () => void;
}

export function ChatHeader({
  name,
  avatarInitials = 'AB',
  avatarColor = '#3b82f6',
  online = false,
  onBack,
}: ChatHeaderProps) {
  return (
    <div className={styles.wrapper}>
      <button type="button" className={styles.backButton} onClick={onBack}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 15L7.5 10L12.5 5"
            stroke="#1e293b"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className={styles.backText}>Back</span>
      </button>
      <div className={styles.center}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar} style={{ background: avatarColor }}>
            <span className={styles.avatarText}>{avatarInitials}</span>
          </div>
          {online && <span className={styles.onlineDot} />}
        </div>
        <div className={styles.info}>
          <span className={styles.name}>{name}</span>
          {online && <span className={styles.status}>Online</span>}
        </div>
      </div>
      <div className={styles.spacer} />
    </div>
  );
}
