import { useEffect, useRef } from 'react'
import { XIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { TodoItem, ColumnTypes } from '@/types/item-types'
import { useDialogForm } from '@/hooks/useDialogForm'
import { useTodos } from '@/hooks/useTodos'

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
	const { handleDeleteItem } = useTodos()
	const { handleOpenDialogForm } = useDialogForm()

	useEffect(() => {
		const element = ref.current
		if (!element) return

		return draggable({
			element,
			getInitialData: () => ({
				item,
				sourceColumn: column,
			}),
		})
	}, [item, column])

	const handleDelete = () => {
		handleDeleteItem({ id: item.id })
	}

	const handleDoubleClick = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		handleOpenDialogForm({ type: column, initialData: item })
	}

	const cardAnimation =
		'duration-200 animate-in fade-in-0 zoom-in-95 slide-in-from-top-[48%]'
	const cardClass = `group cursor-grab box-border ${cardAnimation}`

	return (
		<li>
			<Card
				ref={ref}
				{...props}
				className={cardClass}
				onDoubleClick={handleDoubleClick}
				data-testid="draggable-card"
				role="button"
    			aria-labelledby="card-title"
				tabIndex={0}
			>
				<CardHeader className="items-start p-3">
					<div className="flex w-full min-h-[2rem] items-center justify-between">
						<CardTitle id="card-title" className="text-start font-medium text-sm md:text-base">
							{item.name}
						</CardTitle>
						<Button
							variant="destructive"
							className="p-2 h-auto invisible group-hover:visible"
							onClick={handleDelete}
							aria-label={`Delete task: ${item.name}`}
						>
							<XIcon aria-hidden="true" />
						</Button>
					</div>
					<CardDescription className="text-start">
						{item.description}
					</CardDescription>
				</CardHeader>
			</Card>
		</li>
	)
}
