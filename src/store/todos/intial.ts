import { v4 as uuidv4 } from 'uuid'
import { ColumnTypes } from '@/types/item-types'

export const initialItems = [
	{
		id: uuidv4(),
		name: '🎧 Create react project',
		description: 'Make drag and drop kanban list for todos',
		type: ColumnTypes.TYPE_TODO,
	},
	{
		id: uuidv4(),
		name: '🥘 Cook a lunch',
		description: 'Make carbonaras',
		type: ColumnTypes.TYPE_TODO,
	},
	{
		id: uuidv4(),
		name: '📡 Deploy radio telescopes',
		description: 'Capture the full resolution of the universe',
		type: ColumnTypes.TYPE_PROGRESS,
	},
	{
		id: uuidv4(),
		name: 'Finish it!',
		description: 'Done!',
		type: ColumnTypes.TYPE_DONE,
	},
]
