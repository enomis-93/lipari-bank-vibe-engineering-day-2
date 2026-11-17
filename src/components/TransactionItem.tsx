import styles from './TransactionItem.module.css'

export type Transaction = {
  id: string
  description: string
  amount: number
  date: string
}

const dateFormatter = new Intl.DateTimeFormat('it-IT', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Europe/Rome',
})

const amountFormatter = new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'EUR',
  signDisplay: 'always',
})

export function TransactionItem({ transaction }: { transaction: Transaction }) {
  const incoming = transaction.amount >= 0

  return (
    <li className={styles.item}>
      <span className={styles.icon} aria-hidden="true">{incoming ? '↙' : '↗'}</span>
      <div className={styles.details}>
        <strong>{transaction.description}</strong>
        <time dateTime={transaction.date}>{dateFormatter.format(new Date(transaction.date))}</time>
      </div>
      <span className={incoming ? styles.incoming : styles.outgoing}>
        {amountFormatter.format(transaction.amount)}
      </span>
    </li>
  )
}
