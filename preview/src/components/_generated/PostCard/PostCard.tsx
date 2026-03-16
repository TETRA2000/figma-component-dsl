import styles from './PostCard.module.css';
import { AvatarCircle } from '../AvatarCircle/AvatarCircle';
import { EngagementBar } from '../EngagementBar/EngagementBar';

interface PostCardProps {
  initials?: string;
  username?: string;
  handle?: string;
  timestamp?: string;
  body?: string;
  likes?: number;
  comments?: number;
  shares?: number;
  bookmarks?: number;
  online?: boolean;
}

export function PostCard({
  initials = 'AB',
  username = 'Alice Brown',
  handle = '@alicebrown',
  timestamp = '2h',
  body = 'Just shipped a new feature! Really excited about how the team came together on this one.',
  likes = 42,
  comments = 5,
  shares = 3,
  bookmarks = 12,
  online = false,
}: PostCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.avatarColumn}>
        <AvatarCircle initials={initials} size={40} online={online} />
      </div>
      <div className={styles.mainColumn}>
        <div className={styles.header}>
          <span className={styles.username}>{username}</span>
          <span className={styles.handle}>{handle}</span>
          <span className={styles.separator}>·</span>
          <span className={styles.timestamp}>{timestamp}</span>
        </div>
        <p className={styles.body}>{body}</p>
        <EngagementBar
          likes={likes}
          comments={comments}
          shares={shares}
          bookmarks={bookmarks}
        />
      </div>
    </div>
  );
}
