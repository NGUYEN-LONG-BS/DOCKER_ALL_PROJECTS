import React, { useState } from "react";
import styles from "../styles/RealEstateCard.module.css";
import { useRouter } from "next/navigation";

interface RealEstateCardProps {
  title: string;
  price: string;
  area: string;
  address: string;
  images: string[];
  description: string;
  link: string;
}

const RealEstateCard: React.FC<RealEstateCardProps> = ({
  title,
  price,
  area,
  address,
  images,
  description,
  link,
}) => {
  const [activeImage, setActiveImage] = useState(0);
  const router = useRouter();

  const handleThumbnailClick = (
    index: number,
    event: React.MouseEvent<HTMLImageElement>
  ) => {
    event.stopPropagation();
    setActiveImage(index);
  };

  const handleCardClick = () => {
    router.push(link);
  };

  return (
    <div
      className={styles.cardLink}
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.card}>
        <div className={styles.images}>
          <div className={styles.imageContainer}>
            <img
              src={images[activeImage]}
              alt={title}
              className={styles.image}
            />
          </div>
          {images.length > 1 && (
            <div className={styles.thumbnails}>
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${title} thumbnail ${idx + 1}`}
                  className={`${styles.thumbnail} ${
                    activeImage === idx ? styles.active : ""
                  }`}
                  onClick={(e) => handleThumbnailClick(idx, e)}
                />
              ))}
            </div>
          )}
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
    </div>
  );
};

export default RealEstateCard;