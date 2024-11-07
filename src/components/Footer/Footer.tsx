import styles from "./Footer.module.css";
const Footer = () => {
  return (
    <div className={styles.footer}>
      <p>© {new Date().getFullYear()} Best Todo App | by Dian Prasetyo</p>
    </div>
  );
};

export default Footer;
