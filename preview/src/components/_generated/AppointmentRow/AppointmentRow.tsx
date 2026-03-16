import styles from './AppointmentRow.module.css';

interface AppointmentRowProps {
  time?: string;
  period?: string;
  doctorName?: string;
  specialty?: string;
  avatarEmoji?: string;
}

export function AppointmentRow({
  time = '9:30',
  period = 'AM',
  doctorName = 'Dr. Sarah Chen',
  specialty = 'Cardiology',
  avatarEmoji = '\ud83d\udc69\u200d\u2695\ufe0f',
}: AppointmentRowProps) {
  return (
    <div className={styles.row}>
      <div className={styles.time}>
        <span className={styles.timeHour}>{time}</span>
        <span className={styles.timePeriod}>{period}</span>
      </div>
      <div className={styles.avatar}>{avatarEmoji}</div>
      <div className={styles.details}>
        <span className={styles.doctorName}>{doctorName}</span>
        <span className={styles.specialty}>{specialty}</span>
      </div>
      <button className={styles.action}>Details</button>
    </div>
  );
}
