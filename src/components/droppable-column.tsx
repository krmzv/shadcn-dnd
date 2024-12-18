import { ReactNode, useEffect, useRef, useState } from 'react'
import { ScrollArea } from './ui/scroll-area'
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { useDispatch } from 'react-redux'
import { moveItem } from '@/store/todos/slice'
import { ColumnTypes, TodoItem } from '@/types/item-types'
import { DraggableItem } from './draggable-item'

type DroppableColumnTypes = {
	title: ColumnTypes
	items: TodoItem[]
}

export type DragData = {
	item: TodoItem
	sourceColumn: ColumnTypes
	destinationColumn: ColumnTypes
}

const DroppableColumn = ({ title, items }: DroppableColumnTypes) => {
	const ref = useRef(null)
	const dispatch = useDispatch()
	const [isOver, setIsOver] = useState(false)

	useEffect(() => {
		const element = ref.current
		if (!element) return

		return dropTargetForElements({
			element,
			//   canDrop: (args) => {
			//     // Prevent dropping in the same column
			//     return args.source.data.sourceColumn !== title;
			//   },
			onDragEnter: () => setIsOver(true),
			onDragLeave: () => setIsOver(false),
			onDrop: (args) => {
				const data = args.source.data as DragData
				dispatch(
					moveItem({
						item: data.item,
						sourceColumn: data.sourceColumn,
						destinationColumn: title,
					}),
				)
				setIsOver(false)
			},
		})
	}, [title, dispatch])
	return (
		<section
			ref={ref}
			className="flex flex-col flex-1 h-full bg-zinc-100 rounded-md p-4"
		>
			<ScrollArea>
				<div className="flex flex-col gap-2">
					{items.map((item, index) => {
						return (
							<DraggableItem
								key={item.id}
								item={item}
								column={title}
							/>
						)
					})}
				</div>
			</ScrollArea>
		</section>
	)
}

export { DroppableColumn }
