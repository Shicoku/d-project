"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Link className={styles.brand} href="/" aria-label="Corgi ホーム">
        <Image className={styles.logo} src="/corgi.svg" alt="" width={48} height={48} priority />
        <span className={styles.text}>Corgi</span>
      </Link>

      <button
        className={`${styles.toggleIcon} ${menuOpen ? styles.open : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="メニュー"
        aria-expanded={menuOpen}
        aria-controls="site-menu"
      >
        <span className={styles.visuallyHidden}>メニュー</span>
      </button>

      <nav
        id="site-menu"
        className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`}
        aria-label="メインメニュー"
        aria-hidden={!menuOpen}
      >
        <div className={styles.menuItem}>
          <Link href="/classes" onClick={() => setMenuOpen(false)}>講義一覧</Link>
        </div>

        <div className={styles.menuItem}>
          <Link href="/terms" onClick={() => setMenuOpen(false)}>利用規約</Link>
        </div>
      </nav>
    </header>
  );
}
