import React from "react";
import styles from "../styles/Header.module.css";
import Image from "next/image";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Image src="/bat-dong-san/placeholder-logo.png" alt="Batdongsan Logo" width={120} height={32} className={styles.logo} />
        <nav className={styles.nav}>
          <a className={styles.active} href="#">Nhà đất bán</a>
          <a href="#">Nhà đất cho thuê</a>
          <a href="#">Dự án</a>
          <a href="#">Tin tức</a>
          <a href="#">Wiki BĐS</a>
          <a href="#">Phân tích đánh giá</a>
          <a href="#">Danh bạ</a>
        </nav>
      </div>
      <div className={styles.right}>
        <a href="#" className={styles.link}>Tải ứng dụng</a>
        <span className={styles.icon}>♡</span>
        <a href="#" className={styles.link}>Đăng nhập</a>
        <a href="#" className={styles.link}>Đăng ký</a>
        <button className={styles.button}>Đăng tin</button>
      </div>
    </header>
  );
};

export default Header;
