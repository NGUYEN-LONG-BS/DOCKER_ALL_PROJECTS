import React from "react";
import { BsBell } from "react-icons/bs"; // Sử dụng icon chuông từ react-icons

interface NotificationBellProps {
  label: number; // Label thông báo (số lượng thông báo)
  info: string;  // Thông tin hiển thị khi hover chuột
  side: string;  // Quyết định vị trí hiển thị tooltip (left hoặc right)
  link: string;  // Link khi click vào NotificationBell
}

const NotificationBell: React.FC<NotificationBellProps> = ({ label, info, side, link }) => {
  // Nếu label > 5 thì hiển thị "5+", nếu nhỏ hơn hoặc bằng 5 thì hiển thị số đó
  const displayLabel = label > 5 ? "5+" : label;
// Hàm xử lý sự kiện click
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (e.ctrlKey) {
        // Nếu Ctrl được nhấn, mở tab mới
        window.open(link, "_blank");
      } else {
        // Nếu không Ctrl, chỉ đơn giản là chuyển trang trong cùng tab
        window.location.href = link;
      }
      e.preventDefault(); // Ngừng hành vi mặc định (mở link trong cùng tab)
    };
  return (
    <a
      href={link}
      style={{ textDecoration: "none" }}
      onClick={handleClick} // Đặt hàm xử lý vào sự kiện click
    >
      <div
        className="d-inline-block position-relative"
        style={{
          border: "2px solid #ddd", // Viền bao quanh NotificationBell
          padding: "5px",
          borderRadius: "8px",
          transition: "all 0.3s ease-in-out", // Thêm hiệu ứng cho viền
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
        <div className="tooltip-content position-absolute p-2 bg-light border rounded shadow-sm">
          {info}
        </div>

        {/* CSS để hiển thị khung thông tin khi hover */}
        <style jsx>{`
          .position-relative:hover .tooltip-content {
            display: block; /* Hiển thị khung thông tin khi hover */
          }

          /* Tooltip mặc định ẩn */
          .tooltip-content {
            display: none; /* Tooltip không hiển thị mặc định */
            font-size: 12px;
            white-space: nowrap;
            transition: opacity 0.3s ease-in-out; /* Thêm hiệu ứng mờ dần */
            z-index: 1050; /* Đảm bảo tooltip nằm trên các phần tử khác */
            top: 50%; /* Đặt tooltip vào giữa vị trí của chuông */
            transform: translateY(-50%); /* Đảm bảo tooltip xuất hiện ngang hàng */
          }

          /* Nếu side = "left" thì hiển thị tooltip bên phải */
          .tooltip-content {
            left: ${side === "left" ? "100%" : "auto"};  /* Nếu side là "left", tooltip hiển thị bên phải */
            right: ${side === "right" ? "100%" : "auto"}; /* Nếu side là "right", tooltip hiển thị bên trái */
            margin-left: ${side === "left" ? "1rem" : "0"}; /* Tạo khoảng cách bên phải */
            margin-right: ${side === "right" ? "1rem" : "0"}; /* Tạo khoảng cách bên trái */
          }
        `}</style>
      </div>
    </a>
  );
};

export default NotificationBell;
