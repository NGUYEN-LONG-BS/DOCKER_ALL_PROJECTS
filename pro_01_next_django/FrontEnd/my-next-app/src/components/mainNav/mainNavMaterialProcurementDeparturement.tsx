"use client"

import Link from "next/link"

const menuItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Vật Tư",
    submenu: [
      { label: "Danh mục vật tư", href: "/vat-tu/danh-muc" },
      {
        label: "Kho",
        submenu: [
          { label: "Nhập kho", href: "/vat-tu/kho/nhap-kho" },
          { label: "Xuất kho", href: "/vat-tu/kho/xuat-kho" },
          { label: "Kiểm kê", href: "/vat-tu/kho/kiem-ke" },
        ],
      },
      { label: "Báo cáo", href: "/vat-tu/bao-cao" },
    ],
  },
  {
    label: "Đơn hàng bán",
    href: "#",
  },
  {
    label: "Đơn hàng mua",
    href: "#",
  },
  {
    label: "Tiện ích",
    href: "#",
  },
]

export function MainNav({ className }: { className?: string }) {
  return (
    <nav className={`navbar navbar-expand ${className}`}>
      <ul className="navbar-nav">
        {menuItems.map((item, index) => (
          <li key={index} className={item.submenu ? "nav-item dropdown" : "nav-item"}>
            {item.submenu ? (
              <>
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {item.label}
                </a>
                <ul className="dropdown-menu">
                  {item.submenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      {subItem.submenu ? (
                        <div className="dropdown-submenu">
                          <a className="dropdown-item" href="#">
                            {subItem.label}
                          </a>
                          <ul className="dropdown-menu">
                            {subItem.submenu.map((subSubItem, subSubIndex) => (
                              <li key={subSubIndex}>
                                <Link className="dropdown-item" href={subSubItem.href}>
                                  {subSubItem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <Link className="dropdown-item" href={subItem.href || "#"}>
                          {subItem.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <Link className="nav-link" href={item.href}>
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
