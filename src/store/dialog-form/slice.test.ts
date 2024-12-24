import { describe, expect, test } from 'vitest';
import reducer, { 
  openDialog, 
  closeDialog, 
  updateFormData,
  resetForm,
  DialogFormState, 
  DialogFormMode
} from './slice';
import { ColumnTypes } from '@/types/item-types';

describe('dialog form reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      isOpen: false,
      formData: {
        name: '',
        description: '',
        type: ColumnTypes.TYPE_TODO,
      },
      mode: 'create'
    });
  });

  test('should handle opening dialog for new item', () => {
    const state = reducer(
      undefined,
      openDialog({ type: ColumnTypes.TYPE_TODO })
    );

    expect(state).toEqual({
      isOpen: true,
      formData: {
        name: '',
        description: '',
        type: ColumnTypes.TYPE_TODO,
      },
      mode: 'create'
    });
  });

  test('should handle opening dialog for editing', () => {
    const existingItem = {
      id: '123',
      name: 'Test Task',
      description: 'Test Description',
      type: ColumnTypes.TYPE_TODO
    };

    const state = reducer(
      undefined,
      openDialog({ 
        type: ColumnTypes.TYPE_TODO,
        initialData: existingItem 
      })
    );

    expect(state).toEqual({
      isOpen: true,
      formData: {
        id: '123',
        name: 'Test Task',
        description: 'Test Description',
        type: ColumnTypes.TYPE_TODO,
      },
      mode: 'edit'
    });
  });

  test('should handle closing dialog', () => {
    const initialState: DialogFormState = {
      isOpen: true,
      formData: {
        name: 'Test Task',
        description: 'Test Description',
        type: ColumnTypes.TYPE_TODO,
      },
      mode: 'create' as DialogFormMode
    };

    const state = reducer(initialState, closeDialog());
    expect(state.isOpen).toBeFalsy();
    expect(state.formData).toEqual({
      name: '',
      description: '',
      type: ColumnTypes.TYPE_TODO,
    });
  });

  test('should handle updating form data', () => {
    const state = reducer(
      undefined,
      updateFormData({ 
        name: 'Updated Name',
        description: 'Updated Description' 
      })
    );

    expect(state.formData).toEqual({
      name: 'Updated Name',
      description: 'Updated Description',
      type: ColumnTypes.TYPE_TODO,
    });
  });

  test('should handle resetting form', () => {
    const initialState: DialogFormState = {
      isOpen: true,
      formData: {
        name: 'Test Task',
        description: 'Test Description',
        type: ColumnTypes.TYPE_PROGRESS,
      },
      mode: 'create' as DialogFormMode
    };

    const state = reducer(initialState, resetForm());
    expect(state.formData).toEqual({
      name: '',
      description: '',
      type: ColumnTypes.TYPE_TODO,
    });
  });
});
