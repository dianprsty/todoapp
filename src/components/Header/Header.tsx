import { useAppDispatch, useAppSelector } from "../../lib/hooks/hooks";
import { toogleTheme } from "../../store/slices/themeSlice";
import styles from "./Header.module.css";

const Header = () => {
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  return (
    <header className={styles.header}>
      <img src="/logo.png" alt="logo" width={32} />{" "}
      <h1>
        <a className={styles.title}>Best Todo App</a>
      </h1>
      <div className={styles.theme}>
        <img
          src="/icons/moon.svg"
          alt="moon"
          className={` ${styles.dark} ${
            theme.value === "light" ? styles.none : styles.togle_theme
          }`}
          width={24}
          onClick={() => {
            dispatch(toogleTheme());
          }}
        />
        <img
          src="/icons/sun.svg"
          alt="sun"
          className={` ${styles.light} ${
            theme.value === "dark" ? styles.none : styles.togle_theme
          }`}
          width={24}
          onClick={() => {
            dispatch(toogleTheme());
          }}
        />
      </div>
    </header>
  );
};

export default Header;
