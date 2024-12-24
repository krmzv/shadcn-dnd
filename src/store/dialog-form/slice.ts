import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ColumnTypes, TodoItem } from '@/types/item-types'

export type DialogFormMode = 'edit' | 'done'

export interface DialogFormState {
	isOpen: boolean
	formData: {
		id?: string
		name: string
		description: string
		type: ColumnTypes
	}
	mode: DialogFormMode
}

const initialState: DialogFormState = {
	isOpen: false,
	formData: {
		name: '',
		description: '',
		type: ColumnTypes.TYPE_TODO,
	},
	mode: 'create' as DialogFormMode,
}

export const dialogFormSlice = createSlice({
	name: 'dialogForm',
	initialState,
	reducers: {
		openDialog: (
			state,
			action: PayloadAction<{
				type: ColumnTypes
				initialData?: TodoItem
			}>,
		) => {
			const { initialData, type } = action.payload
			state.isOpen = true
			state.formData = {
				id: initialData?.id,
				name: initialData?.name ?? '',
				description: initialData?.description ?? '',
				type: type,
			}
			state.mode = initialData ? 'edit' : 'create' as DialogFormMode
		},
		closeDialog: (state) => {
			state.isOpen = false
			state.formData = initialState.formData
		},
		updateFormData: (
			state,
			action: PayloadAction<Partial<DialogFormState['formData']>>,
		) => {
			Object.assign(state.formData, action.payload)
		},
		resetForm: (state) => {
			state.formData = initialState.formData
		},
	},
})

export const { openDialog, closeDialog, updateFormData, resetForm } =
	dialogFormSlice.actions

export const selectDialogState = (state: { dialogForm: DialogFormState }) =>
	state.dialogForm.isOpen
export const selectFormData = (state: { dialogForm: DialogFormState }) =>
	state.dialogForm.formData
export const selectIsEditing = (state: {
	dialogForm: DialogFormState
}): boolean => Boolean(state.dialogForm.mode === 'edit')
export const selectFormIsValid = (state: {
	dialogForm: DialogFormState
}): boolean => Boolean(state.dialogForm.formData.name.trim())

export default dialogFormSlice.reducer
