import { useState } from 'react'
import { AccountBalanceCard, type Account } from './components/AccountBalanceCard'
import './App.css'

const initialAccount: Account = {
  id: 'account-1',
  name: 'Conto principale',
  balance: 12450.75,
  type: 'PRIVATE',
  iban: 'IT60 X054 2811 1010 0000 0123 456',
}

function App() {
  const [account, setAccount] = useState(initialAccount)
  const [showTransactions, setShowTransactions] = useState(false)

  async function refreshBalance() {
    await new Promise((resolve) => setTimeout(resolve, 600))
    setAccount((current) => ({ ...current }))
  }

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
        <AccountBalanceCard
          account={account}
          onRefreshBalance={refreshBalance}
          onViewTransactions={() => setShowTransactions((visible) => !visible)}
        />
        {showTransactions && <p className="notice">I movimenti saranno disponibili a breve.</p>}
      </section>
    </main>
  )
}

export default App
