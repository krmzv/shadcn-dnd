import './App.css'
import { DraggableItem } from './components/draggable-item'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DroppableColumn } from './components/droppable-column'
import { v4 as uuidv4 } from 'uuid'
import { ColumnTypes } from './types/item-types'
import { useSelector } from 'react-redux'
import { RootState } from './store'
import { useDispatch } from 'react-redux'
import {
	addTodoItem,
	addInProgressItem,
	addDoneItem,
} from '@/store/todos/slice'

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
	const dispatch = useDispatch()
	const board = useSelector((state: RootState) => state.kanban)
	console.log(board)

	const handleAddTodoItem = (text: string) => {
		dispatch(addTodoItem(text))
	}

	const handleAddInProgressItem = (text: string) => {
		dispatch(addInProgressItem(text))
	}

	const handleAddDoneItem = (text: string) => {
		dispatch(addDoneItem(text))
	}

	return (
		<>
			<header className="w-full border-b p-4 flex items-center justiy-start">
				<span className="font-bold italic font-xs">todos.</span>
			</header>
			<main className="flex w-full md:h-[calc(100vh-7.5rem)] gap-4 flex-1 justify-between py-4 ">
				<DroppableColumn
					items={board.TYPE_TODO}
					name={ColumnTypes.TYPE_TODO}
					handleAddItem={handleAddTodoItem}
				></DroppableColumn>
				<DroppableColumn
					items={board.TYPE_PROGRESS}
					name={ColumnTypes.TYPE_PROGRESS}
					handleAddItem={handleAddInProgressItem}
				></DroppableColumn>
				<DroppableColumn
					items={board.TYPE_DONE}
					name={ColumnTypes.TYPE_DONE}
					handleAddItem={handleAddDoneItem}
				></DroppableColumn>
			</main>
			<footer className="p-4">
				<span className="font-xs">todos. Copyright</span>
			</footer>
		</>
	)
}

export default App
