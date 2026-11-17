import { useState } from 'react'
import type { Account } from './components/AccountBalanceCard'
import { LiveBalance } from './components/LiveBalance'
import type { Transaction } from './components/TransactionItem'
import { TransactionList } from './components/TransactionList'
import './App.css'

const initialAccount: Account = {
  id: 'account-1',
  name: 'Conto principale',
  balance: 12450.75,
  type: 'PRIVATE',
  iban: 'IT60 X054 2811 1010 0000 0123 456',
}

const transactions: Transaction[] = [
  { id: 'tx-1', description: 'Stipendio', amount: 2400, date: '2026-11-15T12:00:00Z' },
  { id: 'tx-2', description: 'Spesa alimentare', amount: -64.3, date: '2026-11-14T12:00:00Z' },
  { id: 'tx-3', description: 'Abbonamento mensile', amount: -12.99, date: '2026-11-12T12:00:00Z' },
]

function App() {
  const [showTransactions, setShowTransactions] = useState(false)

  return (
    <main className="page">
      <header className="page-header">
        <span className="brand">LIPARI <strong>BANK</strong></span>
        <span className="demo-label">Area demo</span>
      </header>
      <section className="dashboard">
        <p className="eyebrow">LA TUA PANORAMICA</p>
        <h1>Il tuo conto, a colpo d'occhio.</h1>
        <p className="intro">Tieni sotto controllo il saldo e i movimenti del tuo conto.</p>
        <LiveBalance
          initialAccount={initialAccount}
          onViewTransactions={() => setShowTransactions((visible) => !visible)}
        />
        {showTransactions && <TransactionList transactions={transactions} />}
      </section>
    </main>
  )
}

export default App
