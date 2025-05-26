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
                <li>
                  <Link href="/cfa/macro" className="dropdown-item">
                    1- Phương pháp Số học
                  </Link>
                </li>
                <li>
                  <Link href="/cfa/macro" className="dropdown-item">
                    2- Kinh tế học
                  </Link>
                </li>
                <li>
                  <Link href="/cfa/macro" className="dropdown-item">
                    3- Báo cáo Tài chính và Phân tích
                  </Link>
                </li>
                <li>
                  <Link href="/cfa/macro" className="dropdown-item">
                    4- Đầu tư Cổ phiếu
                  </Link>
                </li>
                <li>
                  <Link href="/cfa/macro" className="dropdown-item">
                    5- Đầu tư Trái phiếu
                  </Link>
                </li>
                <li>
                  <Link href="/cfa/macro" className="dropdown-item">
                    6- Chứng khoán Phái sinh
                  </Link>
                </li>
                <li>
                  <Link href="/cfa/macro" className="dropdown-item">
                    7- Đầu tư Thay thế
                  </Link>
                </li>
                <li>
                  <Link href="/cfa/macro" className="dropdown-item">
                    8- Quản lý Danh mục Đầu tư và Lập Kế hoạch Tài sản
                  </Link>
                </li>
                <li>
                  <Link href="/cfa/macro" className="dropdown-item">
                    9- Báo cáo Tài chính và Phân tích
                  </Link>
                </li>
                <li>
                  <Link href="/cfa/macro" className="dropdown-item">
                    10- Tiêu chuẩn Đạo đức và Chuyên môn
                  </Link>
                </li>

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
                <li>
                  <Link href="/acca/nguyen-ly-ke-toan" className="dropdown-item">
                    Nguyên lý kế toán
                  </Link>
                </li>
                <li>
                  <Link href="/exercises/css" className="dropdown-item">
                    VAS
                  </Link>
                </li>
                <li>
                  <Link href="/exercises/javascript" className="dropdown-item">
                    IFRS
                  </Link>
                </li>
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
                <li>
                  <Link href="/certificates/html" className="dropdown-item">
                    SQL
                  </Link>
                </li>
                <li>
                  <Link href="/certificates/css" className="dropdown-item">
                    Data visualisation
                  </Link>
                </li>
                <li>
                  <Link href="/certificates/javascript" className="dropdown-item">
                    Data Crawler
                  </Link>
                </li>
                <li>
                  <Link href="/da/marketing" className="dropdown-item">
                    Marketing
                  </Link>
                </li>
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
                <li>
                  <Link href="/my-projects/python-django" className="dropdown-item">
                    Python Django
                  </Link>
                </li>
                <li>
                  <Link href="/my-projects/next-js" className="dropdown-item">
                    NEXT js
                  </Link>
                </li>
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
          <Link href="/kinh-te-vi-mo" className="px-2 py-1 bg-success text-white text-decoration-none rounded">
            CFA
          </Link>
          <Link href="/nguyen-ly-ke-toan" className="px-2 py-1 text-white text-decoration-none hover-overlay">
            ACCA
          </Link>
          <Link href="/nguyen-ly-ke-toan" className="px-2 py-1 text-white text-decoration-none hover-overlay">
            Data analyst
          </Link>
          <Link href="/my-projects" className="px-2 py-1 text-white text-decoration-none hover-overlay">
            My projects
          </Link>
          
        </div>
      </div>
    </header>
  );
}