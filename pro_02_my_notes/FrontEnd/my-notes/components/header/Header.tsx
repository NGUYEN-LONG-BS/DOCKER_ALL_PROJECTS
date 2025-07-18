// Secondary navigation links
const secondaryNavLinks = [
  { href: "/kinh-te-vi-mo", label: "CFA" },
  { href: "/nguyen-ly-ke-toan", label: "ACCA" },
  { href: "/nguyen-ly-ke-toan", label: "Data analyst" },
  { href: "/my-projects", label: "My projects" },
];
// My projects dropdown items
const myProjectsDropdownItems = [
  { href: "/my-projects/python-django", label: "Python Django" },
  { href: "/my-projects/next-js", label: "NEXT js" },
  { href: "/html/django/start_dijango_with_docker_step_01.html", label: "Django" },
  { href: "/html/nextjs/flow-redux-toolkit.html", label: "NEXT" },
  { href: "/html/orther-projects/danh_muc_san_pham.html", label: "orther projects from flask" },
  { href: "/html/economic/eco-interest_rates_full.html", label: "economic" },
  { href: "/trang-diem-co-dau", label: "Trang điểm cô dâu" },
  { href: "/bat-dong-san/home", label: "Web bất động sản" },
  { href: "/html/drop-shipping/tieu_chi_chon_san_pham_dropshiping.html", label: "Drop Shipping" },
];
// Data Analyst dropdown items
const dataAnalystDropdownItems = [
  { href: "/certificates/html", label: "SQL" },
  { href: "/step-chart", label: "Step chart" },
  { href: "/certificates/javascript", label: "Data Crawler" },
  { href: "/da/marketing", label: "Marketing" },
];
// ACCA dropdown items
const accaDropdownItems = [
  { href: "/acca/nguyen-ly-ke-toan", label: "Nguyên lý kế toán" },
  { href: "/exercises/css", label: "VAS" },
  { href: "/exercises/javascript", label: "IFRS" },
];
// CFA dropdown items
const cfaDropdownItems = [
  { href: "/cfa/macro", label: "1- Phương pháp Số học" },
  { href: "/cfa/macro", label: "2- Kinh tế học" },
  { href: "/cfa/macro", label: "3- Báo cáo Tài chính và Phân tích" },
  { href: "/cfa/macro", label: "4- Đầu tư Cổ phiếu" },
  { href: "/cfa/macro", label: "5- Đầu tư Trái phiếu" },
  { href: "/cfa/macro", label: "6- Chứng khoán Phái sinh" },
  { href: "/cfa/macro", label: "7- Đầu tư Thay thế" },
  { href: "/cfa/macro", label: "8- Quản lý Danh mục Đầu tư và Lập Kế hoạch Tài sản" },
  { href: "/cfa/macro", label: "9- Báo cáo Tài chính và Phân tích" },
  { href: "/cfa/macro", label: "10- Tiêu chuẩn Đạo đức và Chuyên môn" },
];
// components/Header.tsx
import Link from "next/link";
import HomeLogo from "@/components/iconLogo/HomeLogo";

export default function Header() {
  return (
    <header className="border-bottom sticky-top bg-white">
      <div className="container d-flex align-items-center justify-content-between py-3">
        <div className="d-flex align-items-center gap-3">
          <Link href="/" className="d-flex align-items-center text-decoration-none">
            <HomeLogo />
          </Link>

          <nav className="d-none d-md-flex align-items-center">
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                CFA
              </button>
              <ul className="dropdown-menu">
                {cfaDropdownItems.map((item, idx) => (
                  <li key={idx}>
                    <Link href={item.href} className="dropdown-item">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                ACCA
              </button>
              <ul className="dropdown-menu">
                {accaDropdownItems.map((item, idx) => (
                  <li key={idx}>
                    <Link href={item.href} className="dropdown-item">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Data Analyst
              </button>
              <ul className="dropdown-menu">
                {dataAnalystDropdownItems.map((item, idx) => (
                  <li key={idx}>
                    <Link href={item.href} className="dropdown-item">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                My projects
              </button>
              <ul className="dropdown-menu">
                {myProjectsDropdownItems.map((item, idx) => (
                  <li key={idx}>
                    <Link href={item.href} className="dropdown-item">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </nav>
        </div>

        <div className="d-flex align-items-center gap-2">
          <div className="position-relative d-none d-md-block">
            <div className="input-group">
              <input type="search" className="form-control rounded-pill" placeholder="Search..." />
              <span className="input-group-text bg-transparent border-0 position-absolute top-0 end-0">
                <i className="bi bi-search"></i>
              </span>
            </div>
          </div>

          <button className="btn btn-outline-secondary d-none d-md-flex align-items-center gap-1">
            <i className="bi bi-bookmark-fill text-success"></i>
            <span>Plus</span>
          </button>

          <button className="btn btn-outline-secondary d-none d-md-block">Spaces</button>
          <button className="btn btn-outline-secondary d-none d-md-block">For Teachers</button>
          <button className="btn btn-outline-secondary d-none d-lg-block">Get Certified</button>
          <button className="btn btn-success">Sign In</button>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="bg-dark text-white overflow-auto">
        <div className="container d-flex align-items-center py-2 gap-3" style={{ whiteSpace: "nowrap" }}>
          {secondaryNavLinks.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className={
                item.label === "CFA"
                  ? "px-2 py-1 bg-success text-white text-decoration-none rounded"
                  : "px-2 py-1 text-white text-decoration-none hover-overlay"
              }
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}