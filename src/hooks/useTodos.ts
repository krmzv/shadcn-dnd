import { DragDataT } from '@/types/item-types'
import { RootState } from '@/store'
import { createItem, updateItem, moveItem, deleteItem } from '@/store/kanban/actions'
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
		({ name, description, type }: Omit<TodoItem, 'id'>) => {
			dispatch(createItem({ name, description, type }))
		},
		[dispatch],
	)

	const handleUpdateItem = useCallback(
		(item: TodoItem) => {
			dispatch(updateItem(item))
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
		(dragData: DragDataT) => {
			dispatch(moveItem(dragData))
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
