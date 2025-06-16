import Navbar from "@/components/header/Navbar_Home";
import Link from "next/link";

export default function HeaderHome() {
  return (
    <header className="sticky-top border-bottom bg-white">
      <div className="container-fluid d-flex align-items-center py-2">
        <div className="d-flex align-items-center">
          <Link href="/home" className="d-flex align-items-center" style={{ textDecoration: 'none' }}>
            <img src="/images/logo-Light.jpg" alt="Tuan An Group" className="me-2" style={{ height: "40px" }} />
            <span className="d-none d-md-inline fs-4 fw-bold text-primary">TUAN AN GROUP</span>
          </Link>
        </div>
        <div className="flex-grow-1 mx-4">
          <Navbar />
        </div>
        <div className="ms-auto">{/* User profile could go here */}</div>
      </div>
    </header>
  );
}
