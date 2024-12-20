export type TodoItem = {
	id?: string
	name: string
	description?: string
	type?: ColumnTypes
}

export enum ColumnTypes {
	TYPE_TODO = 'TYPE_TODO',
	TYPE_PROGRESS = 'TYPE_PROGRESS',
	TYPE_DONE = 'TYPE_DONE',
}
