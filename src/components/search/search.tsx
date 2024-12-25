import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { useTodos } from '@/hooks/useTodos'
import { ColumnTypes } from '@/types/item-types'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'
import { Search as IconSearch } from 'lucide-react'
import { mapColumnNames } from '@/components/kanban-column'
import { filterItems } from './filter'
import { useSearchDialog } from '@/hooks/useSearchDialog'

export function Search() {
	const { 
		open, 
		searchQuery, 
		setSearchQuery, 
		handleItemSelect,
		handleOpenChange 
	} = useSearchDialog()
	const { itemsByColumn } = useTodos()

	return (
		<>
			<Button
				variant="outline"
				className="px-2 justify-between flex min-w-[15rem] w-full md:w-auto"
				onClick={() => handleOpenChange(true)}
			>
				<div className="flex items-center">
					<IconSearch className="h-4 mr-2 w-4 shrink-0 opacity-50" />
					Search tasks...
				</div>
				<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
					<span className="text-xs">⌘</span>K
				</kbd>
			</Button>
			<CommandDialog open={open} onOpenChange={handleOpenChange}>
				<DialogTitle>
					<VisuallyHidden.Root>
						Search for items in your kanban board
					</VisuallyHidden.Root>
				</DialogTitle>
				<CommandInput 
					placeholder="Search for items..." 
					value={searchQuery}
					onValueChange={setSearchQuery}
				/>
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					{Object.keys(ColumnTypes).map((column, index) => {
						const items = itemsByColumn({
							name: column as ColumnTypes,
						})
						const filteredItems = filterItems(items, searchQuery)
						
						return (
							filteredItems.length !== 0 && (
								<CommandGroup
									key={`${column}-${index}`}
									heading={mapColumnNames[column as ColumnTypes]}
								>
									{filteredItems
										.map((item) => (
											<CommandItem
												key={item.id}
												onSelect={() =>
													handleItemSelect({
														column: column as ColumnTypes,
														item,
													})
												}
											>
												{item.name}
											</CommandItem>
										))}
								</CommandGroup>
							)
						)
					})}
				</CommandList>
			</CommandDialog>
		</>
	)
}
