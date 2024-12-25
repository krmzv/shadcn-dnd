import { TodoItem } from "@/types/item-types"

export const filterItems = (items: TodoItem[], query: string) => {
	const searchTerm = query.toLowerCase()

	if (searchTerm.length === 0) return items

	return items.filter(item => {
		const words = item.name.toLowerCase().split(' ')
		return words.some(word => word.startsWith(searchTerm))
	}) 
}