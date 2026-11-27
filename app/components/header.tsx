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
          <Link href="/">講義口コミサイト Corgi</Link>
        </p>
      </div>

      <button
        className={`${styles.toggleIcon} ${menuOpen ? styles.open : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="メニュー"
        aria-expanded={menuOpen}
        >
        </button>

      {menuOpen && (
        <div className={styles.menu}>
          <div className={styles.menuItem}>
            講義一覧
          </div>

          <div className={styles.menuItem}>
            利用規約
          </div>
        </div>
      )}
    </header>
  );
}
