"use client"

import { DateComponent } from "../date/date-component-with-rkt";
import { DocumentNumberComponent } from "../documentNumber/document-number-component-input-form";
import { ClientComponent } from "./ObjectClientComponent"
import { ProductComponent } from "../objectProduct/ObjectProductComponentInputForm";
import { InventoryTableStockIssuesSlip } from "./Tab02Table"
import InventoryNoteOfStockReceiveSlip from "./InventoryNoteOfStockReceiveSlip"

export function InventoryFormStockIssuesSlip() {
  return (
    <div className="card mt-3">
      <div className="card-header text-center">
        <h5 className="card-title mb-0">PHIẾU XUẤT KHO</h5>
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
            <ClientComponent />
            <InventoryNoteOfStockReceiveSlip />
          </div>
          <div className="col-md-6">
            <ProductComponent />
          </div>
        </div>

        <InventoryTableStockIssuesSlip />

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
