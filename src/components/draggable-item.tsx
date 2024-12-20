import { XIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { useEffect, useRef, useState } from 'react'
import { TodoItem, ColumnTypes } from '@/types/item-types'
import { deleteItem } from '@/store/todos/slice'
import { useDispatch } from 'react-redux'
import { useDialogForm } from '@/hooks/useDialogForm'

type CardProps = React.ComponentProps<typeof Card>

export type DraggableItemProps = {
	item: TodoItem
	column: ColumnTypes
}

export function DraggableItem({
	item,
	column,
	...props
}: DraggableItemProps & CardProps) {
	const ref = useRef(null)
	const dispatch = useDispatch()
	const [grabbing, setGrabbing] = useState<boolean>(false)
	const { handleOpen } = useDialogForm()

	useEffect(() => {
		const element = ref.current
		if (!element) return

		return draggable({
			element,
			getInitialData: () => ({
				item,
				sourceColumn: column,
			}),
			onDragStart: () => setGrabbing(true),
			onDrop: () => setGrabbing(false),
		})
	}, [item, column])

	const handleDeleteItem = () => {
		dispatch(deleteItem({ itemId: item.id! }))
	}

	const handleDoubleClick = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		handleOpen(column, item)
	}

	const cardAnimation =
		'duration-200 animate-in fade-in-0 zoom-in-95 slide-in-from-top-[48%]'
	const cardClass = `group cursor-grab box-border ${cardAnimation}`

	return (
		<Card
			ref={ref}
			{...props}
			className={cardClass}
			onDoubleClick={handleDoubleClick}
		>
			<CardHeader className="items-start p-4">
				<div className="flex w-full min-h-[2rem] items-center justify-between">
					<CardTitle className="font-medium text-base">
						{item.name}
					</CardTitle>
					<Button
						variant="destructive"
						className="p-2 h-auto hidden group-hover:block"
						onClick={handleDeleteItem}
					>
						<XIcon />
					</Button>
				</div>
				<CardDescription>{item.description}</CardDescription>
			</CardHeader>
		</Card>
	)
}
