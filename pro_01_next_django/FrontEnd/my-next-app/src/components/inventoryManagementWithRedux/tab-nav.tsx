"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setActiveTab, TAB_NAMES } from "@/features/formReceiptSlip/tabNavSlice";
import { resetProductState } from "@/features/formReceiptSlip/objectProductComponentSlice";
import { InventoryFormStockReceiveSlip } from "./tabReceiptInputSlip/Tab01Form";
import { InventoryFormStockIssueSlip } from "./tabIssueInputSlip/Tab02Form";
import { InventoryCategoryTab } from "./tabInventoryCategories/Tab03Form";
import { InventoryLogStockReceiveSlip } from "./tabReceiptLog/Tab04Form";
import { InventoryLogStockIssueSlip } from "./tabIssueLog/Tab05Form";
import { InventoryReport } from "./tabInventoryReport/Tab06Form";


export function TabNav() {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.tabNav.activeTab);
  
  // Reset trạng thái của ProductComponent khi tab thay đổi
  useEffect(() => {
    dispatch(resetProductState());
    // console.log("Reset ProductComponent state due to tab change:", activeTab);
  }, [dispatch, activeTab]);

  return (
    <div className="mb-4">
      <ul className="nav nav-tabs" id="inventoryTabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === TAB_NAMES.NHAP_KHO ? "active" : ""}`}
            onClick={() => dispatch(setActiveTab(TAB_NAMES.NHAP_KHO))}
            type="button"
            role="tab"
          >
            NHẬP KHO
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === TAB_NAMES.XUAT_KHO ? "active" : ""}`}
            onClick={() => dispatch(setActiveTab(TAB_NAMES.XUAT_KHO))}
            type="button"
            role="tab"
          >
            XUẤT KHO
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === TAB_NAMES.TAO_MOI_MA_HANG ? "active" : ""}`}
            onClick={() => dispatch(setActiveTab(TAB_NAMES.TAO_MOI_MA_HANG))}
            type="button"
            role="tab"
          >
            TẠO MỚI MÃ HÀNG
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === TAB_NAMES.NHAT_KY_NHAP_KHO ? "active" : ""}`}
            onClick={() => dispatch(setActiveTab(TAB_NAMES.NHAT_KY_NHAP_KHO))}
            type="button"
            role="tab"
          >
            NHẬT KÝ NHẬP KHO
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === TAB_NAMES.NHAT_KY_XUAT_KHO ? "active" : ""}`}
            onClick={() => dispatch(setActiveTab(TAB_NAMES.NHAT_KY_XUAT_KHO))}
            type="button"
            role="tab"
          >
            NHẬT KÝ XUẤT KHO
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === TAB_NAMES.BAO_CAO_TON_KHO ? "active" : ""}`}
            onClick={() => dispatch(setActiveTab(TAB_NAMES.BAO_CAO_TON_KHO))}
            type="button"
            role="tab"
          >
            BÁO CÁO TỒN KHO
          </button>
        </li>
      </ul>
      <div className="tab-content" id="inventoryTabsContent">
        <div className={`tab-pane fade ${activeTab === TAB_NAMES.NHAP_KHO ? "show active" : ""}`} role="tabpanel">
          <InventoryFormStockReceiveSlip />
        </div>
        <div className={`tab-pane fade ${activeTab === TAB_NAMES.XUAT_KHO ? "show active" : ""}`} role="tabpanel">
          <InventoryFormStockIssueSlip />
        </div>
        <div className={`tab-pane fade ${activeTab === TAB_NAMES.TAO_MOI_MA_HANG ? "show active" : ""}`} role="tabpanel">
          <InventoryCategoryTab />
        </div>
        <div className={`tab-pane fade ${activeTab === TAB_NAMES.NHAT_KY_NHAP_KHO ? "show active" : ""}`} role="tabpanel">
          <InventoryLogStockReceiveSlip />
        </div>
        <div className={`tab-pane fade ${activeTab === TAB_NAMES.NHAT_KY_XUAT_KHO ? "show active" : ""}`} role="tabpanel">
          <InventoryLogStockIssueSlip />
        </div>
        <div className={`tab-pane fade ${activeTab === TAB_NAMES.BAO_CAO_TON_KHO ? "show active" : ""}`} role="tabpanel">
          <InventoryReport />
        </div>
      </div>
    </div>
  );
}