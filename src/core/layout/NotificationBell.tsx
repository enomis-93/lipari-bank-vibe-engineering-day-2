import { useEffect, useState } from 'react'
import styles from './NotificationBell.module.css'

type Notification = {
  id: string
  message: string
  time: string
  read: boolean
}

type NotificationBellProps = {
  userId: string
}

function getMockNotifications(userId: string): Notification[] {
  return [
    { id: `${userId}-1`, message: `Estratto conto disponibile per ${userId}.`, time: '10 min fa', read: false },
    { id: `${userId}-2`, message: 'Accesso effettuato correttamente.', time: 'Ieri', read: false },
    { id: `${userId}-3`, message: 'Profilo aggiornato.', time: '3 giorni fa', read: true },
  ]
}

export function NotificationBell({ userId }: NotificationBellProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const unreadCount = notifications.filter((notification) => !notification.read).length

  useEffect(() => {
    const controller = new AbortController()

    async function loadNotifications() {
      await Promise.resolve()
      if (controller.signal.aborted) return
      setNotifications(getMockNotifications(userId))
    }

    void loadNotifications()
    return () => controller.abort()
  }, [userId])

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.bell}
        aria-label={`Notifiche: ${unreadCount} non lette`}
        aria-expanded={isOpen}
        aria-controls="notification-dropdown"
        onClick={(event) => {
          event.stopPropagation()
          setIsOpen((prev) => !prev)
        }}
      >
        <span aria-hidden="true">🔔</span>
        {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
      </button>
      {isOpen && (
        <div className={styles.dropdown} id="notification-dropdown" role="region" aria-label="Notifiche">
          <h2>Notifiche</h2>
          {notifications.length === 0 ? (
            <p className={styles.empty}>Nessuna notifica.</p>
          ) : (
            <ul className={styles.list}>
              {notifications.map((notification) => (
                <li className={notification.read ? styles.read : styles.unread} key={notification.id}>
                  <span>{notification.message}</span>
                  <time>{notification.time}</time>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
