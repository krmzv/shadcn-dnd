import '@testing-library/jest-dom'
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'
import { configureStore } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import kanbanReducer from '@/store/kanban/slice'
import dialogFormReducer from '@/store/dialog-form/slice'

expect.extend(matchers)

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserverMock as any
Element.prototype.scrollIntoView = vi.fn()

// Global test store creator
export const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      kanban: kanbanReducer,
      dialogForm: dialogFormReducer,
    },
    preloadedState: initialState,
  })
}

// Global render with provider
export const renderWithProvider = (
  ui: React.ReactElement,
  testStore = createTestStore()
) => {
  return render(<Provider store={testStore}>{ui}</Provider>)
}

afterEach(() => {
  cleanup()
})