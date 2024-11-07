import { selectTodos } from "../../store/slices/todoSlice";
import { useAppSelector } from "./hooks";

export const useTodoById = (id: number) => {
  const todos = useAppSelector(selectTodos);
  const todoById = todos.find((todo) => todo.id === id);

  return { todoById };
};
