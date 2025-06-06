import React from "react";
import { realEstateList } from "../data/realEstateList";
import RealEstateCard from "./RealEstateCard";
import Header from "./Header";
import styles from "../styles/HomePage.module.css";

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.heading}>THÔNG TIN RÕ RÀNG - TIN CẬY - TIẾT KIỆM THỜI GIAN</h1>
        
        <div className={styles.list}>
          {realEstateList.map((item) => (
            <RealEstateCard key={item.id} {...item} link="/bat-dong-san/chi-tiet-san-pham" />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
