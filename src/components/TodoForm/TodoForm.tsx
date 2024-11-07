import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/hooks/hooks";
import {
  addTodo,
  clearEditState,
  editTodo,
  selectEditedTodo,
} from "../../store/slices/todoSlice";
import styles from "./TodoForm.module.css";
import { TodoType } from "../../lib/types/TodoTypes";

import { Bounce, ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const TodoForm = () => {
  const editedTodo = useAppSelector(selectEditedTodo);
  const dispatch = useAppDispatch();

  const [todo, setTodo] = useState<TodoType>({
    title: "",
    description: "",
    status: "active",
  });

  useEffect(() => {
    if (editedTodo) {
      setTodo(editedTodo);
    } else {
      setTodo({
        id: undefined,
        title: "",
        description: "",
        status: "active",
      });
    }
  }, [editedTodo]);

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!todo.title) {
        throw new Error("Title is required");
      }

      if (!todo.description) {
        throw new Error("Description is required");
      }
      if (editedTodo) {
        dispatch(
          editTodo({
            title: todo.title,
            description: todo.description,
            status: todo.status,
            id: editedTodo.id,
          })
        );
        dispatch(clearEditState());
        setTodo({
          id: undefined,
          title: "",
          description: "",
          status: "active",
        });
        return;
      } else {
        dispatch(
          addTodo({
            title: todo.title,
            description: todo.description,
            status: todo.status,
          })
        );
      }
      setTodo({
        id: undefined,
        title: "",
        description: "",
        status: "active",
      });
    } catch (error) {
      if (error instanceof Error) {
        // setErrors([error.message]);
        toast.warn(error.message, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  };
  return (
    <>
      <section className={styles.container}>
        <h2 className={styles.title}>{editedTodo ? "Edit" : "Add"} Todo</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <ToastContainer />
          <input
            className={styles.input}
            type="text"
            name="title"
            id="title"
            value={todo.title}
            onChange={handleChange}
          />
          <textarea
            className={styles.textarea}
            name="description"
            id="description"
            value={todo.description}
            cols={30}
            rows={10}
            onChange={handleChange}
          />

          <select
            className={styles.input}
            name="status"
            id="status"
            value={todo.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <button className={styles.button} type="submit">
            {editedTodo ? "Edit" : "Add"} Todo
          </button>

          {editedTodo && (
            <button
              className={`${styles.button} ${styles.button_outlined}`}
              onClick={() => {
                dispatch(clearEditState());
              }}
            >
              Cancel Edit
            </button>
          )}
        </form>
      </section>
    </>
  );
};

export default TodoForm;
