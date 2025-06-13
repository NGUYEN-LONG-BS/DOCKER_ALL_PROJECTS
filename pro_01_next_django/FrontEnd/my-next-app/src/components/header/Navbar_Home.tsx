"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import LogoutButton from "@/components/LogoutButton";
import './navbar_Home.css';

// Update MenuItem type to support submenu_02
interface MenuItem {
  label: string;
  href?: string;
  permission?: string | string[];
  submenu?: MenuItem[];
  submenu_02?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { label: 'Home', href: '/home' },
  { label: 'BP Kinh Doanh', href: '/bpkinhdoanh', permission: 'KinhDoanh' },
  { label: 'BP Vật Tư', href: '/bpvattu', permission: 'VatTu' },
  // { label: 'BP Kế Toán - Tài Chính', href: '/bpkttc', permission: ['TaiChinh', 'KeToan'] },
  {
    label: 'BP Kế Toán - Tài Chính',
    permission: ['TaiChinh', 'KeToan'],
    submenu: [
      {
        label: 'Kế toán kho',
        permission: ['TaiChinh', 'KeToan'],
        submenu_02: [
          { label: 'Xuất nhập tồn', href: '/inventory-management-with_reDux_ToolKit' },
          { label: 'Báo cáo kho', href: '/dashboard' },
        ],
      },
    ],
  },
  { label: 'BP Nhân Sự', href: '/bpnhansu', permission: 'NhanSu' },
  {
    label: 'Admin',
    permission: ['Admin'],
    submenu: [
      {
        label: 'User',
        permission: ['Admin'],
        submenu_02: [
          { label: 'Tạo mới user', href: '/admin/user' },
          { label: 'Phân quyền user', href: '/admin/user' },
        ],
      },
      {
        label: 'Django',
        permission: ['Admin'],
        submenu_02: [
          { label: 'Docker 01', href: '/html/django/start_dijango_with_docker_step_01.html' },
          { label: 'Docker 02', href: '/html/django/start_dijango_with_docker_step_02.html' },
          { label: 'Docker 03', href: '/html/django/start_dijango_with_docker_step_03.html' },
          { label: 'Docker 04', href: '/html/django/start_dijango_with_docker_step_04.html' },
        ],
      },
      {
        label: 'nextjs',
        permission: ['Admin'],
        submenu_02: [
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
        permission: ['Admin'],
        submenu_02: [
          { label: 'Lãi suất Việt Nam', href: '/html/economic/eco-interest_rates_full.html' },
        ],
      },
      {
        label: 'orther-projects',
        permission: ['Admin'],
        submenu_02: [
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
      {
        label: 'Test link',
        permission: ['Admin'],
        submenu_02: [
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
        permission: ['Admin'],
        submenu_02: [
          { label: 'Báo cáo', href: '/my-reports' },
          { label: 'dashboard', href: '/dashboard' },
          { label: 'report-warehouse', href: '/report-warehouse' },
          { label: 'my-report-bao-cao-tong-quan', href: '/my-report-bao-cao-tong-quan' },
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
    const userId = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;
    if (!userId) return;

    fetch(`http://localhost:8000/api/get-user-permission-info/?user_id=${userId}`)
      .then(res => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDepartments(data.map((item: { department: string }) => item.department));
        }
      })
      .catch(() => setDepartments([]));
  }, []);

  // const handleLogout = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   document.cookie = 'isAuthenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  //   dispatch(logout());
  //   router.push('/login');
  // };

  const hasPermission = (permission: string | string[] | undefined) => {
    if (!permission) return true;
    if (typeof permission === 'string') {
      return departments.includes(permission);
    }
    return permission.some((perm) => departments.includes(perm));
  };

  const renderMenu = (items: MenuItem[], parentKey = '') => {
    return items.map((item, idx) => {
      const key = `${parentKey}${idx}`;
      const isTopLevel = parentKey === '';

      // Handle submenu_02 (level 2)
      if (item.submenu_02) {
        return (
          <li className="dropdown-submenu" key={key}>
            <a className="dropdown-item dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
              {item.label}
            </a>
            <ul className="dropdown-menu">
              {item.submenu_02.map((subItem, subIdx) => (
                <li key={key + '-' + subIdx}>
                  <Link className="dropdown-item" href={subItem.href || '#'}
                  >
                    {subItem.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        );
      }

      if (item.submenu) {
        // Nếu là submenu nhiều cấp, cần thêm class dropdown-submenu cho các cấp lồng nhau (không phải cấp 1)
        const isSubmenuVisible = item.submenu.some((subItem: MenuItem) => subItem.label !== '---' && hasPermission(subItem.permission));
        if (!isSubmenuVisible) return null;

        return (
          <li className={isTopLevel ? "nav-item dropdown" : "dropdown-submenu"} key={key}>
            <a
              className={isTopLevel ? "nav-link dropdown-toggle" : "dropdown-item dropdown-toggle"}
              href="#"
              id={`navbarDropdown${key}`}
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {item.label}
            </a>
            <ul className={isTopLevel ? "dropdown-menu dropdown-menu-end" : "dropdown-menu"} aria-labelledby={`navbarDropdown${key}`}>
              {/* Đệ quy render submenu */}
              {renderMenu(item.submenu, key + '-')}
            </ul>
          </li>
        );
      }

      if (hasPermission(item.permission)) {
        return (
          <li className="nav-item" key={key}>
            <Link className="nav-link" href={item.href || '#'}
            >
              {item.label}
            </Link>
          </li>
        );
      }

      return null;
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white" style={{ borderBottom: 'none' }}>
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {renderMenu(menuItems)}
          </ul>
          <div style={{ marginLeft: 'auto', marginRight: '0' }}>
            <LogoutButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;