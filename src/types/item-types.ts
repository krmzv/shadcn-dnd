export enum ColumnTypes {
	TYPE_TODO = 'TYPE_TODO',
	TYPE_PROGRESS = 'TYPE_PROGRESS',
	TYPE_DONE = 'TYPE_DONE',
}

export type TodoItem = {
	id: string
	name: string
	description?: string
	type?: ColumnTypes
}

export type DroppableColumnT = {
	name: ColumnTypes
}

export type DragDataT = {
	item: TodoItem
	sourceColumn: ColumnTypes
	destinationColumn: ColumnTypes
}

export type ColumnContainerT = {
	children: React.ReactNode
	name: ColumnTypes
	count: number
}
