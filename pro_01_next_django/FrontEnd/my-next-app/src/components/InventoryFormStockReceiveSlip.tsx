"use client"

import { DateComponent } from "./date-component"
import { DocumentNumberComponent } from "./document-number-component"
import { SupplierComponent } from "./ObjectSupplierComponent"
import { ProductComponent } from "./ObjectProductComponent"
import { InventoryTableStockReceiveSlip } from "./InventoryTableStockReceiveSlip"

export function InventoryFormStockReceiveSlip() {
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

        <div className="row g-3 mt-2">
          <div className="col-md-6">
            <SupplierComponent />
          </div>
          <div className="col-md-6">
            <ProductComponent />
          </div>
        </div>

        <InventoryTableStockReceiveSlip />

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
