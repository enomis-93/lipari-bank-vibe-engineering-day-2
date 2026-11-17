import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { DashboardPage } from './DashboardPage'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

it('renders three account cards and logs the selected movement ID', () => {
  const log = vi.spyOn(console, 'log').mockImplementation(() => {})
  render(<DashboardPage />)

  expect(screen.getAllByRole('article', { name: /^Saldo / })).toHaveLength(3)
  expect(screen.getAllByRole('listitem')).toHaveLength(5)
  fireEvent.click(screen.getByRole('button', { name: 'Seleziona movimento Stipendio' }))
  expect(log).toHaveBeenCalledWith('Movimento selezionato: movement-1')
  log.mockRestore()
})
