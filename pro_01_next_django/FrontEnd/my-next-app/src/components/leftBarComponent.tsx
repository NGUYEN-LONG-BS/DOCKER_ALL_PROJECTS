import React from "react";
import NavigationComponent from "./LeftBarNavigationComponent"; // Import NotificationBell component

// Right Bar Component
const LeftBar: React.FC = () => {
  return (
    <div
      className="position-fixed top-0 start-0 p-3" // RightBar vẫn nằm bên phải
      style={{
        width: "5rem", // Chiều rộng mới của Right Bar
        backgroundColor: "rgba(255, 255, 255, 0)", // Nền trong suốt
        boxShadow: "0px 0 0px rgba(0, 0, 0, 0.1)", // Thêm chút shadow nhẹ để tạo chiều sâu
        zIndex: 9999, // Đảm bảo Right Bar luôn hiển thị trên các phần tử khác
        marginTop: "80px", // Khoảng cách từ Header (có thể điều chỉnh)
        height: "auto", // Chiều cao tự động theo số lượng bell
      }}
    >
      {/* Các component con NavigationComponent với khoảng cách 2rem giữa các component */}
      <div style={{ marginBottom: "1rem" }}>
        <NavigationComponent info="Báo cáo tồn kho!" side="left" link="#" linkIcon="/icons/inventoryReport.png" />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <NavigationComponent info="Báo cáo doanh số!" side="left" link="#" linkIcon="/icons/generalRepot.png" />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <NavigationComponent info="Báo cáo đơn đặt hàng." side="left" link="#" linkIcon="/icons/saleReport.png" />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <NavigationComponent info="Thông tin nhân sự." side="left" link="#" linkIcon="/icons/generalRepot.png" />
      </div>
    </div>
  );
};

export default LeftBar;
