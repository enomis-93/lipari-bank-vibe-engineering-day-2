import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

it('opens and closes the transaction list', () => {
  render(<App />)
  const button = screen.getByRole('button', { name: 'Visualizza movimenti Conto principale' })
  expect(screen.queryByRole('heading', { name: 'Ultimi movimenti' })).not.toBeInTheDocument()
  fireEvent.click(button)
  expect(screen.getByRole('heading', { name: 'Ultimi movimenti' })).toBeInTheDocument()
  expect(screen.getAllByRole('listitem')).toHaveLength(3)
  fireEvent.click(button)
  expect(screen.queryByRole('heading', { name: 'Ultimi movimenti' })).not.toBeInTheDocument()
})
