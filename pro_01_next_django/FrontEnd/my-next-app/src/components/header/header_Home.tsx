import Navbar from "@/components/header/Navbar_Home";
import Link from "next/link";

export default function HeaderHome() {
  return (
    <header className="sticky-top border-bottom bg-white">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid py-2">
          {/* Logo and Brand */}
          <Link href="/home" className="navbar-brand d-flex align-items-center text-decoration-none">
            <img
              src="/images/logo-Light.jpg"
              alt="Tuan An Group"
              className="me-2"
              style={{ height: "40px" }}
            />
            <span className="d-none d-md-inline fs-4 fw-bold text-primary">
              TUAN AN GROUP
            </span>
          </Link>

          {/* Toggle button for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Content */}
          <div className="collapse navbar-collapse" id="navbarContent">
            <div className="ms-auto">
              <Navbar />
            </div>
            <div className="ms-auto">
              {/* User profile could go here */}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}