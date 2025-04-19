import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Thêm logo vào Navbar */}
        <Link className="navbar-brand d-flex align-items-center" href="/">
          <Image
            src="/images/logo-Light.jpg" // Logo của bạn nằm trong thư mục public
            alt="Logo"
            width={80}        // Điều chỉnh kích thước logo
            height={40}       // Điều chỉnh kích thước logo
            priority
          />
          <span className="ms-2">Trang chủ</span> {/* Tên trang hoặc khẩu hiệu */}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" href="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/bpkinhdoanh">BP Kinh Doanh</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/bpvattu">BP Vật Tư</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/bpkttc">BP Kế Toán - Tài Chính</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/bpnhansu">BP Nhân Sự</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/users">Login</Link>
            </li>

            {/* Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Test link
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" href="#">Action</Link></li>
                <li><Link className="dropdown-item" href="#">Another action</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" href="#">Something else here</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
