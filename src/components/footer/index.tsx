import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <label>Developing from Amsterdam</label>
        <label>Copyright {new Date().getFullYear()}</label>
      </div>
    </footer>
  );
}
