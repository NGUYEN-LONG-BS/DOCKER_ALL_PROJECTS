"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/header_Home";
import Footer from '@/components/footer/Footer';
import { checkPermission } from "@/utils/checkPermission";
import { permissionData } from "@/permission/data";

const pageData = [
  {
    category: "INVENTORY_CATEGORIES",
    label: "INVENTORY_CATEGORIES",
    path: "/admin/import-bulk-data/INVENTORY_CATEGORIES",
  },
  {
    category: "TB_CLIENT_CATEGORIES",
    label: "TB_CLIENT_CATEGORIES",
    path: "/admin/import-bulk-data/CLIENT_CATEGORIES",
  },
  {
    category: "INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED",
    label: "INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED",
    path: "/admin/import-bulk-data/INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED",
  },
];

const Page = () => {
  // ========== Permission Check =========
  const router = useRouter();
  useEffect(() => {
    const currentPage = "admin___import_bulk_data"; // Update dynamically if needed
    const permissions = permissionData[currentPage];
    checkPermission(permissions, router);
  }, [router]);
  // =====================================

  // Updated code to use `pageData` JSON for dynamic routing
  const navigateToPage = (path: string) => {
    router.push(path);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <h1 className="text-center text-black my-4 display-6" style={{ letterSpacing: 2, textShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        THÊM DỮ LIỆU HÀNG LOẠT
      </h1>
      <main className="container py-5 flex-grow-1">
        <div className="table-responsive" style={{ maxWidth: 600, margin: '0 auto' }}>
          <table className="table table-bordered align-middle shadow-sm">
            <thead className="table-primary position-sticky top-0" style={{ zIndex: 2 }}>
              <tr>
                <th style={{ width: 60, textAlign: 'center' }}>STT</th>
                <th style={{ minWidth: 200 }}>Tên bảng</th>
                <th style={{ width: 160, textAlign: 'center' }}>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((page, idx) => (
                <tr key={page.category}>
                  <td style={{ textAlign: 'center' }}>{idx + 1}</td>
                  <td>{page.label}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      onClick={() => navigateToPage(page.path)}
                      className="btn btn-outline-primary btn-sm px-3 fw-semibold"
                    >
                      Go
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page;