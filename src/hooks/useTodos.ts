import { DragDataT } from '@/types/item-types'
import { RootState } from '@/store'
import { selectItemsByColumn } from '@/store/todos/selectors'
import { addItem, updateItem, moveItem, deleteItem } from '@/store/todos/slice'
import { DroppableColumnT, TodoItem } from '@/types/item-types'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useTodos = () => {
	const dispatch = useDispatch()

	const itemsByColumn = ({ name }: DroppableColumnT) =>
		useSelector((state: RootState) => selectItemsByColumn(state, name))

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
