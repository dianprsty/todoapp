import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../lib/hooks/hooks";
import { TodoType } from "../../lib/types/TodoTypes";
import styles from "./TodoList.module.css";
import TodoContainer from "../TodoItem/TodoContainer";
import { selectTodos } from "../../store/slices/todoSlice";

const TodoList = () => {
  const todos: TodoType[] = useAppSelector(selectTodos);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date(Date.now()));

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date(Date.now()));
    }, 1000);
    return () => clearInterval(interval);
  }, [date]);
  const displayedTodos = useMemo(
    () =>
      todos.filter((todo) => {
        return (
          todo.title
            .toLowerCase()
            .replace(" ", "")
            .includes(search.toLowerCase().replace(" ", "")) &&
          todo.status.includes(filter)
        );
      }),
    [todos, search, filter]
  );

  const onFilter = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilter(e.target.value);
    },
    [setFilter]
  );

  const onSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [setSearch]
  );

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>
        Todo List
        <span className={styles.hour}>
          {date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()} :{" "}
          {date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}{" "}
          :{" "}
          {date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}
        </span>
      </h2>
      <section className={styles.filter}>
        <input
          type="text"
          className={styles.input}
          placeholder="Search"
          value={search}
          onChange={onSearch}
        />
        <select
          className={styles.input}
          name="status"
          id="status"
          onChange={onFilter}
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </section>

      <TodoContainer
        displayedTodos={displayedTodos}
        search={search}
        filter={filter}
      />
    </section>
  );
};

export default TodoList;
