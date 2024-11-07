import { constants } from "../constants/constants";
import { TodoType } from "../types/TodoTypes";

export const getTodos = () => {
  const todos = localStorage.getItem(constants.TODO_STORE_KEY);
  if (todos) {
    return JSON.parse(todos);
  } else {
    return [];
  }
};

export const saveTodosToLocalStorage = (todos: TodoType[]) => {
  localStorage.setItem(constants.TODO_STORE_KEY, JSON.stringify(todos));
};
