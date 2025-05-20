import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar: React.FC = () => {
  const [isSubDropdownOpen, setSubDropdownOpen] = useState(false);

  const handleSubDropdownToggle = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setSubDropdownOpen(!isSubDropdownOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" href="/">
          <Image
            src="/images/logo-Light.jpg"
            alt="Logo"
            width={80}
            height={40}
            priority
          />
          <span className="ms-2">Trang chủ</span>
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
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" href="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/bpkinhdoanh">
                BP Kinh Doanh
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/bpvattu">
                BP Vật Tư
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/bpkttc">
                BP Kế Toán - Tài Chính
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/bpnhansu">
                BP Nhân Sự
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/users">
                Login
              </Link>
            </li>

            {/* Test Link Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="testLinkDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Test link
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="testLinkDropdown">
                <li>
                  <Link className="dropdown-item" href="/inventory-management">
                    test inventory V0
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/inventory-management-with_reDux_ToolKit">
                    test inventory with reDux
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/bpvattu/inventory">
                    test trang thêm mã hàng
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/form">
                    test form
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/add-item">
                    test add item
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    Something else here
                  </Link>
                </li>
              </ul>
            </li>

            {/* My Notes Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="myNotesDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                My notes
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="myNotesDropdown">
                <li>
                  <Link className="dropdown-item" href="/html/nextjs/useState-useReducer.html">
                    Django
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" href="/inventory tome-management-with_reDux_ToolKit">
                    Next js
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" href="/bpvattu/inventory">
                    Economic
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" href="/form">
                    sales
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" href="/add-item">
                    other-projects
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                {/* Sub-dropdown */}
                <li className="dropdown-submenu">
                  <a
                    className={`dropdown-item dropdown-toggle ${isSubDropdownOpen ? 'show' : ''}`}
                    href="#"
                    id="djangoSubDropdown"
                    role="button"
                    aria-expanded={isSubDropdownOpen}
                    onClick={handleSubDropdownToggle}
                  >
                    Django 02
                  </a>
                  <ul className={`dropdown-menu ${isSubDropdownOpen ? 'show' : ''}`} aria-labelledby="djangoSubDropdown">
                    <li>
                      <Link
                        className="dropdown-item"
                        href="/html/django/start_dijango_with_docker_step_01.html"
                      >
                        Tạo docker và tạo dự án Django
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        href="/html/django/start_dijango_with_docker_step_02.html"
                      >
                        Sử dụng Dockerfile
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;