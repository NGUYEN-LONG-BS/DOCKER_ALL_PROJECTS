import React from "react";
import { BsBell } from "react-icons/bs"; // Sử dụng icon chuông từ react-icons

// Component con - Notification Bell
const NotificationBell: React.FC<{ label: string }> = ({ label }) => {
  return (
    <div className="d-flex align-items-center mb-3 position-relative">
      {/* Icon chuông */}
      <BsBell size={30} />
      {/* Label 5+ */}
      {label && (
        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          style={{ fontSize: "12px" }}
        >
          {label}
        </span>
      )}
    </div>
  );
};

// Left Bar Component
const LeftBar: React.FC = () => {
  return (
    <div
      className="position-fixed top-0 start-0 p-3"
      style={{
        width: "5rem", // Chiều rộng mới của Left Bar
        backgroundColor: "#f8f9fa",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)", // Đổi shadow để thanh bên nổi bật
        zIndex: 9999, // Đảm bảo Left Bar luôn hiển thị trên các phần tử khác
        marginTop: "80px", // Khoảng cách từ Header (có thể điều chỉnh)
        height: "auto", // Chiều cao tự động theo số lượng bell
      }}
    >
      {/* Các component con */}
      <NotificationBell label="5+" />
      <NotificationBell label="10+" />
      <NotificationBell label="2+" />
      <NotificationBell label="8+" />
    </div>
  );
};

export default LeftBar;
