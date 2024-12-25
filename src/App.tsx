import './App.css'
import { DroppableColumn } from '@/components/kanban-column'
import { ColumnTypes } from '@/types/item-types'
import { Search } from '@/components/search'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

function App() {
	return (
		<>
			<header className="w-full border-b p-4 flex flex-col items-start md:flex-row md:items-center md:justify-between">
				<span className="font-bold italic font-xs">todos.</span>
				<Search />
			</header>
			<main role="main" className="flex w-full max-w-full overflow-x-auto h-[calc(100vh-6.45rem)] gap-4 flex-1 justify-between p-4 ">
				{Object.keys(ColumnTypes).map((column, index) => (
					<DroppableColumn key={index} name={column as ColumnTypes} />
				))}
			</main>
			<footer>
				<VisuallyHidden.Root>
					todos. Copyright {new Date().getFullYear()}
				</VisuallyHidden.Root>
			</footer>
		</>
	)
}

export default App
