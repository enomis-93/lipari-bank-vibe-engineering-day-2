import { NotificationBell } from './NotificationBell'
import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <a className={styles.brand} href="/" aria-label="Lipari Bank, home">
        LIPARI <span>BANK</span>
      </a>
      <div className={styles.actions}>
        <span className={styles.demoLabel}>Area demo</span>
        <NotificationBell userId="user-1" />
      </div>
    </header>
  )
}
