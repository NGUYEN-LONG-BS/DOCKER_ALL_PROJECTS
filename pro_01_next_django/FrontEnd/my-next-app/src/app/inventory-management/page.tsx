"use client";

import HeaderHome from "@/components/header/header_Home";
import { TabNav } from "@/components/inventoryManagementWithRedux/tab-nav";
import RightBar from "@/components/rightBarNotification/rightBarComponent";
import LeftBar from "@/components/leftBarNavigator/leftBarComponent"; 
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkPermission } from "@/utils/checkPermission";
import { permissionData } from "@/permission/data";

export default function Home() {
  // ========== Permission Check =========
  const router = useRouter();
  useEffect(() => {
      const currentPage = "inventory_management"; // Update dynamically if needed
      const permissions = permissionData[currentPage];
      checkPermission(permissions, router);
  }, [router]);
  // =====================================

  return (
    <div className="d-flex flex-column min-vh-100">
      <HeaderHome />
      <div className="flex-grow-1">
        <div className="container py-4">
          <h1 className="mb-4 text-center fw-bold">QUẢN LÝ DANH MỤC HÀNG HOÁ</h1>
          <TabNav />
        </div>
      </div>
      {/* Side Bar */}
      <RightBar />
      <LeftBar />
      <footer className="border-top py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <p className="mb-0 text-muted small">© 2025 Tuan An Group. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}