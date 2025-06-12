"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { logout } from '@/features/userSlice';
import { useRouter } from 'next/navigation';
import LogoutButton from "@/components/LogoutButton";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [departments, setDepartments] = useState<string[]>([]);

  useEffect(() => {
    // Lấy user_id từ localStorage (đã lưu khi login thành công)
    const userId = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;
    if (!userId) return;
    fetch(`http://localhost:8000//api/get-user-permission-info/?user_id=${userId}`)
      .then(res => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDepartments(data.map((item: any) => item.department));
        }
      })
      .catch(() => setDepartments([]));
  }, []);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    // Xóa cookie isAuthenticated
    document.cookie = 'isAuthenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    dispatch(logout());
    router.push('/login');
  };

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
          <span className="ms-2">Tuấn Ân Group</span> {/* Tên trang hoặc khẩu hiệu */}
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
            {departments.includes('KinhDoanh') && (
              <li className="nav-item">
                <Link className="nav-link" href="/bpkinhdoanh">BP Kinh Doanh</Link>
              </li>
            )}
            {departments.includes('VatTu') && (
              <li className="nav-item">
                <Link className="nav-link" href="/bpvattu">BP Vật Tư</Link>
              </li>
            )}
            {departments.includes('TaiChinh') && (
              <li className="nav-item">
                <Link className="nav-link" href="/bpkttc">BP Kế Toán - Tài Chính</Link>
              </li>
            )}
            {departments.includes('NhanSu') && (
              <li className="nav-item">
                <Link className="nav-link" href="/bpnhansu">BP Nhân Sự</Link>
              </li>
            )}

            {/* Dropdown */}
            {departments.map(dep => dep.toLowerCase()).includes('admin'.toLowerCase()) && (
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
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" href="/inventory-management">test inventory V0</Link></li>
                  <li><Link className="dropdown-item" href="/inventory-management-with_reDux_ToolKit">test inventory with reDux</Link></li>
                  <li><Link className="dropdown-item" href="/bpvattu/inventory">test trang thêm mã hàng</Link></li>
                  <li><Link className="dropdown-item" href="/form">test form</Link></li>
                  <li><Link className="dropdown-item" href="/add-item">test add item</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" href="#">Something else here</Link></li>
                </ul>
              </li>
            )}

            {/* Dropdown */}
            {departments.map(dep => dep.toLowerCase()).includes('admin'.toLowerCase()) && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Report
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" href="/my-reports">Báo cáo</Link></li>
                  <li><Link className="dropdown-item" href="/dashboard">dashboard</Link></li>
                  <li><Link className="dropdown-item" href="/report-warehouse">report-warehouse</Link></li>
                  <li><Link className="dropdown-item" href="/my-report-bao-cao-tong-quan">my-report-bao-cao-tong-quan</Link></li>
                  
                </ul>
              </li>
              )}


            {departments.includes('admin') && (
              <li className="nav-item">
                <Link className="nav-link" href="/admin/user">Admin</Link>
              </li>
            )}
            
          </ul>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
