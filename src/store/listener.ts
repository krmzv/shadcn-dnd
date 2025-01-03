import { createListenerMiddleware, type TypedStartListening } from '@reduxjs/toolkit'
import type { RootState, AppDispatch } from './index'

export const listenerMiddleware = createListenerMiddleware()

export type AppStartListening = TypedStartListening<RootState, AppDispatch>

export const startAppListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch
>()