// components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-bottom sticky-top bg-white">
      <div className="container d-flex align-items-center justify-content-between py-3">
        <div className="d-flex align-items-center gap-3">
          <Link href="/" className="d-flex align-items-center text-decoration-none">
            <div
              className="position-relative bg-success d-flex align-items-center justify-content-center text-white fw-bold rounded"
              style={{ width: "40px", height: "40px" }}
            >
              <span className="fs-4">W</span>
              <span className="position-absolute top-0 end-0 fs-6">3</span>
            </div>
            <span className="fw-semibold ms-2 d-none d-sm-inline">LearnCode</span>
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
                  <Link href="/tutorials/html" className="dropdown-item">
                    Kinh tế vĩ mô
                  </Link>
                </li>
                <li>
                  <Link href="/tutorials/css" className="dropdown-item">
                    Kinh tế vi mô
                  </Link>
                </li>
                <li>
                  <Link href="/tutorials/javascript" className="dropdown-item">
                    Thị trường tài chính
                  </Link>
                </li>
                <li>
                  <Link href="/tutorials/python" className="dropdown-item">
                    Thị trường tiền tệ
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
                  <Link href="/exercises/html" className="dropdown-item">
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
                DATA ANALYST
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
                  <Link href="/services/hosting" className="dropdown-item">
                    Python Django
                  </Link>
                </li>
                <li>
                  <Link href="/services/spaces" className="dropdown-item">
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