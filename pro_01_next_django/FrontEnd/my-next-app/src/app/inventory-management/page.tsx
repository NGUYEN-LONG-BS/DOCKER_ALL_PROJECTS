"use client"

import { MainNav } from "@/components/mainNav/mainNavMaterialProcurementDeparturement"
import { TabNav } from "@/components/inventoryManagement/tab-nav"
import RightBar from "@/components/rightBarNotification/rightBarComponent";
import LeftBar from "@/components/leftBarNavigator/leftBarComponent"; 
// import { useState } from "react";
// import SuccessPopup from "@/components/popups/successPopupComponentTypeFadeOutNum01";
// import ErrorPopup from "@/components/popups/errorPopupComponentTypeFadeOutNum01";

export default function Home() {
  // const [successMessage, setSuccessMessage] = useState<string | null>(null);
  // const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="sticky-top border-bottom bg-white">
        <div className="container-fluid d-flex align-items-center py-2">
          <div className="d-flex align-items-center">
            <img src="/images/logo-Light.jpg" alt="Tuan An Group" className="me-2" style={{ height: "40px" }} />
            <span className="d-none d-md-inline fs-4 fw-bold text-primary">TUAN AN GROUP</span>
          </div>
          <MainNav className="mx-4" />
          <div className="ms-auto">{/* User profile could go here */}</div>
        </div>
      </header>
      <div className="flex-grow-1">
        <div className="container py-4">
          <h1 className="mb-4 text-center fw-bold">QUẢN LÝ DANH MỤC HÀNG HOÁ</h1>
          <TabNav />
        </div>
      </div>

      {/* Side Bar */}
      <RightBar />
      <LeftBar />

      {/* Show success message when needed */}
      {/* {successMessage && (
        <SuccessPopup message={successMessage} onClose={() => setSuccessMessage(null)} />
      )} */}

      {/* Show success message when needed */}
      {/* {successMessage && (
        <ErrorPopup message={errorMessage} onClose={() => setErrorMessage(null)} />
      )} */}

      <footer className="border-top py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <p className="mb-0 text-muted small">© 2025 Tuan An Group. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}
