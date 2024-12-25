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
import { mapColumnNames } from '@/components/kanban-column'
import { useRef, useEffect } from 'react'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

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
		handleOpenDialogForm,
		handleClose,
		handleUpdateField,
		handleReset,
	} = useDialogForm()

	const { handleAddItem, handleUpdateItem } = useTodos()
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (isOpen) {
			inputRef.current?.focus()
		}
	}, [isOpen])

	const handleOpenChange = (open: boolean) => {
		if (open) {
			handleOpenDialogForm({ type, initialData })
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
				<Button
					aria-label="create a new task"
					variant="outline"
					className="h-8 px-2"
				>
					<PlusIcon />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<form onSubmit={handleSubmit} role="form" aria-labelledby="dialog-title">
					<DialogHeader>
						<DialogTitle id="dialog-title">
							{isEditing ? 'Edit Task' : 'Create New Task'}
						</DialogTitle>
						<DialogDescription>
							{isEditing
								? 'Update your task item details below.'
								: `Add a new task to your ${mapColumnNames[formData.type].toLowerCase()} list.`}
						</DialogDescription>
					</DialogHeader>

					<fieldset className="grid gap-4 py-4">
						<VisuallyHidden.Root>
							<legend>Task details</legend>
						</VisuallyHidden.Root>
						<div className="flex flex-col items-start gap-4">
							<Label htmlFor="name" className="text-right">
								Name
							</Label>
							<Input
								id="name"
								ref={inputRef}
								value={formData.name}
								onChange={(e) =>
									handleUpdateField('name', e.target.value)
								}
								className="col-span-3"
								required
								aria-required="true"
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
					</fieldset>

					<DialogFooter>
						<Button type="submit" disabled={!isValid}>
							{isEditing ? 'Save changes' : 'Create task'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
