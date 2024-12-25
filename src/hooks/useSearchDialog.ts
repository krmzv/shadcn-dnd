import { useState, useEffect, useCallback } from 'react'
import { ColumnTypes, TodoItem } from '@/types/item-types'
import { useDialogForm } from './useDialogForm'

type ItemSelectT = {
  column: ColumnTypes
  item: TodoItem
}

export const useSearchDialog = () => {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { handleOpenDialogForm } = useDialogForm()

  // Keyboard shortcut (Cmd + K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  useEffect(() => {
    if (!open) {
      setSearchQuery('')
    }
  }, [open])

  const handleItemSelect = useCallback(({ column, item }: ItemSelectT) => {
    handleOpenDialogForm({
      type: column as ColumnTypes,
      initialData: item,
    })
    setOpen(false)
  }, [handleOpenDialogForm])

  const handleOpenChange = useCallback((open: boolean) => {
    setOpen(open)
  }, [])

  return {
    open,
    searchQuery,
    setSearchQuery,
    handleItemSelect,
    handleOpenChange
  }
}