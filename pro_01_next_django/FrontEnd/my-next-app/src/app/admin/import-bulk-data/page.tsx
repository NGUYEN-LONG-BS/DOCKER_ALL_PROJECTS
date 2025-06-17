"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkPermission } from "@/utils/checkPermission";
import { permissionData } from "@/permission/data";

const Page = () => {
    // ========== Permission Check =========
    const router = useRouter();
    useEffect(() => {
        const currentPage = "admin___import_bulk_data"; // Update dynamically if needed
        const permissions = permissionData[currentPage];
        checkPermission(permissions, router);
    }, [router]);
    // =====================================

  const navigateToPage = (category: string) => {
    const pageMapping: Record<string, string> = {
      INVENTORY_CATEGORIES: "/admin/import-bulk-data/INVENTORY_CATEGORIES",
      INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED: "/admin/import-bulk-data/INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED",
    };

    const targetPage = pageMapping[category];
    if (targetPage) {
      router.push(targetPage);
    } else {
      console.error("Invalid category selected.");
    }
  };

  return (
    <div>
      <button onClick={() => navigateToPage("INVENTORY_CATEGORIES")}>Go to Inventory Categories</button>
      <button onClick={() => navigateToPage("INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED")}>Go to Inventory Stock</button>
    </div>
  );
};

export default Page;