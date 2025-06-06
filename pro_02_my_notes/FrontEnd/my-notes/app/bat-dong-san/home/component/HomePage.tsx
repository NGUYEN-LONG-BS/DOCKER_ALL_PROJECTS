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
        <h1 className={styles.heading}>Mua bán nhà đất tại Huyện Bình Chánh</h1>
        <div className={styles.list}>
          {realEstateList.map((item) => (
            <RealEstateCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
