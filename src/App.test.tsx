import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

it('renders the header, notification bell, three accounts and five movements', () => {
  render(<App />)
  expect(screen.getByRole('link', { name: 'Lipari Bank, home' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Notifiche: 0 non lette' })).toBeInTheDocument()
  expect(screen.getAllByRole('article', { name: /^Saldo / })).toHaveLength(3)
  expect(screen.getAllByRole('listitem')).toHaveLength(5)
})
