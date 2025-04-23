"use client"

import { useState } from "react"

interface SupplierData {
  code: string
  name: string
  taxId: string
  address: string
}

interface SupplierComponentProps {
  onSupplierChange?: (supplier: SupplierData) => void
}

export function SupplierComponent({ onSupplierChange }: SupplierComponentProps) {
  const [supplier, setSupplier] = useState<SupplierData>({
    code: "",
    name: "",
    taxId: "",
    address: "",
  })

  const handleChange = (field: keyof SupplierData, value: string) => {
    const updatedSupplier = { ...supplier, [field]: value }
    setSupplier(updatedSupplier)
    if (onSupplierChange) {
      onSupplierChange(updatedSupplier)
    }
  }

  return (
    <div className="card card-dashed">
      <div className="card-body">
        <div className="mb-3">
          <div className="d-flex align-items-center gap-2">
            <label htmlFor="supplier-code" className="form-label mb-0" style={{ width: "100px" }}>
              Nhà cung cấp:
            </label>
            <input
              type="text"
              className="form-control"
              id="supplier-code"
              placeholder="Search here ..."
              value={supplier.code}
              onChange={(e) => handleChange("code", e.target.value)}
              style={{ width: "120px" }}
            />
            <input
              type="text"
              className="form-control flex-grow-1"
              id="supplier-name"
              placeholder="..."
              value={supplier.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="d-flex align-items-center gap-2">
            <div style={{ width: "100px" }}></div>
            <input
              type="text"
              className="form-control"
              id="supplier-tax"
              placeholder="..."
              value={supplier.taxId}
              onChange={(e) => handleChange("taxId", e.target.value)}
              style={{ width: "120px" }}
            />
            <input
              type="text"
              className="form-control flex-grow-1"
              id="supplier-address"
              placeholder="..."
              value={supplier.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
