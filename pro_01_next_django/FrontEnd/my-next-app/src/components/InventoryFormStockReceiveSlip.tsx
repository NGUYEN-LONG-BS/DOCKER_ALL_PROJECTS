"use client"

import { useState } from "react"
import { DateComponent } from "./date-component"
import { DocumentNumberComponent } from "./document-number-component"
import { SupplierComponent } from "./ObjectSupplierComponent"
import { ProductComponent } from "./ObjectProductComponent"
import { InventoryTableStockReceiveSlip } from "./InventoryTableStockReceiveSlip"
import InventoryNoteOfStockReceiveSlip from "./InventoryNoteOfStockReceiveSlip"

// Định nghĩa InventoryItemExport interface
interface InventoryItemExport {
  id: number
  code: string
  name: string
  unit: string
  quantity: number
  price: number
  value: number
  notes: string
}

export function InventoryFormStockReceiveSlip() {
  // Cập nhật state để lưu trữ thông tin sản phẩm với kiểu InventoryItemExport
  const [selectedProduct, setSelectedProduct] = useState<InventoryItemExport>({
    id: Date.now(),  // Tạo id tạm thời
    code: "",
    name: "",
    unit: "",
    quantity: 0,
    price: 0,
    value: 0,
    notes: ""
  })

  // Hàm xử lý khi sản phẩm thay đổi
  const handleProductChange = (product: InventoryItemExport) => {
    console.log("Component Form:")
    console.log(product)
    setSelectedProduct(product)  // Cập nhật thông tin sản phẩm đã chọn
  }

  return (
    <div className="card mt-3">
      <div className="card-header text-center">
        <h5 className="card-title mb-0">PHIẾU NHẬP KHO</h5>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-6">
            <DateComponent />
          </div>
          <div className="col-md-6">
            <DocumentNumberComponent />
          </div>
        </div>

        <div className="row g-3 mt-1">
          <div className="col-md-6">
            <SupplierComponent />
            <InventoryNoteOfStockReceiveSlip />
          </div>
          <div className="col-md-6">
            <ProductComponent onProductChange={handleProductChange} />
          </div>
        </div>

        {/* Truyền selectedProduct vào InventoryTableStockReceiveSlip */}
        <InventoryTableStockReceiveSlip product={selectedProduct} />

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button type="button" className="btn btn-outline-secondary">
            Template
          </button>
          <button type="button" className="btn btn-outline-secondary">
            Get file
          </button>
          <button type="button" className="btn btn-outline-secondary">
            Print
          </button>
          <button type="button" className="btn btn-outline-secondary">
            Save
          </button>
          <button type="button" className="btn btn-primary">
            Update
          </button>
        </div>
      </div>
    </div>
  )
}
