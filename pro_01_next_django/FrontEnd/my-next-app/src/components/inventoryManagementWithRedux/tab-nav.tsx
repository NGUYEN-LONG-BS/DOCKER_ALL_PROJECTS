"use client"
import { useState } from "react"
import { InventoryFormStockReceiveSlip } from "./Tab01Form"
import { InventoryFormStockIssuesSlip } from "./Tab02Form"
import { InventoryCategoryTab } from "./Tab03Form"
import { InventoryLogStockReceiveSlip } from "./Tab04Form"

export function TabNav() {
  const [activeTab, setActiveTab] = useState("nhap-kho")

  return (
    <div className="mb-4">
      <ul className="nav nav-tabs" id="inventoryTabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === "nhap-kho" ? "active" : ""}`}
            onClick={() => setActiveTab("nhap-kho")}
            type="button"
            role="tab"
          >
            NHẬP KHO
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === "xuat-kho" ? "active" : ""}`}
            onClick={() => setActiveTab("xuat-kho")}
            type="button"
            role="tab"
          >
            XUẤT KHO
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === "tao-moi-ma-hang" ? "active" : ""}`}
            onClick={() => setActiveTab("tao-moi-ma-hang")}
            type="button"
            role="tab"
          >
            TẠO MỚI MÃ HÀNG
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === "nhat-ky-nhap-kho" ? "active" : ""}`}
            onClick={() => setActiveTab("nhat-ky-nhap-kho")}
            type="button"
            role="tab"
          >
            NHẬT KÝ NHẬP KHO
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === "nhat-ky-xuat-kho" ? "active" : ""}`}
            onClick={() => setActiveTab("nhat-ky-xuat-kho")}
            type="button"
            role="tab"
          >
            NHẬT KÝ XUẤT KHO
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === "bao-cao-ton-kho" ? "active" : ""}`}
            onClick={() => setActiveTab("bao-cao-ton-kho")}
            type="button"
            role="tab"
          >
            BÁO CÁO TỒN KHO
          </button>
        </li>
      </ul>
      <div className="tab-content" id="inventoryTabsContent">
        <div className={`tab-pane fade ${activeTab === "nhap-kho" ? "show active" : ""}`} role="tabpanel">
          <InventoryFormStockReceiveSlip />
        </div>
        <div className={`tab-pane fade ${activeTab === "xuat-kho" ? "show active" : ""}`} role="tabpanel">
          <InventoryFormStockIssuesSlip />
        </div>
        <div className={`tab-pane fade ${activeTab === "tao-moi-ma-hang" ? "show active" : ""}`} role="tabpanel">
          <InventoryCategoryTab />
        </div>
        <div className={`tab-pane fade ${activeTab === "nhat-ky-nhap-kho" ? "show active" : ""}`} role="tabpanel">
          <InventoryLogStockReceiveSlip />
        </div>
        <div className={`tab-pane fade ${activeTab === "nhat-ky-xuat-kho" ? "show active" : ""}`} role="tabpanel">
          <div className="card mt-3">
            <div className="card-header text-center">
              <h5 className="card-title mb-0">NHẬT KÝ XUẤT KHO</h5>
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-center" style={{ height: "250px" }}>
                <span className="text-muted">Nội dung nhật ký xuất kho sẽ được hiển thị ở đây</span>
              </div>
            </div>
          </div>
        </div>
        <div className={`tab-pane fade ${activeTab === "bao-cao-ton-kho" ? "show active" : ""}`} role="tabpanel">
          <div className="card mt-3">
            <div className="card-header text-center">
              <h5 className="card-title mb-0">BÁO CÁO TỒN KHO</h5>
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-center" style={{ height: "250px" }}>
                <span className="text-muted">Nội dung báo cáo tồn kho sẽ được hiển thị ở đây</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
