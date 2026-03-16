import styles from './ContactButton.module.css';

interface ContactButtonProps {
  label?: string;
}

export function ContactButton({ label = 'Get in Touch' }: ContactButtonProps) {
  return <button className={styles.button}>{label}</button>;
}
