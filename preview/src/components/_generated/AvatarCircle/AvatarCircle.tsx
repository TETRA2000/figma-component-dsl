import styles from './AvatarCircle.module.css';

interface AvatarCircleProps {
  initials?: string;
  size?: number;
  online?: boolean;
}

export function AvatarCircle({
  initials = 'AB',
  size = 40,
  online = false,
}: AvatarCircleProps) {
  return (
    <div
      className={styles.wrapper}
      style={{ width: size, height: size }}
    >
      <div
        className={styles.circle}
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      >
        <span className={styles.initials}>{initials}</span>
      </div>
      {online && (
        <span
          className={styles.onlineDot}
          style={{
            width: size * 0.3,
            height: size * 0.3,
            borderWidth: size * 0.06,
          }}
        />
      )}
    </div>
  );
}
