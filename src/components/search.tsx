import * as React from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useDialogForm } from "@/hooks/useDialogForm"
import { useTodos } from "@/hooks/useTodos"
import { ColumnTypes, TodoItem } from "@/types/item-types"
import { DialogTitle } from "@radix-ui/react-dialog"
import { Button } from "./ui/button"
import { Search as IconSearch } from "lucide-react"


type ItemSelectT = {
	column: ColumnTypes
	item: TodoItem
}

export function Search() {
  const [open, setOpen] = React.useState(false)
  const { handleOpen } = useDialogForm()
  const { itemsByColumn } = useTodos()
  

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleItemSelect = ({ column, item }: ItemSelectT) => {
	handleOpen({
		type: column as ColumnTypes,
		initialData: item,
	})
	setOpen(false)
  }

  return (
    <>
	  <Button variant="outline" className="px-2 justify-between flex min-w-[15rem] w-full md:w-auto" onClick={() => setOpen(true)}>
		<div className="flex items-center">
			<IconSearch className="h-4 mr-2 w-4 shrink-0 opacity-50" />
			Search tasks...
		</div>
		<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
	  </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
		<DialogTitle>
			<VisuallyHidden.Root>
				Search for items in your kanban board
			</VisuallyHidden.Root>
		</DialogTitle>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
		  {Object.keys(ColumnTypes).map((column, index) => {
			const items = itemsByColumn({ name: column as ColumnTypes })
			return items.length !== 0 && (
				<CommandGroup key={`${column}-${index}`} heading={column}>
					{items.map((item) => (
						<CommandItem key={item.id} onSelect={
							() => handleItemSelect({ column: column as ColumnTypes, item })}
						>
							{item.name}
						</CommandItem>
					))}
				</CommandGroup>
			)
		  })}
        </CommandList>
      </CommandDialog>
    </>
  )
}
