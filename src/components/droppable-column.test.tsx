import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DroppableColumn } from '@/components/droppable-column'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import kanbanReducer from '@/store/todos/slice'
import dialogFormReducer from '@/store/dialog-form/slice'
import { ColumnTypes } from '@/types/item-types'

vi.mock('@atlaskit/pragmatic-drag-and-drop/element/adapter', () => ({
	dropTargetForElements: vi.fn(() => () => {}),
	draggable: vi.fn(() => () => {}),
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

// Test provider wrapper
const renderWithProvider = (
	ui: React.ReactElement,
	store = createTestStore(),
) => {
	return render(<Provider store={store}>{ui}</Provider>)
}

describe('DroppableColumn', () => {
	it('renders column with correct title and item count', () => {
		const store = createTestStore({
			kanban: {
				items: [
					{ id: '1', name: 'Test Todo', type: ColumnTypes.TYPE_TODO },
					{
						id: '2',
						name: 'Another Todo',
						type: ColumnTypes.TYPE_TODO,
					},
				],
			},
		})

		renderWithProvider(
			<DroppableColumn name={ColumnTypes.TYPE_TODO} />,
			store,
		)

		expect(screen.getByTestId('column-title')).toHaveTextContent('Todo (2)')
	})

	it('renders empty column correctly', () => {
		const store = createTestStore({
			kanban: {
				items: [],
			},
		})

		renderWithProvider(
			<DroppableColumn name={ColumnTypes.TYPE_TODO} />,
			store,
		)

		expect(screen.getByTestId('column-title')).toHaveTextContent('Todo (0)')
	})

	// it('renders add button in column header', () => {
	// 	renderWithProvider(<DroppableColumn name={ColumnTypes.TYPE_TODO} />)

	// 	const addButton = screen.getByRole('button', { name: /create todo/i })
	// 	expect(addButton).toBeInTheDocument()
	// })

	it('renders todo items for the correct column', () => {
		const store = createTestStore({
			kanban: {
				items: [
					{ id: '1', name: 'Todo 1', type: ColumnTypes.TYPE_TODO },
					{
						id: '2',
						name: 'Progress 1',
						type: ColumnTypes.TYPE_PROGRESS,
					},
					{ id: '3', name: 'Todo 2', type: ColumnTypes.TYPE_TODO },
				],
			},
		})

		renderWithProvider(
			<DroppableColumn name={ColumnTypes.TYPE_TODO} />,
			store,
		)

		expect(screen.getByText('Todo 1')).toBeInTheDocument()
		expect(screen.getByText('Todo 2')).toBeInTheDocument()
		expect(screen.queryByText('Progress 1')).not.toBeInTheDocument()
	})
})
