import { addItem, updateItem } from "@/store/todos/slice"
import { TodoItem } from "@/types/item-types"
import { useCallback } from "react"
import { useDispatch } from "react-redux"

export const useTodos = () => {
	const dispatch = useDispatch()

	const handleAddItem = useCallback(({ name, description, type }: TodoItem) => {
		dispatch(addItem({ name, description, type }))
	}, [dispatch])

	const handleUpdateItem = useCallback(({ id, name, description, type }: TodoItem) => {
		dispatch(updateItem({ id, name, description, type }))
	}, [dispatch])

	return { handleAddItem, handleUpdateItem }
}
