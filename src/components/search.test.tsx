import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { Search } from './search'
import { ColumnTypes } from '@/types/item-types'
import { openDialog } from '@/store/dialog-form/slice'
import { createTestStore, renderWithProvider } from '@/test-setup'


const mockHandleOpen = vi.fn(({ type, initialData }) => {
  store.dispatch(openDialog({ type, initialData }))
})

vi.mock('@/hooks/useDialogForm', () => ({
  useDialogForm: () => ({
    handleOpen: mockHandleOpen
  })
}))

const mockItems = [
  {
    id: '1',
    name: 'Test Todo',
    description: 'Test Description',
    type: ColumnTypes.TYPE_TODO,
  },
  {
    id: '2',
    name: 'In Progress Task',
    description: 'Progress Description',
    type: ColumnTypes.TYPE_PROGRESS,
  }
]

vi.mock('@/hooks/useTodos', () => ({
  useTodos: () => ({
    itemsByColumn: ({ name }: { name: ColumnTypes }) => 
      mockItems.filter(item => item.type === name)
  })
}))

let store: ReturnType<typeof createTestStore>

describe('Search', () => {
  beforeEach(() => {
    store = createTestStore({
      dialogForm: {
        isOpen: false,
        mode: 'create',
        formData: {
          name: '',
          description: '',
          type: ColumnTypes.TYPE_TODO
        }
      },
      kanban: {
        items: mockItems
      }
    })
    
    mockHandleOpen.mockClear()
  })

  it('opens search dialog when clicking search button', () => {
    renderWithProvider(<Search />)
    
    const searchButton = screen.getByText('Search tasks...')
    fireEvent.click(searchButton)

    expect(screen.getByPlaceholderText('Type a command or search...')).toBeInTheDocument()
    expect(screen.getByText('Test Todo')).toBeInTheDocument()
    expect(screen.getByText('In Progress Task')).toBeInTheDocument()
  })

  it('opens dialog form when selecting an item', () => {
    renderWithProvider(<Search />)
    
    const searchButton = screen.getByText('Search tasks...')
    fireEvent.click(searchButton)

    const searchResult = screen.getByText('Test Todo')
    fireEvent.click(searchResult)

    expect(mockHandleOpen).toHaveBeenCalledWith({
      type: ColumnTypes.TYPE_TODO,
      initialData: mockItems[0]
    })

    expect(store.getState().dialogForm).toEqual({
      isOpen: true,
      mode: 'edit',
      formData: {
        id: mockItems[0].id,
        name: mockItems[0].name,
        description: mockItems[0].description,
        type: mockItems[0].type
      }
    })
  })
})
