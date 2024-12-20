import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	selectDialogState,
	selectFormData,
	selectIsEditing,
	selectFormIsValid,
	openDialog,
	closeDialog,
	updateFormData,
	resetForm,
} from '@/store/dialog-form/slice'
import { ColumnTypes, TodoItem } from '@/types/item-types'

export const useDialogForm = () => {
	const dispatch = useDispatch()

	const isOpen = useSelector(selectDialogState)
	const formData = useSelector(selectFormData)
	const isEditing = useSelector(selectIsEditing)
	const isValid = useSelector(selectFormIsValid)

	const handleOpen = useCallback(
		(type: ColumnTypes, initialData?: TodoItem) => {
			dispatch(openDialog({ type, initialData }))
		},
		[dispatch],
	)

	const handleClose = useCallback(() => {
		dispatch(closeDialog())
	}, [dispatch])

	const handleUpdateField = useCallback(
		(field: keyof typeof formData, value: string) => {
			dispatch(updateFormData({ [field]: value }))
		},
		[dispatch],
	)

	const handleReset = useCallback(() => {
			dispatch(resetForm())
		}, [dispatch])

	return {
		isOpen,
		formData,
		isEditing,
		isValid,
		handleOpen,
		handleClose,
		handleUpdateField,
		handleReset,
	}
}
