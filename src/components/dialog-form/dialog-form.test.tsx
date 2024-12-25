import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { DialogForm } from './dialog-form'
import { ColumnTypes, TodoItem } from '@/types/item-types'
import { createTestStore, renderWithProvider } from '@/test-setup'

const mockHandleUpdateItem = vi.fn()
const mockHandleAddItem = vi.fn()

vi.mock('@/hooks/useTodos', () => ({
	useTodos: () => ({
		handleAddItem: mockHandleAddItem,
		handleUpdateItem: mockHandleUpdateItem,
	}),
}))

let store: ReturnType<typeof createTestStore>

describe('DialogForm', () => {
	const mockItem: TodoItem = {
		id: '1',
		name: 'Test Todo',
		description: 'Test Description',
		type: ColumnTypes.TYPE_TODO,
	}

	beforeEach(() => {
		store = createTestStore({
			dialogForm: {
				isOpen: true,
				mode: 'edit',
				formData: mockItem,
			},
		})

		mockHandleUpdateItem.mockClear()
		mockHandleAddItem.mockClear()
	})

	it('handles form editing and submission', () => {
		renderWithProvider(
			<DialogForm type={ColumnTypes.TYPE_TODO} initialData={mockItem} />,
			store,
		)

		const nameInput = screen.getByLabelText('Name')
		const descriptionInput = screen.getByLabelText('Description')

		fireEvent.change(nameInput, { target: { value: 'Updated Todo' } })
		fireEvent.change(descriptionInput, {
			target: { value: 'Updated Description' },
		})

		const form = screen.getByRole('form')
		fireEvent.submit(form)

		expect(mockHandleUpdateItem).toHaveBeenCalledWith(
			expect.objectContaining({
				id: '1',
				name: 'Updated Todo',
				description: 'Updated Description',
				type: ColumnTypes.TYPE_TODO,
			}),
		)
	})
})
