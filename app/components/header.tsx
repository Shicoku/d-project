import Link from "next/link";
import styles from "../styles/header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div>
        <p className={styles.text}>
          <Link href="/">講義口コミサイト</Link>
        </p>
      </div>
    </header>
  );
}
