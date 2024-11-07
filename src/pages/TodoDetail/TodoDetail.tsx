import { useParams } from "react-router-dom";
import styles from "./TodoDetail.module.css";
import { useTodoById } from "../../lib/hooks/useTodoById";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const TodoDetail = () => {
  const { id } = useParams();
  const { todoById } = useTodoById(Number(id));

  return (
    <>
      <Header />
      <main className={styles.container}>
        <section className={styles.todo_card}>
          <h1>{todoById?.title}</h1>
          <p>{todoById?.description}</p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default TodoDetail;
