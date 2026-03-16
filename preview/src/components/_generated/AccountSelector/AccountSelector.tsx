import styles from './AccountSelector.module.css';

interface AccountSelectorProps {
  name?: string;
  type?: string;
  active?: boolean;
}

export function AccountSelector({ name = 'Main Account', type = 'Checking', active = true }: AccountSelectorProps) {
  return (
    <div className={`${styles.selector} ${active ? styles.active : ''}`}>
      <div className={styles.dot} />
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <span className={styles.type}>{type}</span>
      </div>
    </div>
  );
}
