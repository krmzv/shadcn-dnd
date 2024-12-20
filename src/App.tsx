import './App.css'
import { DroppableColumn } from './components/droppable-column'
import { ColumnTypes } from './types/item-types'
import { useSelector } from 'react-redux'
import { RootState } from './store'

function App() {
	return (
		<>
			<header className="w-full border-b p-4 flex items-center justiy-start">
				<span className="font-bold italic font-xs">todos.</span>
			</header>
			<main className="flex w-full md:h-[calc(100vh-7.5rem)] gap-4 flex-1 justify-between py-4 ">
				<DroppableColumn name={ColumnTypes.TYPE_TODO} />
				<DroppableColumn name={ColumnTypes.TYPE_PROGRESS} />
				<DroppableColumn name={ColumnTypes.TYPE_DONE} />
			</main>
			<footer className="p-2">
				<span className="font-xs">todos. Copyright</span>
			</footer>
		</>
	)
}

export default App
