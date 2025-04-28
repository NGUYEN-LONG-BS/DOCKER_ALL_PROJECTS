import React from "react";
import Image from 'next/image';

interface NavigationComponentProps {
  info: string;  // Thông tin hiển thị khi hover chuột
  side: string;  // Quyết định vị trí hiển thị tooltip (left hoặc right)
  link: string;  // Link khi click vào NavigationComponent
  linkIcon: string;  // Link icon tùy chỉnh
}

const NavigationComponent: React.FC<NavigationComponentProps> = ({ info, side, link, linkIcon }) => {
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
          border: "2px solid #ddd", // Viền bao quanh NavigationComponent
          padding: "5px",
          borderRadius: "8px",
          transition: "all 0.3s ease-in-out", // Thêm hiệu ứng cho viền
        }}
      >
        {/* Icon tùy chỉnh sử dụng Image component của Next.js */}
                <Image 
                  src={linkIcon} 
                  alt="Navigation Icon" 
                  width={45} // Đặt chiều rộng cho icon
                  height={45} // Đặt chiều cao cho icon
                  style={{ objectFit: "contain" }} // Đảm bảo ảnh không bị kéo dãn
                />

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
            top: 50%; /* Đặt tooltip vào giữa vị trí của icon */
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

export default NavigationComponent;
