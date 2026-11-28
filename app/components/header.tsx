"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../styles/header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div>
        <p className={styles.text}>
          <Link href="/">Corgi</Link>
        </p>
      </div>

      <button
        className={`${styles.toggleIcon} ${menuOpen ? styles.open : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="メニュー"
        aria-expanded={menuOpen}
      ></button>

      {menuOpen && (
        <div className={styles.menu}>
          <div className={styles.menuItem}>
            <Link href="/classes">講義一覧</Link>
          </div>

          <div className={styles.menuItem}>
            <Link href="/terms">利用規約</Link>
          </div>
        </div>
      )}
    </header>
  );
}
