import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ColumnTypes, TodoItem } from '@/types/item-types'
import { v4 as uuidv4 } from 'uuid'
import { initialTodos, initialProgress, initialDone } from './intial'

export interface KanbanState {
	[ColumnTypes.TYPE_TODO]: TodoItem[]
	[ColumnTypes.TYPE_PROGRESS]: TodoItem[]
	[ColumnTypes.TYPE_DONE]: TodoItem[]
}

export interface KanbanCount {
	[ColumnTypes.TYPE_TODO]: number
	[ColumnTypes.TYPE_PROGRESS]: number
	[ColumnTypes.TYPE_DONE]: number
}

export type AddItemPayloadTypes = Omit<TodoItem, 'id'> & {
	type: ColumnTypes
}

const initialState: KanbanState = {
	[ColumnTypes.TYPE_TODO]: initialTodos,
	[ColumnTypes.TYPE_PROGRESS]: initialProgress,
	[ColumnTypes.TYPE_DONE]: initialDone,
}

const kanbanSlice = createSlice({
	name: 'kanban',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<AddItemPayloadTypes>) => {
			const newItem: TodoItem = {
				id: uuidv4(),
				name: action.payload.name,
				description: action.payload.description,
			}
			state[action.payload.type].push(newItem)
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

export const { addItem, moveItem, deleteItem } = kanbanSlice.actions

export default kanbanSlice.reducer
