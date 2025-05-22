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
                Tutorials
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link href="/tutorials/html" className="dropdown-item">
                    HTML
                  </Link>
                </li>
                <li>
                  <Link href="/tutorials/css" className="dropdown-item">
                    CSS
                  </Link>
                </li>
                <li>
                  <Link href="/tutorials/javascript" className="dropdown-item">
                    JavaScript
                  </Link>
                </li>
                <li>
                  <Link href="/tutorials/python" className="dropdown-item">
                    Python
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
                Exercises
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link href="/exercises/html" className="dropdown-item">
                    HTML Exercises
                  </Link>
                </li>
                <li>
                  <Link href="/exercises/css" className="dropdown-item">
                    CSS Exercises
                  </Link>
                </li>
                <li>
                  <Link href="/exercises/javascript" className="dropdown-item">
                    JavaScript Exercises
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
                Certificates
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link href="/certificates/html" className="dropdown-item">
                    HTML Certificate
                  </Link>
                </li>
                <li>
                  <Link href="/certificates/css" className="dropdown-item">
                    CSS Certificate
                  </Link>
                </li>
                <li>
                  <Link href="/certificates/javascript" className="dropdown-item">
                    JavaScript Certificate
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
                Services
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link href="/services/hosting" className="dropdown-item">
                    Web Hosting
                  </Link>
                </li>
                <li>
                  <Link href="/services/spaces" className="dropdown-item">
                    Spaces
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
          <Link href="/html" className="px-2 py-1 text-white text-decoration-none hover-overlay">
            HTML
          </Link>
          <Link href="/css" className="px-2 py-1 text-white text-decoration-none hover-overlay">
            CSS
          </Link>
          <Link href="/javascript" className="px-2 py-1 text-white text-decoration-none hover-overlay">
            JAVASCRIPT
          </Link>
          <Link href="/sql" className="px-2 py-1 text-white text-decoration-none hover-overlay">
            SQL
          </Link>
          <Link href="/python" className="px-2 py-1 text-white text-decoration-none hover-overlay">
            PYTHON
          </Link>
          <Link href="/java" className="px-2 py-1 text-white text-decoration-none hover-overlay">
            JAVA
          </Link>
          <Link href="/php" className="px-2 py-1 text-white text-decoration-none hover-overlay">
            PHP
          </Link>
          <Link href="/howto" className="px-2 py-1 text-white text-decoration-none hover-overlay">
            HOW TO
          </Link>
          <Link href="/w3css" className="px-2 py-1 text-white text-decoration-none hover-overlay">
            W3.CSS
          </Link>
          <Link href="/c" className="px-2 py-1 text-white text-decoration-none hover-overlay">
            C
          </Link>
          <Link href="/cpp" className="px-2 py-1 text-white text-decoration-none hover-overlay">
            C++
          </Link>
          <Link href="/csharp" className="px-2 py-1 text-white text-decoration-none hover-overlay">
            C#
          </Link>
          <Link href="/bootstrap" className="px-2 py-1 bg-success text-white text-decoration-none rounded">
            Vĩ mô
          </Link>
          <Link href="/react" className="px-2 py-1 text-white text-decoration-none hover-overlay">
            REACT
          </Link>
          <Link href="/mysql" className="px-2 py-1 text-white text-decoration-none hover-overlay">
            MYSQL
          </Link>
          <Link href="/jquery" className="px-2 py-1 text-white text-decoration-none hover-overlay">
            JQUERY
          </Link>
          <Link href="/excel" className="px-2 py-1 text-white text-decoration-none hover-overlay">
            EXCEL
          </Link>
          <Link href="/xml" className="px-2 py-1 text-white text-decoration-none hover-overlay">
            XML
          </Link>
        </div>
      </div>
    </header>
  );
}