import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PlusIcon } from 'lucide-react'
import { ColumnTypes, TodoItem } from '@/types/item-types'
import { Textarea } from '@/components/ui/textarea'
import { useDialogForm } from '@/hooks/useDialogForm'
import { useTodos } from '@/hooks/useTodos'

export type DialogFormProps = {
	initialData?: TodoItem
	type: ColumnTypes
}

export function DialogForm({ type, initialData }: DialogFormProps) {
	const {
		isOpen,
		formData,
		isEditing,
		isValid,
		handleOpen,
		handleClose,
		handleUpdateField,
		handleReset,
	} = useDialogForm()

	const { handleAddItem, handleUpdateItem } = useTodos()

	const handleOpenChange = (open: boolean) => {
		if (open) {
			handleOpen({ type, initialData })
		} else {
			handleClose()
		}
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!isValid) return

		if (isEditing && formData.id) {
			handleUpdateItem(formData)
		} else {
			handleAddItem(formData)
		}

		handleClose()
		handleReset()
	}

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button variant="outline" className="h-8 px-2">
					<PlusIcon />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>
							{isEditing ? 'Edit Todo' : 'Create New Todo'}
						</DialogTitle>
						<DialogDescription>
							{isEditing
								? 'Update your todo item details below.'
								: 'Add a new todo item to your list.'}
						</DialogDescription>
					</DialogHeader>

					<div className="grid gap-4 py-4">
						<p>{formData.type}</p>
						<div className="flex flex-col items-start gap-4">
							<Label htmlFor="name" className="text-right">
								Name
							</Label>
							<Input
								id="name"
								value={formData.name}
								onChange={(e) =>
									handleUpdateField('name', e.target.value)
								}
								className="col-span-3"
								required
							/>
						</div>
						<div className="flex flex-col items-start gap-4">
							<Label htmlFor="description" className="text-right">
								Description
							</Label>
							<Textarea
								id="description"
								value={formData.description}
								onChange={(e) =>
									handleUpdateField(
										'description',
										e.target.value,
									)
								}
								className="col-span-3"
							/>
						</div>
					</div>

					<DialogFooter>
						<Button type="submit" disabled={!isValid}>
							{isEditing ? 'Save changes' : 'Create todo'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
