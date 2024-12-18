import './App.css'
import { DraggableItem } from './components/draggable-item'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DroppableColumn } from './components/droppable-column'
import { v4 as uuidv4 } from 'uuid'
import { ColumnTypes } from './types/item-types'
import { useSelector } from 'react-redux'
import { RootState } from './store'

const initialTodos = [
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

const initialProgress = [
	{
		id: uuidv4(),
		name: '📡 Deploy radio telescopes',
		description: 'Capture the full resolution of the universe',
	},
]

const initialDone = [
	{
		id: uuidv4(),
		name: 'Finish it!',
		description: 'Done!',
	},
]

function App() {
	const board = useSelector((state: RootState) => state.kanban)
	console.log(board)
	return (
		<>
			<header className="w-full border-b p-4 flex items-center justiy-start">
				<span className="font-bold italic font-xs">todos.</span>
			</header>
			<main className="flex w-full md:h-[calc(100vh-7.5rem)] gap-4 flex-1 justify-between py-4 ">
				<DroppableColumn
					items={board.TYPE_TODO}
					title={ColumnTypes.TYPE_TODO}
				></DroppableColumn>
				<DroppableColumn
					items={board.TYPE_PROGRESS}
					title={ColumnTypes.TYPE_PROGRESS}
				></DroppableColumn>
				<DroppableColumn
					items={board.TYPE_DONE}
					title={ColumnTypes.TYPE_DONE}
				></DroppableColumn>
			</main>
			<footer className="p-4">
				<span className="font-xs">todos. Copyright</span>
			</footer>
		</>
	)
}

export default App
