import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ColumnTypes, TodoItem } from '@/types/item-types'
import { v4 as uuidv4 } from 'uuid'
import { initialItems } from './intial'

export interface KanbanState {
	items: TodoItem[]
}

const initialState: KanbanState = {
	items: [...initialItems],
}

const kanbanSlice = createSlice({
	name: 'kanban',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<TodoItem>) => {
			const newItem: TodoItem = {
				id: uuidv4(),
				name: action.payload.name,
				description: action.payload.description,
				type: action.payload.type,
			}
			state.items.push(newItem)
		},
		updateItem: (state, action: PayloadAction<TodoItem>) => {
			const { id, name, description, type } = action.payload
			if (!id) return

			const itemIndex = state.items.findIndex((item) => item.id === id)
			if (itemIndex !== -1) {
				state.items[itemIndex] = { id, name, description, type }
			}
		},
		moveItem: (
			state,
			action: PayloadAction<{
				item: TodoItem
				sourceColumn: ColumnTypes
				destinationColumn: ColumnTypes
			}>,
		) => {
			const { item, destinationColumn } = action.payload

			state.items = state.items.filter((i) => i.id !== item.id)

			state.items.push({
				...item,
				type: destinationColumn,
			})
		},
		deleteItem: (state, action: PayloadAction<Pick<TodoItem, 'id'>>) => {
			const { id } = action.payload
			state.items = state.items.filter((item) => item.id !== id)
		},
	},
})

export const { addItem, updateItem, moveItem, deleteItem } = kanbanSlice.actions

export default kanbanSlice.reducer
