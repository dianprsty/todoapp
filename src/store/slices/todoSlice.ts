import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { TodoType } from "../../lib/types/TodoTypes";
import { saveTodosToLocalStorage } from "../../lib/utils/todoStorageUtils";
import { constants } from "../../lib/constants/constants";

interface TodoState {
  todos: TodoType[];
  editedTodo?: TodoType;
}

const initialState: TodoState = {
  todos: localStorage.getItem(constants.TODO_STORE_KEY)
    ? JSON.parse(localStorage.getItem(constants.TODO_STORE_KEY)!)
    : [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    replaceAllTodos: (state, action: PayloadAction<TodoType[]>) => {
      state.todos = action.payload;
      saveTodosToLocalStorage(state.todos);
    },
    addTodo: (state, action: PayloadAction<TodoType>) => {
      const id: number = Date.now();
      action.payload.id = id;
      state.todos.push(action.payload);
      saveTodosToLocalStorage(state.todos);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      console.log(state.todos);

      saveTodosToLocalStorage(state.todos);
    },
    setEditState: (state, action: PayloadAction<TodoType>) => {
      state.editedTodo = action.payload;
    },
    clearEditState: (state) => {
      state.editedTodo = undefined;
    },
    editTodo: (state, action: PayloadAction<TodoType>) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return action.payload;
        }
        return todo;
      });
      saveTodosToLocalStorage(state.todos);
    },
  },
});

export const {
  replaceAllTodos,
  addTodo,
  removeTodo,
  setEditState,
  clearEditState,
  editTodo,
} = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todo.todos;
export const selectEditedTodo = (state: RootState) => state.todo.editedTodo;

export default todoSlice.reducer;
