import styles from './ChatBubble.module.css';

interface ChatBubbleProps {
  text: string;
  timestamp?: string;
  variant?: 'sent' | 'received';
}

export function ChatBubble({
  text,
  timestamp = '12:00',
  variant = 'received',
}: ChatBubbleProps) {
  return (
    <div
      className={`${styles.wrapper} ${variant === 'sent' ? styles.sent : styles.received}`}
    >
      <div
        className={`${styles.bubble} ${variant === 'sent' ? styles.bubbleSent : styles.bubbleReceived}`}
      >
        <span className={styles.text}>{text}</span>
        <span className={styles.timestamp}>{timestamp}</span>
      </div>
    </div>
  );
}
