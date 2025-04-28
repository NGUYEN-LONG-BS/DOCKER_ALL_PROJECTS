import React from "react";
import NotificationBell from "./bellNotificationComponent"; // Import NotificationBell component

// Right Bar Component
const LeftBar: React.FC = () => {
  return (
    <div
      className="position-fixed top-0 start-0 p-3" // RightBar vẫn nằm bên phải
      style={{
        width: "5rem", // Chiều rộng mới của Right Bar
        backgroundColor: "#f8f9fa",
        boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.1)", // Đổi shadow để hướng bóng từ phải qua trái
        zIndex: 9999, // Đảm bảo Right Bar luôn hiển thị trên các phần tử khác
        marginTop: "80px", // Khoảng cách từ Header (có thể điều chỉnh)
        height: "auto", // Chiều cao tự động theo số lượng bell
      }}
    >
      {/* Các component con NotificationBell */}
      <NotificationBell label={6} info="You have 5 new messages!" />
      <NotificationBell label={3} info="You have 10 new notifications!" />
      <NotificationBell label={5} info="2 items left in your cart." />
      <NotificationBell label={1} info="8 new orders to process." />
    </div>
  );
};

export default LeftBar;
