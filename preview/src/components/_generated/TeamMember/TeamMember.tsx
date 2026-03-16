import styles from './TeamMember.module.css';

interface TeamMemberProps {
  name?: string;
  initials?: string;
  color?: string;
}

export function TeamMember({
  name = 'Alex Chen',
  initials = 'AC',
  color = '#3b82f6',
}: TeamMemberProps) {
  return (
    <div className={styles.chip}>
      <span className={styles.avatar} style={{ background: color }}>
        {initials}
      </span>
      <span className={styles.name}>{name}</span>
    </div>
  );
}
