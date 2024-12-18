import { ReactNode, useEffect, useRef, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { useDispatch } from 'react-redux'
import { addTodoItem, moveItem } from '@/store/todos/slice'
import { ColumnTypes, TodoItem } from '@/types/item-types'
import { DraggableItem } from './draggable-item'

type DroppableColumnTypes = {
	name: ColumnTypes
	items: TodoItem[]
	handleAddItem?: (text: string) => void
}

export type DragData = {
	item: TodoItem
	sourceColumn: ColumnTypes
	destinationColumn: ColumnTypes
}

export type TodoInputProps = {
	handleAddItem: (text: string) => void
	column: ColumnTypes
}

const TodoInput = ({ handleAddItem, column }: TodoInputProps) => {
	const dispatch = useDispatch()
	const [text, setText] = useState('')

	const handleSubmit = () => {
		if (text.trim()) {
			handleAddItem(text.trim())
			setText('')
		}
	}

	return (
		<div className="flex w-full">
			<Input
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="Add new todo"
				className="flex-grow p-2 border rounded-l"
			/>
			<Button variant="outline" onClick={handleSubmit}>
				Add Todo
			</Button>
		</div>
	)
}

const DroppableColumn = ({
	name,
	items,
	handleAddItem,
}: DroppableColumnTypes) => {
	const ref = useRef(null)
	const dispatch = useDispatch()
	const [isOver, setIsOver] = useState(false)

	useEffect(() => {
		const element = ref.current
		if (!element) return

		return dropTargetForElements({
			element,
			canDrop: (args) => {
				// Prevent dropping in the same column
				return args.source.data.sourceColumn !== name
			},
			onDragEnter: () => setIsOver(true),
			onDragLeave: () => setIsOver(false),
			onDrop: (args) => {
				const data = args.source.data as DragData
				dispatch(
					moveItem({
						item: data.item,
						sourceColumn: data.sourceColumn,
						destinationColumn: name,
					}),
				)
				setIsOver(false)
			},
		})
	}, [name, dispatch])
	return (
		<section
			ref={ref}
			className="flex flex-col flex-1 items-start h-full bg-zinc-100 rounded-md p-4"
		>
			<h1 className="font-bold pb-2">{name}</h1>
			<TodoInput column={name} handleAddItem={handleAddItem!} />
			<ScrollArea className="w-full py-2">
				<div className="flex flex-col gap-2">
					{items.map((item, index) => {
						return (
							<DraggableItem
								key={item.id}
								item={item}
								column={name}
							/>
						)
					})}
				</div>
			</ScrollArea>
		</section>
	)
}

export { DroppableColumn }
