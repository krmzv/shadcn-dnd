import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ColumnTypes, TodoItem } from '@/types/item-types'
import { v4 as uuidv4 } from 'uuid'
import { DragData } from '@/components/droppable-column'

export interface KanbanState {
	[ColumnTypes.TYPE_TODO]: TodoItem[]
	[ColumnTypes.TYPE_PROGRESS]: TodoItem[]
	[ColumnTypes.TYPE_DONE]: TodoItem[]
}

const initialState: KanbanState = {
	[ColumnTypes.TYPE_TODO]: [
		{
			id: uuidv4(),
			name: 'Create react app',
			description: 'Create it',
		},
	],
	[ColumnTypes.TYPE_PROGRESS]: [],
	[ColumnTypes.TYPE_DONE]: [],
}

const kanbanSlice = createSlice({
	name: 'kanban',
	initialState,
	reducers: {
		addTodoItem: (state, action: PayloadAction<string>) => {
			const newItem = {
				id: uuidv4(),
				name: action.payload,
				description: action.payload,
			}
			state[ColumnTypes.TYPE_TODO].push(newItem)
		},
		moveItem: (
			state,
			action: PayloadAction<{
				item: TodoItem
				sourceColumn: ColumnTypes
				destinationColumn: ColumnTypes
			}>,
		) => {
			const { item, sourceColumn, destinationColumn } = action.payload

			// Remove from source column
			state[sourceColumn] = state[sourceColumn].filter(
				(i) => i.id !== item.id,
			)

			// Add to destination column
			state[destinationColumn].push(item)
		},
		deleteItem: (
			state,
			action: PayloadAction<{
				itemId: string
				column: ColumnTypes
			}>,
		) => {
			const { itemId, column } = action.payload
			state[column] = state[column].filter((i) => i.id !== itemId)
		},
	},
})

export const { moveItem, deleteItem } = kanbanSlice.actions

export default kanbanSlice.reducer
