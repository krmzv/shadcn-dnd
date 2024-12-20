import { configureStore } from '@reduxjs/toolkit'
import kanbanReducer from './todos/slice'
import dialogFormSlice from './dialog-form/slice'

export const store = configureStore({
	reducer: {
		kanban: kanbanReducer,
		dialogForm: dialogFormSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
