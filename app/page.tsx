// import Image from "next/image";
import styles from "./styles/home.module.css";

export default function Home() {
  return (
    <div>
      <div className={styles.serch}>
        <input type="search" />

        <button>Search</button>
      </div>
    </div>
  );
}
