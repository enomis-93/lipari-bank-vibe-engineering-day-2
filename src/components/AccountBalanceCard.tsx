import { useState } from 'react'
import styles from './AccountBalanceCard.module.css'

export type Account = {
  id: string
  name: string
  balance: number
  type: 'PRIVATE' | 'BUSINESS'
  iban: string
}

type AccountBalanceCardProps = {
  account: Account
  onViewTransactions: () => void
  onRefreshBalance: () => void | Promise<void>
}

const currency = new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'EUR',
})

export function AccountBalanceCard({
  account,
  onViewTransactions,
  onRefreshBalance,
}: AccountBalanceCardProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  async function handleRefresh() {
    setLoading(true)
    setError(false)
    try {
      await onRefreshBalance()
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <article className={styles.card} aria-label={`Saldo ${account.name}`}>
      <div className={styles.top}>
        <div>
          <p className={styles.label}>IL TUO CONTO</p>
          <h2>{account.name}</h2>
        </div>
        <span className={styles.badge}>{account.type}</span>
      </div>
      <p className={styles.iban}>{account.iban}</p>
      <div className={styles.balanceRow}>
        <div>
          <p className={styles.label}>SALDO DISPONIBILE</p>
          <p className={styles.balance} aria-live="polite">{currency.format(account.balance)}</p>
        </div>
        <button
          type="button"
          className={styles.refresh}
          aria-label={`Aggiorna saldo ${account.name}`}
          disabled={loading}
          onClick={handleRefresh}
        >
          {loading ? 'Aggiornamento...' : '↻ Aggiorna'}
        </button>
      </div>
      {error && <p className={styles.error} role="alert">Impossibile aggiornare il saldo. Riprova.</p>}
      <button
        type="button"
        className={styles.transactions}
        aria-label={`Visualizza movimenti ${account.name}`}
        onClick={onViewTransactions}
      >
        Visualizza movimenti <span aria-hidden="true">→</span>
      </button>
    </article>
  )
}
