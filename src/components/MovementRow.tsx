import styles from './MovementRow.module.css'

export type Movement = {
  id: string
  description: string
  amount: number
  date: string
}

type MovementRowProps = {
  movement: Movement
  onClick: (id: string) => void
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

export function MovementRow({ movement, onClick }: MovementRowProps) {
  return (
    <li className={styles.row}>
      <button
        type="button"
        className={styles.button}
        aria-label={`Seleziona movimento ${movement.description}`}
        onClick={() => onClick(movement.id)}
      >
        <span className={styles.description}>{movement.description}</span>
        <time dateTime={movement.date}>{dateFormatter.format(new Date(movement.date))}</time>
        <span className={movement.amount >= 0 ? styles.income : styles.expense}>
          {amountFormatter.format(movement.amount)}
        </span>
      </button>
    </li>
  )
}
