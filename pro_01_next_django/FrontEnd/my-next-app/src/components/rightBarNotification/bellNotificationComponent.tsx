import React, { useState } from "react";
import { BsBell } from "react-icons/bs"; // Sử dụng icon chuông từ react-icons

interface NotificationBellProps {
  label: number; // Label thông báo (số lượng thông báo)
  info: string;  // Thông tin hiển thị khi hover chuột
  side: string;  // Quyết định vị trí hiển thị tooltip (left hoặc right)
  link: string;  // Link khi click vào NotificationBell
}

const NotificationBell: React.FC<NotificationBellProps> = ({ label, info, side, link }) => {
  const [isHovered, setIsHovered] = useState(false); // State để quản lý trạng thái hover

  // Nếu label > 5 thì hiển thị "5+", nếu nhỏ hơn hoặc bằng 5 thì hiển thị số đó
  const displayLabel = label > 5 ? "5+" : label;

  // Hàm xử lý sự kiện click
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
      onMouseEnter={() => setIsHovered(true)} // Khi hover vào chuông, tooltip sẽ hiển thị
      onMouseLeave={() => setIsHovered(false)} // Khi rời khỏi chuông, tooltip sẽ ẩn đi
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
        {/* Icon chuông */}
        <BsBell size={30} />

        {/* Label thông báo (5+ hoặc số lượng thực tế) */}
        {displayLabel && (
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            style={{ fontSize: "12px", transform: "translate(50%, -50%)" }}
          >
            {displayLabel}
          </span>
        )}

        {/* Hiển thị khung thông tin khi hover */}
        {isHovered && (
          <div className="tooltip-content position-absolute p-2 bg-light border rounded shadow-sm">
            {info}
          </div>
        )}

        {/* CSS để hiển thị khung thông tin khi hover */}
        <style jsx>{`
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

export default NotificationBell;
