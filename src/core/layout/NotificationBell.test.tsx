import '@testing-library/jest-dom/vitest'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { NotificationBell } from './NotificationBell'

afterEach(cleanup)

it('loads notifications for the user, toggles the dropdown and stops event propagation', async () => {
  const parentClick = vi.fn()
  const abort = vi.spyOn(AbortController.prototype, 'abort')
  const { rerender } = render(
    <div onClick={parentClick}>
      <NotificationBell userId="user-1" />
    </div>,
  )

  await act(async () => Promise.resolve())
  const bell = screen.getByRole('button', { name: 'Notifiche: 2 non lette' })
  expect(screen.getByText('2')).toBeInTheDocument()
  fireEvent.click(bell)
  expect(parentClick).not.toHaveBeenCalled()
  expect(screen.getByRole('region', { name: 'Notifiche' })).toBeInTheDocument()
  expect(screen.getByText('Estratto conto disponibile per user-1.')).toBeInTheDocument()

  fireEvent.click(bell)
  expect(screen.queryByRole('region', { name: 'Notifiche' })).not.toBeInTheDocument()

  rerender(
    <div onClick={parentClick}>
      <NotificationBell userId="user-2" />
    </div>,
  )
  expect(abort).toHaveBeenCalledOnce()
  await act(async () => Promise.resolve())
  fireEvent.click(screen.getByRole('button', { name: 'Notifiche: 2 non lette' }))
  expect(screen.getByText('Estratto conto disponibile per user-2.')).toBeInTheDocument()
})
