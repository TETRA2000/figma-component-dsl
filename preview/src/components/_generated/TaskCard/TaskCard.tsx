import styles from './TaskCard.module.css';

interface TaskCardProps {
  title?: string;
  description?: string;
  priority?: 'high' | 'medium' | 'low';
  assignee?: string;
  dueDate?: string;
}

const priorityColors: Record<string, string> = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#10b981',
};

const priorityLabels: Record<string, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function TaskCard({
  title = 'Implement login flow',
  description = 'Build the authentication screens including email/password and OAuth providers.',
  priority = 'medium',
  assignee = 'Alex Chen',
  dueDate = 'Mar 20',
}: TaskCardProps) {
  const initials = getInitials(assignee);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span
          className={styles.priorityBadge}
          style={{ background: `${priorityColors[priority]}18`, color: priorityColors[priority] }}
        >
          {priorityLabels[priority]}
        </span>
      </div>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.description}>{description}</p>
      <div className={styles.footer}>
        <div className={styles.assignee}>
          <span
            className={styles.avatar}
            style={{ background: priorityColors[priority] }}
          >
            {initials}
          </span>
          <span className={styles.assigneeName}>{assignee}</span>
        </div>
        <span className={styles.dueDate}>{dueDate}</span>
      </div>
    </div>
  );
}
