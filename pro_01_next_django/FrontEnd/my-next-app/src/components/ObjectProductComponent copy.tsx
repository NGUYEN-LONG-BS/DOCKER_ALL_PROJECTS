"use client"

import { useState, useRef, useEffect } from "react"

interface ProductData {
  code: string
  name: string
  unit: string
}

const mockWarehouses = ["Kho A", "Kho B", "Kho C"]

interface ProductComponentProps {
  onProductChange?: (Product: ProductData) => void
}

const mockProducts: ProductData[] = [
  { code: "HH-01A-001", name: "Mặt hàng A1", unit: "cái"},
  { code: "HH-01A-002", name: "Mặt hàng A2", unit: "chiếc"},
  { code: "HH-01A-003", name: "Mặt hàng A3", unit: "thùng"},
  { code: "HH-01A-004", name: "Mặt hàng A4", unit: "bộ"},
  { code: "HH-01A-005", name: "Mặt hàng A5", unit: "kg"},
  { code: "HH-01A-006", name: "Mặt hàng A6", unit: "m"},
  { code: "HH-01A-007", name: "Mặt hàng A7", unit: "lít"},
  { code: "HH-01A-008", name: "Mặt hàng A8", unit: "hộp"},
]

export function ProductComponent({ onProductChange }: ProductComponentProps) {
  const [Product, setProduct] = useState<ProductData>({
    code: "",
    name: "",
    unit: "",
  })
  const [searchText, setSearchText] = useState("")
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(false)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLUListElement>(null)

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleFilter = (text: string) => {
    setSearchText(text)
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }

    debounceTimeout.current = setTimeout(() => {
      setLoading(true)
      const filtered = mockProducts.filter(
        s =>
          s.code.toLowerCase().includes(text.toLowerCase()) ||
          s.name.toLowerCase().includes(text.toLowerCase()) ||
          s.unit.toLowerCase().includes(text.toLowerCase())
      )
      setFilteredProducts(filtered)
      setLoading(false)
      setShowDropdown(true)
    }, 300)
  }

  const handleSelectProduct = (s: ProductData) => {
    setProduct(s)
    setSearchText(s.code)
    setFilteredProducts([])
    setShowDropdown(false)
    if (onProductChange) onProductChange(s)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setShowDropdown(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleChange = (field: keyof ProductData, value: string) => {
    const updatedProduct = { ...Product, [field]: value }
    setProduct(updatedProduct)
    if (onProductChange) {
      onProductChange(updatedProduct)
    }
  }

  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex(prev => Math.min(filteredProducts.length - 1, prev + 1))
    }
    if (e.key === "ArrowUp") {
      setHighlightedIndex(prev => Math.max(0, prev - 1))
    }
    if (e.key === "Enter" && highlightedIndex >= 0) {
      handleSelectProduct(filteredProducts[highlightedIndex])
    }
  }

  const handleFocus = () => {
    setShowDropdown(true)
  }

  useEffect(() => {
    if (highlightedIndex >= 0 && dropdownRef.current) {
      const highlightedElement = dropdownRef.current.children[highlightedIndex] as HTMLElement
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        })
      }
    }
  }, [highlightedIndex])

  const formatNumber = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\./g, "")
    const formattedValue = formatNumber(value)
    e.target.value = formattedValue
    handleChange("unit", formattedValue) // Save formatted value to unit
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\./g, "")
    const formattedValue = formatNumber(value)
    e.target.value = formattedValue
    handleChange("unit", formattedValue) // Save formatted value to unit
  }

  return (
    <div className="card card-dashed" ref={wrapperRef}>
      <div className="card-body">
        <div className="mb-3 position-relative">
          <div className="d-flex align-items-center gap-2" style={{ marginBottom: "0px" }}>
            <label htmlFor="Product-code" className="form-label mb-0" style={{ width: "120px", whiteSpace: "nowrap" }}>
              Sản phẩm
            </label>
            <input
              type="text"
              className="form-control"
              id="Product-code"
              placeholder="Search here"
              value={searchText}
              onChange={(e) => handleFilter(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              style={{ width: "150px" }}
            />
            <input
              type="text"
              className="form-control flex-grow-1"
              id="Product-name"
              placeholder=""
              value={Product.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          {showDropdown && (
            <ul
              className="list-group position-absolute mt-1 shadow"
              ref={dropdownRef}
              style={{
                zIndex: 1000,
                width: "calc(100% - 100px)",
                marginLeft: "100px",
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              {loading ? (
                <li className="list-group-item text-center">Đang tải...</li>
              ) : (
                filteredProducts.map((s, index) => (
                  <li
                    key={s.code}
                    className={`list-group-item list-group-item-action ${index === highlightedIndex ? 'bg-info' : ''}`}
                    style={{ cursor: "pointer", fontSize: "0.9rem" }}
                    onClick={() => handleSelectProduct(s)}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 2fr 3fr", gap: "10px" }}>
                      <div><strong>{s.code}</strong></div>
                      <div>{s.name}</div>
                      <div>{s.unit}</div>
                    </div>
                  </li>
                ))
              )}
              {filteredProducts.length === 0 && !loading && (
                <li className="list-group-item text-muted">Vui lòng gợi ý thông tin</li>
              )}
            </ul>
          )}
        </div>

        <div className="d-flex align-items-center gap-2" style={{ marginBottom: "0px" }}>
          <input
            type="text"
            className="form-control"
            id="Product-unit"
            placeholder=""
            value={Product.unit}
            onChange={(e) => handleChange("unit", e.target.value)}
            style={{ width: "50px" }}
          />
          <label htmlFor="Product-code" className="form-label mb-0" style={{ width: "120px", whiteSpace: "nowrap" }}>
            Số lượng
          </label>
          <input
            type="text"
            className="form-control"
            id="quantity"
            placeholder=""
            onChange={handleQuantityChange}
            style={{ width: "80px" }}
          />
          <label htmlFor="Product-code" className="form-label mb-0" style={{ width: "120px", whiteSpace: "nowrap" }}>
            Đơn giá
          </label>
          <input
            type="text"
            className="form-control"
            id="unitPrice"
            placeholder=""
            onChange={handlePriceChange}
            style={{ width: "80px" }}
          />
          <select
            className="form-control"
            style={{ width: "150px" }}
            defaultValue="Kho A"
          >
            <option value="Kho A">Kho A</option>
            {mockWarehouses.map((warehouse, index) => (
              <option key={index} value={warehouse}>
                {warehouse}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
