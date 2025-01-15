import { v4 as uuidv4 } from 'uuid'
import { TodoItem, DragDataT } from '@/types/item-types'
import { createAction } from '@reduxjs/toolkit'

type AddItemPayload = Omit<TodoItem, 'id'> 
type UpdateItemPayload = TodoItem
type DeleteItemPayload = Pick<TodoItem, 'id'>
type MoveItemPayload = DragDataT

export const createItem = createAction(
  'kanban/createItem',
  (payload: AddItemPayload) => ({
    payload: {
      ...payload,
      id: uuidv4()
    }
  })
)

export const updateItem = createAction<UpdateItemPayload>('kanban/updateItem')
export const moveItem = createAction<MoveItemPayload>('kanban/moveItem')
export const deleteItem = createAction<DeleteItemPayload>('kanban/deleteItem') 