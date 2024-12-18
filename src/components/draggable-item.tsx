import { BellRing, Check } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { useEffect, useRef } from 'react'
import { TodoItem, ColumnTypes } from '@/types/item-types'

type CardProps = React.ComponentProps<typeof Card>

type DraggableItemProps = {
	item: TodoItem
	column: ColumnTypes
}

export function DraggableItem({
	item,
	column,
	...props
}: DraggableItemProps & CardProps) {
	const ref = useRef(null)

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

	return (
		<Card ref={ref} {...props}>
			<CardHeader className="items-start p-4">
				<CardTitle className="font-medium text-base">
					{item.name}
				</CardTitle>
				<CardDescription>{item.description}</CardDescription>
			</CardHeader>
		</Card>
	)
}
