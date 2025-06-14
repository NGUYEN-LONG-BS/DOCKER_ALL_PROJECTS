"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import LogoutButton from "@/components/LogoutButton";
import './navbar_Home.css';
import { API_get_user_permission_info } from '@/api/api';
import { MenuItem, menuItems } from './Navbar_data';

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [departments, setDepartments] = useState<string[]>([]);

  useEffect(() => {
    const userId = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;
    if (!userId) return;

    fetch(`${API_get_user_permission_info}?user_id=${userId}`)
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
                  <Link className="dropdown-item" href={subItem.href || '#'}>
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
            <Link className="nav-link" href={item.href || '#'}>
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