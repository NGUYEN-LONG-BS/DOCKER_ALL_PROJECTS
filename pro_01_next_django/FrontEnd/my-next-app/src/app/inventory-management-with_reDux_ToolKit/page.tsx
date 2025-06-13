"use client"

import { MainNav } from "@/components/mainNav/mainNavMaterialProcurementDeparturement"
import HeaderHome from "@/components/header/header_Home"
import { TabNav } from "@/components/inventoryManagementWithRedux/tab-nav"
import RightBar from "@/components/rightBarNotification/rightBarComponent";
import LeftBar from "@/components/leftBarNavigator/leftBarComponent"; 
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    // Lấy user_id từ localStorage
    const userId = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;
    if (!userId) {
      router.replace('/login');
      return;
    }
    fetch(`http://localhost:8000//api/get-user-permission-info/?user_id=${userId}`)
      .then(res => res.json())
      .then((data) => {
        if (!Array.isArray(data) || !data.some((item: any) => (item.department || '').toLowerCase() === 'ketoan')) {
          // Xoá user_id và cookie, sign out ngay
          localStorage.removeItem('user_id');
          document.cookie = 'isAuthenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          router.replace('/login');
        }
      })
      .catch(() => {
        localStorage.removeItem('user_id');
        document.cookie = 'isAuthenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        router.replace('/login');
      });
  }, [router]);

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
  )
}
