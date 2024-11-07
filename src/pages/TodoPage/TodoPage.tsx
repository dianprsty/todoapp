import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import TodoForm from "../../components/TodoForm/TodoForm";
import TodoList from "../../components/TodoList/TodoList";
import styles from "./TodoPage.module.css";

const TodoPage = () => {
  return (
    <div className={styles.todo_page}>
      <Header />
      <main className={styles.container}>
        <TodoForm />
        <div className={styles.divider}></div>
        <TodoList />
      </main>
      <Footer />
    </div>
  );
};

export default TodoPage;
