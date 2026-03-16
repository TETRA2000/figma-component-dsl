import styles from './CalendarEvent.module.css';

interface CalendarEventProps {
  title?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  color?: 'blue' | 'green' | 'orange';
}

export function CalendarEvent({
  title = 'Team Standup',
  startTime = '9:00 AM',
  endTime = '9:30 AM',
  location = 'Room 3A',
  color = 'blue',
}: CalendarEventProps) {
  const colorMap = {
    blue: '#3b82f6',
    green: '#10b981',
    orange: '#f59e0b',
  };

  const bgMap = {
    blue: '#eff6ff',
    green: '#ecfdf5',
    orange: '#fffbeb',
  };

  return (
    <div
      className={styles.event}
      style={{
        borderLeftColor: colorMap[color],
        backgroundColor: bgMap[color],
      }}
    >
      <p className={styles.title}>{title}</p>
      <p className={styles.time}>
        {startTime} – {endTime}
      </p>
      {location && <p className={styles.location}>{location}</p>}
    </div>
  );
}
