import { v4 as uuidv4 } from 'uuid'

export const initialTodos = [
	{
		id: uuidv4(),
		name: '🎧 Create react project',
		description: 'Make drag and drop kanban list for todos',
	},
	{
		id: uuidv4(),
		name: '🥘 Cook a lunch',
		description: 'Make carbonaras',
	},
]

export const initialProgress = [
	{
		id: uuidv4(),
		name: '📡 Deploy radio telescopes',
		description: 'Capture the full resolution of the universe',
	},
]

export const initialDone = [
	{
		id: uuidv4(),
		name: 'Finish it!',
		description: 'Done!',
	},
]
