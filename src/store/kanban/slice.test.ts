import reducer from './slice';
import { createItem, updateItem, moveItem, deleteItem } from './actions';
import { ColumnTypes, TodoItem } from '@/types/item-types';
import { initialItems } from './intial';
import { describe, expect, test } from 'vitest';

describe('kanban reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      items: initialItems
    });
  });

  test('should handle adding a new item', () => {
    const newTodo = {
      name: 'New Task',
      description: 'Test description',
      type: ColumnTypes.TYPE_TODO
    };

    const state = reducer(undefined, createItem(newTodo));
    expect(state.items).toHaveLength(initialItems.length + 1);
    expect(state.items[state.items.length - 1]).toEqual({
      ...newTodo,
      id: expect.any(String)
    });
  });

  test('should handle updating an existing item', () => {
    const initialState = {
      items: [
        {
          id: '1',
          name: 'Original Task',
          description: 'Original description',
          type: ColumnTypes.TYPE_TODO
        }
      ]
    };

    const updatedItem: TodoItem = {
      id: '1',
      name: 'Updated Task',
      description: 'Updated description',
      type: ColumnTypes.TYPE_PROGRESS
    };

    const state = reducer(initialState, updateItem(updatedItem));
    expect(state.items[0]).toEqual(updatedItem);
  });

  test('should handle moving an item between columns', () => {
    const item: TodoItem = {
      id: '1',
      name: 'Task',
      description: 'Description',
      type: ColumnTypes.TYPE_TODO
    };

    const initialState = {
      items: [item]
    };

    const state = reducer(
      initialState,
      moveItem({
        item,
        sourceColumn: ColumnTypes.TYPE_TODO,
        destinationColumn: ColumnTypes.TYPE_PROGRESS
      })
    );

    expect(state.items[0]).toEqual({
      ...item,
      type: ColumnTypes.TYPE_PROGRESS
    });
  });

  test('should handle deleting an item', () => {
    const initialState = {
      items: [
        {
          id: '1',
          name: 'Task to delete',
          description: 'Description',
          type: ColumnTypes.TYPE_TODO
        }
      ]
    };

    const state = reducer(initialState, deleteItem({ id: '1' }));
    expect(state.items).toHaveLength(0);
  });
});
