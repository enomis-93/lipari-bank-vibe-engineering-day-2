import '@testing-library/jest-dom/vitest'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { AccountBalanceCard, type Account } from './AccountBalanceCard'

const account: Account = {
  id: '1', name: 'Conto test', balance: 1234.56, type: 'BUSINESS', iban: 'IT00 TEST',
}

beforeEach(() => vi.useFakeTimers())
afterEach(() => {
  cleanup()
  vi.useRealTimers()
  vi.restoreAllMocks()
})

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

  it('polls the balance every 30 seconds and cleans up the interval', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.75)
    const { unmount } = render(<AccountBalanceCard account={account} onViewTransactions={() => {}} onRefreshBalance={() => {}} />)
    const balance = screen.getByLabelText('Saldo Conto test').querySelector('[aria-live]')
    const format = (amount: number) => new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(amount)
    act(() => vi.advanceTimersByTime(29_999))
    expect(balance?.textContent).toBe(format(1234.56))
    act(() => vi.advanceTimersByTime(1))
    expect(balance?.textContent).toBe(format(1239.56))
    unmount()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('disables refresh for one second and restores it afterwards', async () => {
    let finish!: () => void
    const refresh = vi.fn(() => new Promise<void>((resolve) => { finish = resolve }))
    render(<AccountBalanceCard account={account} onViewTransactions={() => {}} onRefreshBalance={refresh} />)
    const button = screen.getByRole('button', { name: 'Aggiorna saldo Conto test' })
    fireEvent.click(button)
    expect(button).toBeDisabled()
    expect(button).toHaveTextContent('Aggiornamento...')
    expect(refresh).not.toHaveBeenCalled()
    await act(async () => vi.advanceTimersByTimeAsync(1000))
    expect(refresh).toHaveBeenCalledOnce()
    expect(button).toBeDisabled()
    await act(async () => finish())
    expect(button).toBeEnabled()
  })

  it('reports refresh failures and allows retrying', async () => {
    render(<AccountBalanceCard account={account} onViewTransactions={() => {}} onRefreshBalance={() => Promise.reject(new Error('offline'))} />)
    const button = screen.getByRole('button', { name: 'Aggiorna saldo Conto test' })
    fireEvent.click(button)
    await act(async () => vi.advanceTimersByTimeAsync(1000))
    expect(screen.getByRole('alert')).toHaveTextContent('Impossibile aggiornare')
    expect(button).toBeEnabled()
  })
})
