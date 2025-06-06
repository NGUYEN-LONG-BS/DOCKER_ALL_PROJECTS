import React from "react";
import styles from "../styles/RealEstateCard.module.css";

interface RealEstateCardProps {
  title: string;
  price: string;
  area: string;
  address: string;
  images: string[];
  description: string;
}

const RealEstateCard: React.FC<RealEstateCardProps> = ({
  title,
  price,
  area,
  address,
  images,
  description,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.images}>
        {images.map((img, idx) => (
          <img key={idx} src={img} alt={title} className={styles.image} />
        ))}
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.meta}>
          <span className={styles.price}>{price}</span>
          <span className={styles.area}>{area}</span>
        </div>
        <div className={styles.address}>{address}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};

export default RealEstateCard;
