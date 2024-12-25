import { ColumnContainerT } from '@/types/item-types'
import { DialogForm } from '@/components/dialog-form'
import {
	mapColumnNames,
	mapColumnHeaderClassnames,
	mapColumnScrollAreaClassnames,
} from './constants'

const ColumnContainer = ({ children, name, count }: ColumnContainerT) => {
	const columnName = mapColumnNames[name]
	const bgClass = mapColumnHeaderClassnames[name]
	const scrollAreaClass = mapColumnScrollAreaClassnames[name]
	return (
		<section className="flex flex-col flex-1 items-start h-full bg-zinc-100 rounded-md min-w-[20rem] overflow-hidden box-border">
			<div
				className={`flex w-full items-center justify-between p-4 ${bgClass}`}
			>
				<h1
					className="font-bold text-white"
					data-testid="column-title"
					data-title={`${columnName} (${count})`}
				>
					{columnName} ({count})
				</h1>
				<DialogForm type={name} />
			</div>
			<div className={`p-2 w-full h-full ${scrollAreaClass}`}>
				{children}
			</div>
		</section>
	)
}

export { ColumnContainer }
