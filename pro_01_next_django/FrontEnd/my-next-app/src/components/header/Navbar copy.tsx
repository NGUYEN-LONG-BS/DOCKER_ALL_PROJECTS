"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { logout } from '@/features/userSlice';
import { useRouter } from 'next/navigation';
import LogoutButton from "@/components/LogoutButton";

// Gom tất cả menuItems và dropdowns vào một mảng, dùng trường submenu cho dropdown, thêm permission nếu cần
const menuItems = [
  { label: 'Home', href: '/home' },
  { label: 'BP Kinh Doanh', href: '/bpkinhdoanh', permission: 'KinhDoanh' },
  { label: 'BP Vật Tư', href: '/bpvattu', permission: 'VatTu' },
  { label: 'BP Kế Toán - Tài Chính', href: '/bpkttc', permission: ['TaiChinh', 'KeToan'] },
  { label: 'BP Nhân Sự', href: '/bpnhansu', permission: 'NhanSu' },
  {
    label: 'Test link',
    permission: 'admin',
    submenu: [
      { label: 'test inventory V0', href: '/inventory-management' },
      { label: 'test inventory with reDux', href: '/inventory-management-with_reDux_ToolKit' },
      { label: 'test trang thêm mã hàng', href: '/bpvattu/inventory' },
      { label: 'test form', href: '/form' },
      { label: 'test add item', href: '/add-item' },
      { label: '---' },
      { label: 'Something else here', href: '#' },
    ],
  },
  {
    label: 'Report',
    permission: 'admin',
    submenu: [
      { label: 'Báo cáo', href: '/my-reports' },
      { label: 'dashboard', href: '/dashboard' },
      { label: 'report-warehouse', href: '/report-warehouse' },
      { label: 'my-report-bao-cao-tong-quan', href: '/my-report-bao-cao-tong-quan' },
    ],
  },
  {
    label: 'Admin',
    permission: 'admin',
    submenu: [
      {
        label: 'User',
        submenu: [
          { label: 'Tạo mới user', href: '/admin/user' },
          { label: 'Phân quyền user', href: '/admin/user' },
        ],
      },
      {
        label: 'Django',
        submenu: [
          { label: 'Docker 01', href: '/html/django/start_dijango_with_docker_step_01.html' },
          { label: 'Docker 02', href: '/html/django/start_dijango_with_docker_step_02.html' },
          { label: 'Docker 03', href: '/html/django/start_dijango_with_docker_step_03.html' },
          { label: 'Docker 04', href: '/html/django/start_dijango_with_docker_step_04.html' },
        ],
      },
      {
        label: 'nextjs',
        submenu: [
          { label: 'flow-redux-toolkit', href: '/html/nextjs/flow-redux-toolkit.html' },
          { label: 'next-link-to-html-static', href: '/html/nextjs/next-link-to-html-static.html' },
          { label: 'react-hooks', href: '/html/nextjs/react-hooks.html' },
          { label: 'react-redux', href: '/html/nextjs/react-redux.html' },
          { label: 'redux-toolkit', href: '/html/nextjs/redux-toolkit.html' },
          { label: 'useState-useReducer', href: '/html/nextjs/useState-useReducer.html' },
        ],
      },
      {
        label: 'economic',
        submenu: [
          { label: 'Lãi suất Việt Nam', href: '/html/economic/eco-interest_rates_full.html' },
        ],
      },
      {
        label: 'orther-projects',
        submenu: [
          { label: 'base', href: '/html/orther-projects/base.html' },
          { label: 'danh_muc_san_pham', href: '/html/orther-projects/danh_muc_san_pham.html' },
          { label: 'home', href: '/html/orther-projects/home.html' },
          { label: 'index', href: '/html/orther-projects/index.html' },
          { label: 'login', href: '/html/orther-projects/login.html' },
          { label: 'mychart', href: '/html/orther-projects/mychart.html' },
          { label: 'ngay_quan_trong', href: '/html/orther-projects/ngay_quan_trong.html' },
          { label: 'postGreSQL-config-remote-connecttion', href: '/html/orther-projects/postGreSQL-config-remote-connecttion.html' },
          { label: 'user', href: '/html/orther-projects/user.html' },
        ],
      },
    ],
  },
];

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

  // Hàm kiểm tra quyền cho từng menu item
  const hasPermission = (permission: string | string[] | undefined) => {
    if (!permission) return true;
    if (Array.isArray(permission)) {
      return permission.some(p => departments.includes(p));
    }
    return departments.includes(permission);
  };

  // Hàm render menu đệ quy
  function renderMenu(items: any[], departments: string[], hasPermission: (p: any) => boolean, parentKey = '') {
    return items.map((item, idx) => {
      if (!hasPermission(item.permission)) return null;
      if (item.label === '---') {
        return <li key={parentKey + idx}><hr className="dropdown-divider" /></li>;
      }
      if (item.submenu) {
        return (
          <li className="nav-item dropdown" key={parentKey + item.label + idx}>
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id={`navbarDropdown${parentKey + idx}`}
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {item.label}
            </a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby={`navbarDropdown${parentKey + idx}`}>
              {renderMenu(item.submenu, departments, hasPermission, parentKey + idx + '-')}
            </ul>
          </li>
        );
      }
      return (
        <li className="nav-item" key={parentKey + item.label + idx}>
          <Link className="nav-link" href={item.href}>{item.label}</Link>
        </li>
      );
    });
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          <Image src="/logo.png" alt="Logo" width={30} height={30} className="d-inline-block align-text-top" />
          {' '}My Website
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {renderMenu(menuItems, departments, hasPermission)}
          </ul>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
