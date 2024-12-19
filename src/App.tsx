import './App.css'
import { DroppableColumn } from './components/droppable-column'
import { ColumnTypes } from './types/item-types'
import { useSelector } from 'react-redux'
import { RootState } from './store'

function App() {
	const board = useSelector((state: RootState) => state.kanban)
	return (
		<>
			<header className="w-full border-b p-4 flex items-center justiy-start">
				<span className="font-bold italic font-xs">todos.</span>
			</header>
			<main className="flex w-full md:h-[calc(100vh-7.5rem)] gap-4 flex-1 justify-between py-4 ">
				<DroppableColumn
					items={board.TYPE_TODO}
					name={ColumnTypes.TYPE_TODO}
				></DroppableColumn>
				<DroppableColumn
					items={board.TYPE_PROGRESS}
					name={ColumnTypes.TYPE_PROGRESS}
				></DroppableColumn>
				<DroppableColumn
					items={board.TYPE_DONE}
					name={ColumnTypes.TYPE_DONE}
				></DroppableColumn>
			</main>
			<footer className="p-2">
				<span className="font-xs">todos. Copyright</span>
			</footer>
		</>
	)
}

export default App
