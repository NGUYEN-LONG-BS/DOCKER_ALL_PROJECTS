import React from "react";
import { BsBell } from "react-icons/bs"; // Sử dụng icon chuông từ react-icons

interface NotificationBellProps {
  label: number; // Label thông báo (số lượng thông báo)
  info: string;  // Thông tin hiển thị khi hover chuột
}

const NotificationBell: React.FC<NotificationBellProps> = ({ label, info }) => {
  // Nếu label > 5 thì hiển thị "5+", nếu nhỏ hơn hoặc bằng 5 thì hiển thị số đó
  const displayLabel = label > 5 ? "5+" : label;

  return (
    <div className="d-inline-block position-relative" style={{ border: "2px solid #ddd", padding: "5px", borderRadius: "8px" }}>
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
      <div
        className="tooltip-content position-absolute start-100 top-0 p-2 bg-light border rounded shadow-sm"
        style={{
          display: "none", // Ẩn khi không hover
          fontSize: "12px",
          whiteSpace: "nowrap",
        }}
      >
        {info}
      </div>
      
      {/* CSS để hiển thị khung thông tin khi hover */}
      <style jsx>{`
        .d-inline-block:hover .tooltip-content {
          display: block; /* Hiển thị khung thông tin khi hover */
        }
      `}</style>
    </div>
  );
};

export default NotificationBell;
