"use client"

import Link from "next/link"

const menuItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Kinh doanh",
    submenu: [
      {
        label: "Bán hàng",
        submenu: [
          { label: "Đơn hàng", href: "/kinh-doanh/ban-hang/don-hang" },
          { label: "Báo giá", href: "/kinh-doanh/ban-hang/bao-gia" },
          { label: "Khách hàng", href: "/kinh-doanh/ban-hang/khach-hang" },
        ],
      },
      {
        label: "Mua hàng",
        submenu: [
          { label: "Đơn mua hàng", href: "/kinh-doanh/mua-hang/don-mua-hang" },
          { label: "Nhà cung cấp", href: "/kinh-doanh/mua-hang/nha-cung-cap" },
        ],
      },
      { label: "Báo cáo", href: "/kinh-doanh/bao-cao" },
    ],
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
    label: "Kỹ thuật",
    href: "/ky-thuat",
  },
  {
    label: "Tài chính",
    submenu: [
      { label: "Thu", href: "/tai-chinh/thu" },
      { label: "Chi", href: "/tai-chinh/chi" },
      { label: "Báo cáo", href: "/tai-chinh/bao-cao" },
    ],
  },
  {
    label: "Nhân sự",
    href: "/nhan-su",
  },
  {
    label: "Admin",
    href: "/admin",
  },
  {
    label: "Help",
    href: "/help",
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
