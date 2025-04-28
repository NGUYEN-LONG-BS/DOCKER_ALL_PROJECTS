import React, { useState } from "react";
import Image from 'next/image';

interface NavigationComponentProps {
  info: string;
  side: string;
  link: string;
  linkIcon: string;
}

const NavigationComponent: React.FC<NavigationComponentProps> = ({ info, side, link, linkIcon }) => {
  const [isHovered, setIsHovered] = useState(false); // State để quản lý trạng thái hover

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (e.ctrlKey) {
      window.open(link, "_blank");
    } else {
      window.location.href = link;
    }
    e.preventDefault();
  };

  return (
    <a
      href={link}
      style={{ textDecoration: "none" }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)} // Khi hover vào icon, tooltip sẽ hiển thị
      onMouseLeave={() => setIsHovered(false)} // Khi rời khỏi icon, tooltip sẽ ẩn đi
    >
      <div
        className="d-inline-block position-relative"
        style={{
          border: "2px solid #ddd",
          padding: "5px",
          borderRadius: "8px",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Image 
          src={linkIcon} 
          alt="Navigation Icon" 
          width={45}
          height={45}
          style={{ objectFit: "contain" }}
        />
        
        {/* Hiển thị tooltip khi hover */}
        {isHovered && (
          <div className="tooltip-content position-absolute p-2 bg-light border rounded shadow-sm">
            {info}
          </div>
        )}
        
        <style jsx>{`
          /* Tooltip mặc định ẩn */
          .tooltip-content {
            font-size: 12px;
            white-space: nowrap;
            transition: opacity 0.3s ease-in-out;
            z-index: 1050;
            top: 50%;
            transform: translateY(-50%);
            left: ${side === "left" ? "100%" : "auto"};
            right: ${side === "right" ? "100%" : "auto"};
            margin-left: ${side === "left" ? "1rem" : "0"};
            margin-right: ${side === "right" ? "1rem" : "0"};
          }
        `}</style>
      </div>
    </a>
  );
};

export default NavigationComponent;
