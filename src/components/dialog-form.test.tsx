import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { DialogForm } from './dialog-form'
import { ColumnTypes, TodoItem } from '@/types/item-types'
import kanbanReducer from '@/store/todos/slice'
import dialogFormReducer from '@/store/dialog-form/slice'

vi.mock('@/hooks/useTodos', () => ({
  useTodos: () => ({
    handleAddItem: vi.fn(),
    handleUpdateItem: vi.fn(),
  }),
}))

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      kanban: kanbanReducer,
      dialogForm: dialogFormReducer,
    },
    preloadedState: initialState,
  })
}

const renderWithProvider = (ui: React.ReactElement, store = createTestStore()) => {
  return render(<Provider store={store}>{ui}</Provider>)
}

describe('DialogForm', () => {
  it('renders in edit mode and handles update', () => {
    const initialData: TodoItem = {
      id: '1',
      name: 'Test Todo',
      description: 'Test Description',
      type: ColumnTypes.TYPE_TODO,
    }

    const store = createTestStore({
      dialogForm: {
        isOpen: true,
        formData: initialData,
        mode: 'edit',
      },
    })

    renderWithProvider(
      <DialogForm type={ColumnTypes.TYPE_TODO} initialData={initialData} />,
      store
    )

    expect(screen.getByText('Edit Todo')).toBeInTheDocument()
    
    const submitButton = screen.getByRole('button', { name: /save changes/i })
    fireEvent.submit(submitButton)
  })
})
