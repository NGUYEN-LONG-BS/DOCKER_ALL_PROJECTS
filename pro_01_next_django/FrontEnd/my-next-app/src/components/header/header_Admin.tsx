import React from "react";
import { MainNav } from '@/components/header/mainNav_Admin';

interface HeaderDepartmentProps {
  title: string;
}

const HeaderDepartment: React.FC<HeaderDepartmentProps> = ({ title }) => (
  <header className="sticky-top border-bottom bg-white">
    <div className="container-fluid d-flex align-items-center py-2">
      <div className="d-flex align-items-center">
        <img src="/images/logo-Light.jpg" alt="Tuan An Group" className="me-2" style={{ height: "40px" }} />
        <span className="d-none d-md-inline fs-4 fw-bold text-primary">{title}</span>
      </div>
      {/* Đặt MainNav sang phải */}
      <div className="ms-auto">
        <MainNav />
      </div>
      {/* <div className="ms-auto">User profile could go here</div> */}
    </div>
  </header>
);

export default HeaderDepartment;
