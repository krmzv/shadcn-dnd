import { useEffect, useRef, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { useDispatch, useSelector } from 'react-redux'
import { moveItem } from '@/store/todos/slice'
import { ColumnTypes, TodoItem } from '@/types/item-types'
import { DraggableItem } from './draggable-item'
import { RootState } from '@/store'
import { DialogForm } from './dialog-form'
import { selectItemsByColumn } from '@/store/todos/selectors'

type DroppableColumnTypes = {
	name: ColumnTypes
}

export type DragData = {
	item: TodoItem
	sourceColumn: ColumnTypes
}

const DroppableColumn = ({ name }: DroppableColumnTypes) => {
	const ref = useRef(null)
	const dispatch = useDispatch()
	const [isOver, setIsOver] = useState(false)

	const items = useSelector((state: RootState) => selectItemsByColumn(state, name))

	useEffect(() => {
		const element = ref.current
		if (!element) return

		return dropTargetForElements({
			element,
			canDrop: (args) => {
				return args.source.data.sourceColumn !== name
			},
			onDragEnter: () => {
				setIsOver(true)
			},
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

	const scrollAreaBg = `${
		isOver
			? 'bg-green-50 outline outline-green-500 outline-offset-1 outline-1 outline-dashed box-border rounded-md'
			: ''
	}`
	const scrollAreaClass = `w-full max-w-full p-2 h-full ${scrollAreaBg}`

	return (
		<section
			ref={ref}
			className="flex flex-col flex-1 items-start h-full bg-zinc-100 rounded-md p-4"
		>
			<div className="flex w-full items-center justify-between pb-2">
				<h1 className="font-bold">
					{name} ({items.length})
				</h1>
				<DialogForm type={name}/>
			</div>
			<ScrollArea className={scrollAreaClass}>
				<div className="flex flex-col gap-2 min-h-max">
					{items.map((item) => (
						<DraggableItem 
							key={item.id}
							item={item} 
							column={name}
						/>
					))}
				</div>
			</ScrollArea>
		</section>
	)
}

export { DroppableColumn }
