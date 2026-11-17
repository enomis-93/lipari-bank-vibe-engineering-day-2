import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { TransactionList } from './TransactionList'

const transactions = [
  { id: 'income', description: 'Stipendio', amount: 1200, date: '2026-11-15T12:00:00Z' },
  { id: 'expense', description: 'Spesa', amount: -42.5, date: '2026-11-14T12:00:00Z' },
]

afterEach(cleanup)

describe('TransactionList', () => {
  it('renders signed amounts and localized dates', () => {
    render(<TransactionList transactions={transactions} />)
    const items = screen.getAllByRole('listitem')
    const amount = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', signDisplay: 'always' })
    const date = new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Rome' })
    expect(items[0]).toHaveTextContent(amount.format(1200).replace(/\s/g, ' '))
    expect(items[1]).toHaveTextContent(amount.format(-42.5).replace(/\s/g, ' '))
    expect(within(items[0]).getByText(date.format(new Date(transactions[0].date)))).toHaveAttribute('datetime', transactions[0].date)
  })

  it('preserves item identity when the list is reordered', () => {
    const { rerender } = render(<TransactionList transactions={transactions} />)
    const firstItem = screen.getAllByRole('listitem')[0]
    rerender(<TransactionList transactions={[transactions[1], transactions[0]]} />)
    expect(screen.getAllByRole('listitem')[1]).toBe(firstItem)
  })

  it('shows an empty state', () => {
    render(<TransactionList transactions={[]} />)
    expect(screen.getByText('Nessun movimento disponibile.')).toBeInTheDocument()
  })
})
