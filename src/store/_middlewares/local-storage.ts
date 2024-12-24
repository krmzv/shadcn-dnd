import { isAnyOf } from '@reduxjs/toolkit'
import { startAppListening } from '../listener'
import { addItem, updateItem, moveItem, deleteItem } from '../todos/slice'

startAppListening({
  matcher: isAnyOf(
    addItem, updateItem, moveItem, deleteItem
  ),
  effect: (_action, listenerApi) => {
    const state = listenerApi.getState()
    localStorage.setItem('kanban-state', JSON.stringify({
      kanban: state.kanban
    }))
  }
}) 