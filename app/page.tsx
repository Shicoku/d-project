import styles from "./styles/home.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.search}>
        <input type="search" className={styles.input} />
        <button className={styles.sarchBox}></button>
      </section>
      <section className={styles.cards}></section>
    </main>
  );
}
