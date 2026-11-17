import { useState } from 'react'
import { useInterval } from '../hooks/useInterval'
import { AccountBalanceCard, type Account } from './AccountBalanceCard'

type LiveBalanceProps = {
  initialAccount: Account
  onViewTransactions: () => void
}

export function LiveBalance({ initialAccount, onViewTransactions }: LiveBalanceProps) {
  const [account, setAccount] = useState(initialAccount)

  useInterval(() => {
    setAccount((current) => ({
      ...current,
      balance: Math.round((current.balance + 0.05) * 100) / 100,
    }))
  }, 5000)

  async function refreshBalance() {
    await new Promise((resolve) => setTimeout(resolve, 600))
    setAccount((current) => ({ ...current }))
  }

  return (
    <>
      <AccountBalanceCard
        account={account}
        onRefreshBalance={refreshBalance}
        onViewTransactions={onViewTransactions}
      />
      <p className="notice">Demo: il saldo è simulato e cambia ogni 5 secondi.</p>
    </>
  )
}
