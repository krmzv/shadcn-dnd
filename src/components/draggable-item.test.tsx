import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { DraggableItem } from './draggable-item'
import { ColumnTypes, TodoItem } from '@/types/item-types'
import { openDialog } from '@/store/dialog-form/slice'
import { createTestStore, renderWithProvider } from '@/test-setup'

vi.mock('@atlaskit/pragmatic-drag-and-drop/element/adapter', () => ({
	draggable: vi.fn(() => () => {}),
}))

const mockHandleOpen = vi.fn(({ type, initialData }) => {
	store.dispatch(openDialog({ type, initialData }))
})

vi.mock('@/hooks/useDialogForm', () => ({
	useDialogForm: () => ({
		handleOpen: mockHandleOpen,
	}),
}))

let store: ReturnType<typeof createTestStore>

describe('DraggableItem', () => {
	const mockItem: TodoItem = {
		id: '1',
		name: 'Test Todo',
		description: 'Test Description',
		type: ColumnTypes.TYPE_TODO,
	}

	beforeEach(() => {
		store = createTestStore({
			dialogForm: {
				isOpen: false,
				mode: 'create',
				formData: {
					name: '',
					description: '',
					type: ColumnTypes.TYPE_TODO,
				},
			},
			kanban: {
				items: [mockItem],
			},
		})

		mockHandleOpen.mockClear()
	})

	it('renders item content correctly', () => {
		renderWithProvider(
			<DraggableItem item={mockItem} column={ColumnTypes.TYPE_TODO} />,
		)

		expect(screen.getByText('Test Todo')).toBeInTheDocument()
		expect(screen.getByText('Test Description')).toBeInTheDocument()
	})

	it('handles item deletion through store', () => {
		const store = createTestStore({
			kanban: {
				items: [mockItem],
			},
		})

		renderWithProvider(
			<DraggableItem item={mockItem} column={ColumnTypes.TYPE_TODO} />,
			store,
		)

		const deleteButton = screen.getByRole('button', { name: /delete/i })
		fireEvent.click(deleteButton)

		expect(store.getState().kanban.items).toHaveLength(0)
	})

	it('opens dialog form in edit mode on double click', () => {
		renderWithProvider(
			<DraggableItem item={mockItem} column={ColumnTypes.TYPE_TODO} />,
			store,
		)

		const card = screen.getByTestId('draggable-card')
		fireEvent.doubleClick(card)

		expect(mockHandleOpen).toHaveBeenCalledWith({
			type: ColumnTypes.TYPE_TODO,
			initialData: mockItem,
		})

		expect(store.getState().dialogForm).toEqual({
			isOpen: true,
			mode: 'edit',
			formData: {
				id: mockItem.id,
				name: mockItem.name,
				description: mockItem.description,
				type: mockItem.type,
			},
		})
	})
})
