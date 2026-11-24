import styles from "../styles/header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div>
        <p className={styles.text}>講義口コミサイト</p>
      </div>
    </header>
  );
}
