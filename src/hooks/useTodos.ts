import { DragDataT } from '@/types/item-types'
import { RootState } from '@/store'
import { addItem, updateItem, moveItem, deleteItem } from '@/store/kanban/slice'
import { DroppableColumnT, TodoItem } from '@/types/item-types'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useTodos = () => {
	const dispatch = useDispatch()

	const items = useSelector((state: RootState) => state.kanban.items)

	const itemsByColumn = useCallback(
		({ name }: DroppableColumnT) => {
			return items.filter((item) => item.type === name)
		},
		[items],
	)

	const handleAddItem = useCallback(
		({ name, description, type }: TodoItem) => {
			dispatch(addItem({ name, description, type }))
		},
		[dispatch],
	)

	const handleUpdateItem = useCallback(
		({ id, name, description, type }: TodoItem) => {
			dispatch(updateItem({ id, name, description, type }))
		},
		[dispatch],
	)

	const handleDeleteItem = useCallback(
		({ id }: Pick<TodoItem, 'id'>) => {
			dispatch(deleteItem({ id }))
		},
		[dispatch],
	)

	const handleMoveItem = useCallback(
		({ item, sourceColumn, destinationColumn }: DragDataT) => {
			dispatch(
				moveItem({
					item,
					sourceColumn,
					destinationColumn,
				}),
			)
		},
		[dispatch],
	)

	return {
		handleAddItem,
		handleUpdateItem,
		handleDeleteItem,
		handleMoveItem,
		itemsByColumn,
	}
}
