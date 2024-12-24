import { useEffect, useRef, useState } from 'react'
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { autoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { ColumnTypes, DragDataT, DroppableColumnT } from '@/types/item-types'
import { DraggableItem } from '@/components/draggable-item'
import { useTodos } from '@/hooks/useTodos'
import { ColumnContainer } from '@/components/column'

export const mapColumnNames = {
	[ColumnTypes.TYPE_TODO]: 'Todo',
	[ColumnTypes.TYPE_PROGRESS]: 'In Progress',
	[ColumnTypes.TYPE_DONE]: 'Done',
}

const DroppableColumn = ({ name }: DroppableColumnT) => {
	const ref = useRef(null)
	const { handleMoveItem, itemsByColumn } = useTodos()
	const [isOver, setIsOver] = useState(false)

	const items = itemsByColumn({ name })

	useEffect(() => {
		const element = ref.current
		if (!element) return

		return combine(
			dropTargetForElements({
				element,
				canDrop: (args) => {
					return args.source.data.sourceColumn !== name
				},
				onDragEnter: () => {
					setIsOver(true)
				},
				onDragLeave: () =>  setIsOver(false),
				onDrop: (args) => {
					const { item, sourceColumn } = args.source.data as DragDataT
					handleMoveItem({
						item,
						sourceColumn,
						destinationColumn: name,
					})
					setIsOver(false)
				},
			}),
			autoScrollForElements({
				element,
			}),
		)
	}, [name])

	const scrollAreaBg = `${
		isOver
			? 'bg-green-50 outline outline-green-500 outline-offset-1 outline-1 outline-dashed box-border rounded-md'
			: ''
	}`
	const scrollAreaClass = `w-full max-w-full overflow-y-auto p-2 h-full ${scrollAreaBg}`

	return (
		<ColumnContainer name={name} count={items.length}>
			<div ref={ref} className={scrollAreaClass}>
				<ul className="flex flex-col gap-2 min-h-max">
					{items.map((item) => (
						<DraggableItem
							key={item.id}
							item={item}
							column={name}
						/>
					))}
				</ul>
			</div>
		</ColumnContainer>
	)
}

export { DroppableColumn }
