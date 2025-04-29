"use client"

import { useState } from "react"

interface ProductData {
  code: string
  name: string
  unit: string
  quantity: number
  price: number
  warehouse: string
}

interface ProductComponentProps {
  onProductChange?: (product: ProductData) => void
}

export function ProductComponent({ onProductChange }: ProductComponentProps) {
  const [product, setProduct] = useState<ProductData>({
    code: "",
    name: "",
    unit: "",
    quantity: 0,
    price: 0,
    warehouse: "A",
  })

  const handleChange = (field: keyof ProductData, value: string | number) => {
    const updatedProduct = { ...product, [field]: value }
    setProduct(updatedProduct)
    if (onProductChange) {
      onProductChange(updatedProduct)
    }
  }

  return (
    <div className="card card-dashed">
      <div className="card-body">
        <div className="mb-3">
          <div className="d-flex align-items-center gap-2">
            <label htmlFor="product-code" className="form-label mb-0" style={{ width: "100px" }}>
              Mã hàng:
            </label>
            <input
              type="text"
              className="form-control"
              id="product-code"
              placeholder="Nhập mã hàng"
              value={product.code}
              onChange={(e) => handleChange("code", e.target.value)}
              style={{ width: "120px" }}
            />
            <input
              type="text"
              className="form-control flex-grow-1"
              id="product-name"
              placeholder="Nhập tên hàng"
              value={product.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <div style={{ width: "100px" }}></div>
            <input
              type="text"
              className="form-control"
              id="product-unit"
              placeholder="Đvt"
              value={product.unit}
              onChange={(e) => handleChange("unit", e.target.value)}
              style={{ width: "80px" }}
            />
            <input
              type="number"
              className="form-control"
              id="product-quantity"
              placeholder="SL thực nhập"
              value={product.quantity}
              onChange={(e) => handleChange("quantity", Number(e.target.value))}
              style={{ width: "120px" }}
            />
            <input
              type="number"
              className="form-control"
              id="product-price"
              placeholder="ĐG nhập"
              value={product.price}
              onChange={(e) => handleChange("price", Number(e.target.value))}
              style={{ width: "120px" }}
            />
            <div className="d-flex align-items-center ms-auto">
              <label htmlFor="warehouse" className="form-label mb-0 me-2">
                Kho nhập:
              </label>
              <select
                className="form-select"
                id="warehouse"
                value={product.warehouse}
                onChange={(e) => handleChange("warehouse", e.target.value)}
                style={{ width: "100px" }}
              >
                <option value="A">Kho A</option>
                <option value="B">Kho B</option>
                <option value="C">Kho C</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
