import styles from './MedicationPill.module.css';

interface MedicationPillProps {
  name?: string;
  dosage?: string;
  time?: string;
  color?: string;
}

export function MedicationPill({
  name = 'Lisinopril',
  dosage = '10mg',
  time = '8:00 AM',
  color = '#0d9488',
}: MedicationPillProps) {
  return (
    <div className={styles.pill}>
      <div className={styles.dot} style={{ background: color }} />
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <span className={styles.dosage}>{dosage}</span>
      </div>
      <span className={styles.time}>{time}</span>
    </div>
  );
}
