import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../lib/hooks/hooks";
import { TodoType } from "../../lib/types/TodoTypes";
import {
  editTodo,
  removeTodo,
  setEditState,
} from "../../store/slices/todoSlice";
import styles from "./TodoItem.module.css";

const TodoItem = ({ todo }: { todo: TodoType }) => {
  const dispatch = useAppDispatch();
  const router = useNavigate();

  const handleDelete = () => {
    dispatch(removeTodo(todo.id!));
  };

  return (
    <li className={styles.list_item}>
      <input
        className={styles.checkbox}
        id="checkbox_status"
        type="checkbox"
        checked={todo.status === "completed"}
        onChange={() => {
          dispatch(
            editTodo({
              ...todo,
              status: todo.status === "active" ? "completed" : "active",
            })
          );
        }}
      />
      <label htmlFor="checkbox_status">{todo.title}</label>
      <span
        className={`${styles.status} ${
          todo.status === "completed"
            ? styles.status_completed
            : styles.status_active
        }`}
      >
        {todo.status}
      </span>
      <span className={styles.action_group}>
        <button
          className={styles.btn_view}
          onClick={() => router(`/${todo.id}`)}
        >
          <img src="/icons/eye.svg" alt="view" />
        </button>
        <button
          className={styles.btn_edit}
          onClick={() => {
            dispatch(setEditState(todo));
          }}
        >
          <img src="/icons/edit.svg" alt="edit" />
        </button>
        <button className={styles.btn_delete} onClick={handleDelete}>
          <img src="/icons/delete.svg" alt="delete" />
        </button>
      </span>
    </li>
  );
};

export default TodoItem;
