import { useParams } from "react-router-dom";
import styles from "./TodoDetail.module.css";
import { useTodoById } from "../../lib/hooks/useTodoById";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useAppDispatch } from "../../lib/hooks/hooks";
import {
  editTodo,
  removeTodo,
  setEditState,
} from "../../store/slices/todoSlice";
import { router } from "../../router/route";

const TodoDetail = () => {
  const { id } = useParams();
  const { todoById } = useTodoById(Number(id));

  const dispatch = useAppDispatch();

  const handleEdit = () => {
    console.log("ruuun");

    if (!todoById) return;
    dispatch(setEditState(todoById));
    router.navigate("/");
  };

  const handleDelete = () => {
    if (!todoById) return;
    dispatch(removeTodo(todoById!.id!));
    router.navigate("/");
  };
  return (
    <>
      <Header />
      <main className={styles.container}>
        <section className={styles.todo_card}>
          <div className={styles.header}>
            <p>Todo Detail</p>
          </div>
          <div className={styles.content}>
            <h1>{todoById?.title}</h1>
            <p>{todoById?.description}</p>
          </div>
          <div className={styles.footer}>
            <label htmlFor={`checkbox_status_${todoById?.id}`}>
              <input
                className={styles.checkbox}
                id={`checkbox_status_${todoById?.id}`}
                type="checkbox"
                checked={todoById?.status === "completed"}
                onChange={() => {
                  dispatch(
                    editTodo({
                      ...todoById!,
                      status:
                        todoById?.status === "active" ? "completed" : "active",
                    })
                  );
                }}
              />
              <p
                className={`${styles.status} ${
                  todoById?.status === "completed"
                    ? styles.status_completed
                    : styles.status_active
                }`}
              >
                {todoById?.status}
              </p>
            </label>
            <span className={styles.action_group}>
              <button className={styles.edit} onClick={handleEdit}>
                <img src="/icons/edit.svg" alt="edit" width={20} />
              </button>
              <button className={styles.delete} onClick={handleDelete}>
                <img src="/icons/delete.svg" alt="delete" width={20} />
              </button>
            </span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default TodoDetail;
