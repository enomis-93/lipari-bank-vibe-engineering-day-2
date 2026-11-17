import { useCallback } from 'react'
import { AccountBalanceCard, type Account } from '../components/AccountBalanceCard'
import { MovementRow, type Movement } from '../components/MovementRow'
import styles from './DashboardPage.module.css'

const accounts: Account[] = [
  { id: 'account-1', name: 'Conto principale', balance: 12450.75, type: 'PRIVATE', iban: 'IT60 X054 2811 1010 0000 0123 456' },
  { id: 'account-2', name: 'Conto risparmi', balance: 8200, type: 'PRIVATE', iban: 'IT21 X054 2811 1010 0000 0987 654' },
  { id: 'account-3', name: 'Conto aziendale', balance: 25310.4, type: 'BUSINESS', iban: 'IT89 X054 2811 1010 0000 0555 321' },
]

const movements: Movement[] = [
  { id: 'movement-1', description: 'Stipendio', amount: 2400, date: '2026-11-15T12:00:00Z' },
  { id: 'movement-2', description: 'Spesa alimentare', amount: -64.3, date: '2026-11-14T12:00:00Z' },
  { id: 'movement-3', description: 'Abbonamento mensile', amount: -12.99, date: '2026-11-12T12:00:00Z' },
  { id: 'movement-4', description: 'Rimborso', amount: 38.5, date: '2026-11-10T12:00:00Z' },
  { id: 'movement-5', description: 'Bolletta luce', amount: -76.2, date: '2026-11-08T12:00:00Z' },
]

export function DashboardPage() {
  const handleMovementClick = useCallback((id: string) => {
    console.log(`Movimento selezionato: ${id}`)
  }, [])

  const scrollToMovements = useCallback(() => {
    document.getElementById('movements')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <main className={styles.dashboard}>
      <p className="eyebrow">LA TUA PANORAMICA</p>
      <h1>Il tuo conto, a colpo d'occhio.</h1>
      <p className="intro">Tieni sotto controllo il saldo e i movimenti dei tuoi conti.</p>
      <section className={styles.accounts} aria-label="I tuoi conti">
        {accounts.map((account) => (
          <AccountBalanceCard
            account={account}
            key={account.id}
            onRefreshBalance={() => {}}
            onViewTransactions={scrollToMovements}
          />
        ))}
      </section>
      <section className={styles.movements} id="movements" aria-labelledby="movements-title">
        <h2 id="movements-title">Movimenti recenti</h2>
        <ul className={styles.list}>
          {movements.map((movement) => (
            <MovementRow key={movement.id} movement={movement} onClick={handleMovementClick} />
          ))}
        </ul>
      </section>
    </main>
  )
}
