import { PayloadAction, createSlice } from '@reduxjs/toolkit/react';
import { ISocketResponse, IToDo } from '../models/types';

const initialState: IToDo[] | [] = [];

const setInitialTodosAction = (
  state: IToDo[],
  action: PayloadAction<IToDo[]>
) => {
  return (state = action.payload);
};

const addToDoAction = (state: IToDo[], action: PayloadAction<IToDo>) => {
  return [...state, action.payload];
};

const removeToDoAction = (state: IToDo[], action: PayloadAction<string>) => {
  return state.filter((todo) => todo._id !== action.payload);
};



const updateToDoAction = (
  state: IToDo[],
  action: PayloadAction<ISocketResponse>
) => {
  const index = state.findIndex((todo) => todo._id === action.payload._id);
  if (index !== -1) {
    state[index].progress = action.payload.progress;
  }
  return state;
};

export const toDoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    setTodosList: setInitialTodosAction,
    addToDo: addToDoAction,
    removeToDo: removeToDoAction,
    updateToDo: updateToDoAction,
  },
});

export const { setTodosList, addToDo, removeToDo, updateToDo } =
  toDoListSlice.actions;
