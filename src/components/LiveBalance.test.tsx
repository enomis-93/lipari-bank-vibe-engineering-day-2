import '@testing-library/jest-dom/vitest'
import { StrictMode } from 'react'
import { act, cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { LiveBalance } from './LiveBalance'

beforeEach(() => vi.useFakeTimers())
afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

it('updates the simulated balance every five seconds and cleans up on unmount', () => {
  const { unmount } = render(
    <StrictMode>
      <LiveBalance
        initialAccount={{ id: '1', name: 'Test', balance: 100, type: 'PRIVATE', iban: 'IT00' }}
        onViewTransactions={() => {}}
      />
    </StrictMode>,
  )
  const balance = screen.getByLabelText('Saldo Test').querySelector('[aria-live]')
  const format = (value: number) => new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(value)
  expect(balance?.textContent).toBe(format(100))
  act(() => vi.advanceTimersByTime(4999))
  expect(balance?.textContent).toBe(format(100))
  act(() => vi.advanceTimersByTime(5001))
  expect(balance?.textContent).toBe(format(100.10))
  unmount()
  expect(vi.getTimerCount()).toBe(0)
})
