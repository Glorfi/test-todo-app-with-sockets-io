import { configureStore } from '@reduxjs/toolkit';
import { mainApi } from '../../shared/utils/main-api-router';
import { toDoListSlice } from '@/entities/todo/lib/toDoListSlice';

export const store = configureStore({
  reducer: {
    [mainApi.reducerPath]: mainApi.reducer,
    [toDoListSlice.reducerPath]: toDoListSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
