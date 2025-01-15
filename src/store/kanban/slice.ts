import { createSlice } from '@reduxjs/toolkit'
import { TodoItem } from '@/types/item-types'
import { initialItems } from './intial'
import { createItem, updateItem, moveItem, deleteItem } from './actions'

export interface KanbanState {
	items: TodoItem[]
}

const initialState: KanbanState = {
	items: [...initialItems],
}

const kanbanSlice = createSlice({
	name: 'kanban',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createItem, (state, action) => {
				state.items.push(action.payload)
			})
			.addCase(updateItem, (state, action) => {
				const { id } = action.payload
				const itemIndex = state.items.findIndex(item => item.id === id)
				if (itemIndex !== -1) {
					// Remove the item and add it at the end of the array
					state.items.splice(itemIndex, 1)
					state.items.push(action.payload)
				}
			})
			.addCase(moveItem, (state, action) => {
				const { item, destinationColumn } = action.payload
				const itemIndex = state.items.findIndex(i => i.id === item.id)
				if (itemIndex !== -1) {
					// Remove the item from its current position
					state.items.splice(itemIndex, 1)
					// Add it at the end with new column type
					state.items.push({ ...item, type: destinationColumn })
				}
			})
			.addCase(deleteItem, (state, action) => {
				const { id } = action.payload
				state.items = state.items.filter(item => item.id !== id)
			})
	}
})

export default kanbanSlice.reducer
