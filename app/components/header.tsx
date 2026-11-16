import styles from "../styles/header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div>
        <p className={styles.text}>AI口コミサイト</p>
      </div>
    </header>
  );
}
