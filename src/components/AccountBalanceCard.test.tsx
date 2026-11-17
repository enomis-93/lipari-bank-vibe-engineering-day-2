import '@testing-library/jest-dom/vitest'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { AccountBalanceCard, type Account } from './AccountBalanceCard'

const account: Account = {
  id: '1', name: 'Conto test', balance: 1234.56, type: 'BUSINESS', iban: 'IT00 TEST',
}

afterEach(cleanup)

describe('AccountBalanceCard', () => {
  it('formats the balance, shows account details and opens transactions', () => {
    const onViewTransactions = vi.fn()
    render(<AccountBalanceCard account={account} onViewTransactions={onViewTransactions} onRefreshBalance={() => {}} />)
    expect(screen.getByLabelText('Saldo Conto test').querySelector('[aria-live]')?.textContent)
      .toBe(new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(1234.56))
    expect(screen.getByText('BUSINESS')).toBeInTheDocument()
    expect(screen.getByText('IT00 TEST')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Visualizza movimenti Conto test' }))
    expect(onViewTransactions).toHaveBeenCalledOnce()
  })

  it('disables refresh while pending and restores it afterwards', async () => {
    let finish!: () => void
    const refresh = vi.fn(() => new Promise<void>((resolve) => { finish = resolve }))
    render(<AccountBalanceCard account={account} onViewTransactions={() => {}} onRefreshBalance={refresh} />)
    const button = screen.getByRole('button', { name: 'Aggiorna saldo Conto test' })
    fireEvent.click(button)
    expect(button).toBeDisabled()
    expect(button).toHaveTextContent('Aggiornamento...')
    await act(async () => finish())
    expect(button).toBeEnabled()
    expect(refresh).toHaveBeenCalledOnce()
  })

  it('reports refresh failures and allows retrying', async () => {
    render(<AccountBalanceCard account={account} onViewTransactions={() => {}} onRefreshBalance={() => Promise.reject(new Error('offline'))} />)
    const button = screen.getByRole('button', { name: 'Aggiorna saldo Conto test' })
    fireEvent.click(button)
    expect(await screen.findByRole('alert')).toHaveTextContent('Impossibile aggiornare')
    expect(button).toBeEnabled()
  })
})
