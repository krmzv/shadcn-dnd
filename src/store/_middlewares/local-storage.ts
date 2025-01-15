import { isAnyOf } from '@reduxjs/toolkit'
import { startAppListening } from '../listener'
import { createItem, updateItem, moveItem, deleteItem } from '@/store/kanban/actions'

startAppListening({
  matcher: isAnyOf(
    createItem, updateItem, moveItem, deleteItem
  ),
  effect: (_action, listenerApi) => {
    const state = listenerApi.getState()
    localStorage.setItem('kanban-state', JSON.stringify({
      kanban: state.kanban
    }))
  }
}) 