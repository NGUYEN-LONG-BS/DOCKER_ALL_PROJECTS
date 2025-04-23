"use client"

import { useState, useRef, useEffect } from "react"

interface ItemData {
  code: string
  name: string
  unit: string
  quantity: number
  unitPrice: number
  warehouse: string
}

interface ItemComponentProps {
  onItemChange?: (item: ItemData) => void
}

const mockWarehouses = ["Kho A", "Kho B", "Kho C"]

export function ItemComponent({ onItemChange }: ItemComponentProps) {
  const [item, setItem] = useState<ItemData>({
    code: "",
    name: "",
    unit: "",
    quantity: 0,
    unitPrice: 0,
    warehouse: "",
  })
  const [searchText, setSearchText] = useState("") 
  const [filteredItems, setFilteredItems] = useState<ItemData[]>([]) 
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
      // Filter logic for items (can be expanded based on your needs)
      const filtered = mockItems.filter(
        item =>
          item.code.toLowerCase().includes(text.toLowerCase()) ||
          item.name.toLowerCase().includes(text.toLowerCase())
      )
      setFilteredItems(filtered)
      setLoading(false)
      setShowDropdown(true)
    }, 300)
  }

  const handleSelectItem = (s: ItemData) => {
    setItem(s)
    setSearchText(s.code)
    setFilteredItems([])
    setShowDropdown(false)
    if (onItemChange) onItemChange(s)
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

  const handleChange = (field: keyof ItemData, value: string | number) => {
    const updatedItem = { ...item, [field]: value }
    setItem(updatedItem)
    if (onItemChange) {
      onItemChange(updatedItem)
    }
  }

  return (
    <div className="card card-dashed" ref={wrapperRef}>
      <div className="card-body">
        <div className="mb-3 position-relative">
          <div className="d-flex align-items-center gap-2">
            <label htmlFor="item-code" className="form-label mb-0" style={{ width: "120px" }}>
              Mã hàng
            </label>
            <input
              type="text"
              className="form-control"
              id="item-code"
              placeholder="Search here"
              value={searchText}
              onChange={(e) => handleFilter(e.target.value)}
            />
          </div>

          {showDropdown && (
            <ul
              className="list-group position-absolute mt-1 shadow"
              ref={dropdownRef}
              style={{ zIndex: 1000, width: "100%", maxHeight: "200px", overflowY: "auto" }}
            >
              {loading ? (
                <li className="list-group-item text-center">Đang tải...</li>
              ) : (
                filteredItems.map((s, index) => (
                  <li
                    key={s.code}
                    className="list-group-item list-group-item-action"
                    style={{ cursor: "pointer", fontSize: "0.9rem" }}
                    onClick={() => handleSelectItem(s)}
                  >
                    <div>{s.code} - {s.name}</div>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>

        {/* Row with 4 input fields: ĐVT, số lượng nhập, đơn giá nhập, kho nhập */}
        <div className="d-flex align-items-center gap-2">
          <input
            type="text"
            className="form-control"
            id="unit"
            placeholder="ĐVT"
            value={item.unit}
            onChange={(e) => handleChange("unit", e.target.value)}
            style={{ width: "100px" }}
          />
          <input
            type="number"
            className="form-control"
            id="quantity"
            placeholder="Số lượng nhập"
            value={item.quantity}
            onChange={(e) => handleChange("quantity", Number(e.target.value))}
            style={{ width: "100px" }}
          />
          <input
            type="number"
            className="form-control"
            id="unitPrice"
            placeholder="Đơn giá nhập"
            value={item.unitPrice}
            onChange={(e) => handleChange("unitPrice", Number(e.target.value))}
            style={{ width: "150px" }}
          />
          {/* Dropdown for kho nhập */}
          <select
            className="form-control"
            value={item.warehouse}
            onChange={(e) => handleChange("warehouse", e.target.value)}
            style={{ width: "150px" }}
          >
            <option value="">Chọn kho</option>
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
