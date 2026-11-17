import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useInterval } from './useInterval'

beforeEach(() => vi.useFakeTimers())
afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

describe('useInterval', () => {
  it('uses the latest callback without restarting the interval', () => {
    const first = vi.fn()
    const second = vi.fn()
    const { rerender, unmount } = renderHook(
      ({ callback, delay }: { callback: () => void; delay: number | null }) => useInterval(callback, delay),
      { initialProps: { callback: first, delay: 5000 as number | null } },
    )
    act(() => vi.advanceTimersByTime(3000))
    rerender({ callback: second, delay: 5000 })
    act(() => vi.advanceTimersByTime(2000))
    expect(first).not.toHaveBeenCalled()
    expect(second).toHaveBeenCalledOnce()
    unmount()
    expect(vi.getTimerCount()).toBe(0)
    act(() => vi.advanceTimersByTime(10000))
    expect(second).toHaveBeenCalledOnce()
  })

  it('pauses with null and restarts when the delay changes', () => {
    const callback = vi.fn()
    const { rerender } = renderHook(
      ({ delay }: { delay: number | null }) => useInterval(callback, delay),
      { initialProps: { delay: 5000 as number | null } },
    )
    rerender({ delay: null })
    expect(vi.getTimerCount()).toBe(0)
    act(() => vi.advanceTimersByTime(10000))
    expect(callback).not.toHaveBeenCalled()
    rerender({ delay: 1000 })
    act(() => vi.advanceTimersByTime(1000))
    expect(callback).toHaveBeenCalledOnce()
  })
})
