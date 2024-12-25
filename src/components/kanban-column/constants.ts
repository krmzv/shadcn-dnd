import { ColumnTypes } from '@/types/item-types'

export const mapColumnNames = {
	[ColumnTypes.TYPE_TODO]: 'Todo',
	[ColumnTypes.TYPE_PROGRESS]: 'In Progress',
	[ColumnTypes.TYPE_DONE]: 'Done',
}

export const mapColumnHeaderClassnames = {
	[ColumnTypes.TYPE_TODO]: 'bg-cyan-800',
	[ColumnTypes.TYPE_PROGRESS]: 'bg-fuchsia-800',
	[ColumnTypes.TYPE_DONE]: 'bg-sky-800',
}

export const mapColumnScrollAreaClassnames = {
	[ColumnTypes.TYPE_TODO]: 'bg-cyan-50',
	[ColumnTypes.TYPE_PROGRESS]: 'bg-fuchsia-50',
	[ColumnTypes.TYPE_DONE]: 'bg-sky-50',
}
