import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Top Navigation Bar */}
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
                <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
                <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
                <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
                <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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

      {/* Main Content */}
      <main className="flex-grow-1 d-flex">
        {/* Sidebar */}
        <aside className="border-end d-none d-md-block overflow-auto" style={{ width: "250px" }}>
          <div className="p-3 border-bottom">
            <h2 className="fw-bold fs-5 mb-0">Kinh tế vĩ mô</h2>
          </div>
          <nav className="p-0">
            <Link href="/bootstrap/home" className="d-block px-3 py-2 bg-success text-white text-decoration-none">
              Chính sách tài khoá
            </Link>
            <Link href="/bootstrap/get-started" className="d-block px-3 py-2 text-decoration-none hover-bg-light">
              Bộ ba bất khả thi
            </Link>
            <Link href="/bootstrap/containers" className="d-block px-3 py-2 text-decoration-none hover-bg-light">
              Cơ chế tỷ giá
            </Link>
            <Link href="/bootstrap/grid" className="d-block px-3 py-2 text-decoration-none hover-bg-light">
              Vĩ mô tiền tệ
            </Link>
            <Link href="/bootstrap/typography" className="d-block px-3 py-2 text-decoration-none hover-bg-light">
              Cung tiền
            </Link>
            <Link href="/bootstrap/colors" className="d-block px-3 py-2 text-decoration-none hover-bg-light">
              Đường con lợi suất
            </Link>
            <Link href="/bootstrap/tables" className="d-block px-3 py-2 text-decoration-none hover-bg-light">
              Công cụ điều hành tỷ giá
            </Link>
            <Link href="/bootstrap/images" className="d-block px-3 py-2 text-decoration-none hover-bg-light">
              Cơ chế điều hành lãi suất
            </Link>
            
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-grow-1 d-flex">
          <div className="flex-grow-1 p-4 mx-auto" style={{ maxWidth: "900px" }}>
            <div className="d-flex justify-content-end mb-3">
              <button className="btn btn-outline-secondary">
                <i className="bi bi-bookmark"></i>
              </button>
            </div>

            <h1 className="display-5 fw-bold mb-4">Bootstrap 5 Tutorial</h1>

            <div className="d-flex justify-content-between mb-4">
              <button className="btn btn-outline-secondary d-flex align-items-center gap-1">
                <i className="bi bi-chevron-left"></i> Home
              </button>
              <button className="btn btn-outline-secondary d-flex align-items-center gap-1">
                Next <i className="bi bi-chevron-right"></i>
              </button>
            </div>

            <div className="bg-light p-4 rounded mb-5">
              <h2 className="fs-2 fw-bold mb-3">Learn Bootstrap 5</h2>
              <p className="mb-3">
                Bootstrap 5 is the newest version of Bootstrap, which is the most popular HTML, CSS, and JavaScript
                framework for creating responsive, mobile-first websites.
              </p>
              <p className="mb-4">Bootstrap 5 is completely free to download and use!</p>
              <button className="btn btn-success">Start learning Bootstrap 5 now »</button>
            </div>

            <h2 className="fs-2 fw-bold mb-3">Try it Yourself Examples</h2>
            <p className="mb-3">This tutorial contains hundreds of Bootstrap 5 examples.</p>
            <p className="mb-4">
              With our online editor, you can edit the code, and click on a button to view the result.
            </p>

            <div className="border rounded p-4 mb-5">
              <h3 className="fs-4 fw-bold mb-3">Bootstrap 5 Example</h3>
              <div
                className="bg-light p-4 rounded mb-3 d-flex align-items-center justify-content-center"
                style={{ height: "250px" }}
              >
                <p className="text-muted">Example code preview would appear here</p>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-success">Try it Yourself »</button>
              </div>
            </div>
          </div>

          {/* Advertisements */}
          <div className="d-none d-lg-block p-3" style={{ width: "250px" }}>
            <div className="text-muted small mb-2">ADVERTISEMENT</div>
            <div
              className="border rounded p-2 d-flex align-items-center justify-content-center text-muted mb-3"
              style={{ height: "400px" }}
            >
              Advertisement Space
            </div>
            <div
              className="border rounded p-2 d-flex align-items-center justify-content-center text-muted"
              style={{ height: "400px" }}
            >
              Advertisement Space
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
