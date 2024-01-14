import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link className={styles.navItem} href="/about">
          Developing from Amsterdam
        </Link>
        <label>Copyright {new Date().getFullYear()}</label>
      </div>
    </footer>
  );
}
