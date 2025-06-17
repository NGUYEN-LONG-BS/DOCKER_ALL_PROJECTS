"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkPermission } from "@/utils/checkPermission";
import { permissionData } from "@/permission/data";

const pageData = [
  {
    category: "INVENTORY_CATEGORIES",
    label: "Bảng INVENTORY_CATEGORIES",
    path: "/admin/import-bulk-data/INVENTORY_CATEGORIES",
  },
  {
    category: "INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED",
    label: "Bảng INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED",
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
    <div>
      {/* Updated code to use `pageData` JSON for dynamic button rendering */}
      {pageData.map((page) => (
        <button key={page.category} onClick={() => navigateToPage(page.path)}>
          {page.label}
        </button>
      ))}
    </div>
  );
};

export default Page;