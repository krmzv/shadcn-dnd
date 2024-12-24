import { configureStore } from '@reduxjs/toolkit'
import kanbanReducer, { KanbanState } from './todos/slice'
import dialogFormSlice, { DialogFormState } from './dialog-form/slice'
import { listenerMiddleware } from './listener'
import './_middlewares/local-storage'

export const loadState = () => {
	try {
		const state = localStorage.getItem('kanban-state')
		return state ? JSON.parse(state) : undefined
	} catch (e) {
		console.log('Error loading state', e)
		return undefined
	}
}

export interface AppState {
	kanban: KanbanState
	dialogForm: DialogFormState
}

export const store = configureStore<AppState>({
	reducer: {
		kanban: kanbanReducer,
		dialogForm: dialogFormSlice,
	},
	preloadedState: loadState(),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().prepend(listenerMiddleware.middleware) as any, // Could not find a workaround for this type
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
