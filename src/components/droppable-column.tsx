import { useEffect, useRef, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { useDispatch, useSelector } from 'react-redux'
import {
	moveItem,
	AddItemPayloadTypes,
	addItem,
	KanbanCount,
	KanbanState,
} from '@/store/todos/slice'
import { ColumnTypes, TodoItem } from '@/types/item-types'
import { DraggableItem } from './draggable-item'
import { RootState } from '@/store'

type DroppableColumnTypes = {
	name: ColumnTypes
	items: TodoItem[]
}

export type DragData = {
	item: TodoItem
	sourceColumn: ColumnTypes
	destinationColumn: ColumnTypes
}

export type TodoInputProps = {
	handleAddItem: ({ name, description, type }: AddItemPayloadTypes) => void
	type: ColumnTypes
}

const TodoInput = ({ handleAddItem, type }: TodoInputProps) => {
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')

	const handleSubmit = () => {
		if (name.trim()) {
			handleAddItem({
				name: name.trim(),
				description: description.trim(),
				type,
			})
			setDescription('')
			setName('')
		}
	}

	return (
		<div className="flex flex-col w-full">
			<Input
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Task name"
				className="flex-grow p-2 border rounded-l"
			/>
			<Input
				type="text"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				placeholder="Describe the task"
				className="flex-grow p-2 border rounded-l"
			/>
			<Button variant="outline" onClick={handleSubmit}>
				Add Todo
			</Button>
		</div>
	)
}

const DroppableColumn = ({ name, items }: DroppableColumnTypes) => {
	const ref = useRef(null)
	const dispatch = useDispatch()
	const [isOver, setIsOver] = useState(false)

	const board: KanbanState = useSelector((state: RootState) => state.kanban)

	const count = Object.keys(board).reduce<KanbanCount>(
		(acc, curr) => {
			acc[curr as keyof KanbanCount] =
				board[curr as keyof KanbanState].length
			return acc
		},
		{
			[ColumnTypes.TYPE_TODO]: 0,
			[ColumnTypes.TYPE_PROGRESS]: 0,
			[ColumnTypes.TYPE_DONE]: 0,
		},
	)

	const handleAddItem = ({
		name,
		description,
		type,
	}: AddItemPayloadTypes) => {
		dispatch(
			addItem({
				name,
				description,
				type,
			}),
		)
	}

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
			<h1 className="font-bold pb-2">
				{name} ({count[name]})
			</h1>
			<TodoInput type={name} handleAddItem={handleAddItem} />
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
