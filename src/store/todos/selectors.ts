import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/store'
import { ColumnTypes } from '@/types/item-types'

const selectItems = (state: RootState) => state.kanban.items
const selectColumnType = (_state: RootState, columnType: ColumnTypes) =>
	columnType

export const selectItemsByColumn = createSelector(
	[selectItems, selectColumnType],
	(items, columnType) => items.filter((item) => item.type === columnType),
)
