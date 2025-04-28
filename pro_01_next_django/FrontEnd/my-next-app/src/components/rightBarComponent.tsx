import React from "react";
import NotificationBell from "./bellNotificationComponent"; // Import NotificationBell component

// Right Bar Component
const RightBar: React.FC = () => {
  // Dữ liệu các thông báo
  const notifications = [
    { label: 6, info: "You have new messages!", side: "right", link: "#" },
    { label: 3, info: "You have new notifications!", side: "right", link: "#" },
    { label: 5, info: "Items left in your cart.", side: "right", link: "#" },
    { label: 0, info: "Items left in your cart.", side: "right", link: "#" },
    { label: 1, info: "New orders to process.", side: "right", link: "#" },
  ];
  
    return (
    <div
      className="position-fixed top-0 end-0 p-3" // RightBar vẫn nằm bên phải
      style={{
        width: "5rem", // Chiều rộng mới của Right Bar
        backgroundColor: "rgba(255, 255, 255, 0)", // Nền trong suốt
        boxShadow: "0px 0 0px rgba(0, 0, 0, 0.1)", // Thêm chút shadow nhẹ để tạo chiều sâu
        zIndex: 9999, // Đảm bảo Right Bar luôn hiển thị trên các phần tử khác
        marginTop: "80px", // Khoảng cách từ Header (có thể điều chỉnh)
        height: "auto", // Chiều cao tự động theo số lượng bell
      }}
    >

      {/* Các component con NotificationBell */}
      {notifications.map((notification, index) => 
        notification.label > 0 ? (
            <div key={index} style={{ marginBottom: "15px" }}>
                <NotificationBell 
                    key={index} 
                    label={notification.label} 
                    info={notification.info} 
                    side={notification.side} 
                    link={notification.link} 
                />
            </div>
        ) : null // Nếu label = 0, không hiển thị NotificationBell
      )}
      
      {/* CSS điều chỉnh khoảng cách giữa các NotificationBell */}
      <style jsx>{`
        .position-relative {
          margin-bottom: 1rem; /* Tạo khoảng cách 1rem giữa các NotificationBell */
        }
      `}</style>
    </div>
  );
};

export default RightBar;
