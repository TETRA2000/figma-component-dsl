import styles from './ConversationItem.module.css';

interface ConversationItemProps {
  avatarInitials?: string;
  avatarColor?: string;
  name: string;
  lastMessage?: string;
  time?: string;
  unreadCount?: number;
  selected?: boolean;
}

export function ConversationItem({
  avatarInitials = 'AB',
  avatarColor = '#3b82f6',
  name,
  lastMessage = '',
  time = '',
  unreadCount = 0,
  selected = false,
}: ConversationItemProps) {
  return (
    <div className={`${styles.wrapper} ${selected ? styles.selected : ''}`}>
      <div className={styles.avatar} style={{ background: avatarColor }}>
        <span className={styles.avatarText}>{avatarInitials}</span>
      </div>
      <div className={styles.content}>
        <div className={styles.topRow}>
          <span className={styles.name}>{name}</span>
          <span className={styles.time}>{time}</span>
        </div>
        <div className={styles.bottomRow}>
          <span className={styles.message}>{lastMessage}</span>
          {unreadCount > 0 && (
            <span className={styles.badge}>{unreadCount}</span>
          )}
        </div>
      </div>
    </div>
  );
}
