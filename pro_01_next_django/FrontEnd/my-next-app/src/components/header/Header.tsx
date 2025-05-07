import React from 'react';
import Image from 'next/image';
import Link from 'next/link';  // Import Link từ next

const Header = () => {
  return (
    <header className="bg-dark text-white py-4">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Thêm logo */}
        <div className="d-flex align-items-center">
          <Image
            src="/images/logo-Light.jpg"  // Logo của bạn nằm trong thư mục public
            alt="Logo"
            width={100}        // Điều chỉnh kích thước logo theo ý muốn
            height={50}       // Điều chỉnh kích thước logo theo ý muốn
            priority
          />
          <h1 className="ms-3 mb-0">Tuấn Ân Group</h1> {/* Tên trang hoặc khẩu hiệu */}
        </div>
      </div>
    </header>
  );
};

export default Header;
