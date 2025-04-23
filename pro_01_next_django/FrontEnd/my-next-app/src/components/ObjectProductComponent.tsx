"use client"

import { useState, useRef, useEffect } from "react"

interface ProductData {
  code: string
  name: string
  unit: string
  address: string
}

interface ProductComponentProps {
  onProductChange?: (Product: ProductData) => void
}

const mockProducts: ProductData[] = [
  { code: "HH-01A-001", name: "Mặt hàng A1", unit: "cái", address: "Hà Nội" },
  { code: "HH-01A-002", name: "Mặt hàng A2", unit: "chiếc", address: "TP.HCM" },
  { code: "HH-01A-003", name: "Mặt hàng A3", unit: "thùng", address: "Đà Nẵng" },
  { code: "HH-01A-004", name: "Mặt hàng A4", unit: "bộ", address: "Cần Thơ" },
  { code: "HH-01A-005", name: "Mặt hàng A5", unit: "kg", address: "Hà Nội" },
  { code: "HH-01A-006", name: "Mặt hàng A6", unit: "m", address: "TP.HCM" },
  { code: "HH-01A-007", name: "Mặt hàng A7", unit: "lít", address: "Đà Nẵng" },
  { code: "HH-01A-008", name: "Mặt hàng A8", unit: "hộp", address: "Cần Thơ" },
]

export function ProductComponent({ onProductChange }: ProductComponentProps) {
  // State variables to manage Product data, search input, and filtered Products
  const [Product, setProduct] = useState<ProductData>({
    code: "",
    name: "",
    unit: "",
    address: "",
  })
  const [searchText, setSearchText] = useState("") // The search text entered by the user
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]) // Filtered list of Products based on search text
  const [showDropdown, setShowDropdown] = useState(false) // Flag to toggle dropdown visibility
  const [loading, setLoading] = useState(false) // Loading state to show spinner when filtering

  const wrapperRef = useRef<HTMLDivElement>(null) // Reference to the wrapper for outside click detection
  const dropdownRef = useRef<HTMLUListElement>(null) // Reference to the dropdown list for scroll control

  // Debounce logic to delay the filter operation after user stops typing
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  // Filter function that is triggered when user types in the search box
  const handleFilter = (text: string) => {
    setSearchText(text)
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current) // Clear the previous timeout
    }

    debounceTimeout.current = setTimeout(() => {
      setLoading(true) // Show loading spinner while filtering
      const filtered = mockProducts.filter(
        s =>
          s.code.toLowerCase().includes(text.toLowerCase()) || // Filter by code
          s.name.toLowerCase().includes(text.toLowerCase()) || // Filter by name
          s.unit.toLowerCase().includes(text.toLowerCase()) // Filter by tax ID
      )
      setFilteredProducts(filtered) // Set the filtered list of Products
      setLoading(false) // Hide loading spinner after filtering
      setShowDropdown(true) // Show the dropdown when there are filtered results
    }, 300) // Delay the filter action by 300ms
  }

  // Handle selection of a Product from the dropdown
  const handleSelectProduct = (s: ProductData) => {
    setProduct(s) // Set the selected Product in the state
    setSearchText(s.code) // Set the search text to the Product's code
    setFilteredProducts([]) // Clear the filtered Products list
    setShowDropdown(false) // Hide the dropdown after selection
    if (onProductChange) onProductChange(s) // Trigger the callback if provided
  }

  // Close the dropdown if a click occurs outside the wrapper
  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setShowDropdown(false) // Close the dropdown
    }
  }

  // UseEffect to listen for outside click events to close the dropdown
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside) // Clean up on component unmount
  }, [])

  // Function to handle changes in the other fields (name, unit, address)
  const handleChange = (field: keyof ProductData, value: string) => {
    const updatedProduct = { ...Product, [field]: value }
    setProduct(updatedProduct) // Update the Product state
    if (onProductChange) {
      onProductChange(updatedProduct) // Trigger the callback if provided
    }
  }

  // Keyboard navigation logic: navigate through the dropdown using arrow keys
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)

  // Handle keyboard events for arrow keys and enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex(prev => Math.min(filteredProducts.length - 1, prev + 1)) // Move down the list
    }
    if (e.key === "ArrowUp") {
      setHighlightedIndex(prev => Math.max(0, prev - 1)) // Move up the list
    }
    if (e.key === "Enter" && highlightedIndex >= 0) {
      handleSelectProduct(filteredProducts[highlightedIndex]) // Select the highlighted Product on Enter
    }
  }

  // Show the dropdown when the input is focused (clicking the input shows the dropdown)
  const handleFocus = () => {
    setShowDropdown(true) // Show the dropdown when the input field is focused
  }

  // Auto-scroll to the highlighted item when it changes
  useEffect(() => {
    if (highlightedIndex >= 0 && dropdownRef.current) {
      const highlightedElement = dropdownRef.current.children[highlightedIndex] as HTMLElement
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          behavior: "smooth", // Smooth scrolling to the highlighted item
          block: "nearest",  // Align the item to the nearest edge
        })
      }
    }
  }, [highlightedIndex]) // Trigger this effect when the highlighted index changes

  return (
    <div className="card card-dashed" ref={wrapperRef}>
      <div className="card-body">
        <div className="mb-3 position-relative">
          <div className="d-flex align-items-center gap-2" style={{ marginBottom: "0px" }}>
            <label htmlFor="Product-code" className="form-label mb-0" style={{ width: "120px", whiteSpace: "nowrap" }} >
              Sản phẩm
            </label>
            {/* Mã nhà cung cấp input */}
            <input
              type="text"
              className="form-control"
              id="Product-code"
              placeholder="Search here"
              value={searchText}
              onChange={(e) => handleFilter(e.target.value)} // Filter Products when input changes
              onKeyDown={handleKeyDown} // Handle keyboard navigation
              onFocus={handleFocus} // Show dropdown on focus
              style={{ width: "150px" }}
            />
            {/* Tên nhà cung cấp input */}
            <input
              type="text"
              className="form-control flex-grow-1"
              id="Product-name"
              placeholder=""
              value={Product.name}
              onChange={(e) => handleChange("name", e.target.value)} // Update Product name
            />
          </div>

          {showDropdown && (
            <ul
              className="list-group position-absolute mt-1 shadow"
              ref={dropdownRef} // Reference to the dropdown for auto-scrolling
              style={{
                zIndex: 1000,
                width: "calc(100% - 100px)",
                marginLeft: "100px",
                maxHeight: "200px", // Set max height
                overflowY: "auto", // Enable scroll when list is too long
              }}
            >
              {loading ? (
                <li className="list-group-item text-center">Đang tải...</li> // Show loading state
              ) : (
                filteredProducts.map((s, index) => (
                  <li
                    key={s.code}
                    className={`list-group-item list-group-item-action ${index === highlightedIndex ? 'bg-info' : ''}`}
                    style={{ cursor: "pointer", fontSize: "0.9rem" }}
                    onClick={() => handleSelectProduct(s)} // Select item on click
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 2fr 3fr", gap: "10px" }}>
                      <div><strong>{s.code}</strong></div>
                      <div>{s.name}</div>
                      <div>{s.unit}</div>
                      <div>{s.address}</div>
                    </div>
                  </li>
                ))
              )}
              {filteredProducts.length === 0 && !loading && (
                <li className="list-group-item text-muted">Vui lòng gợi ý thông tin</li> // Display message if no Products found
              )}
            </ul>
          )}
        </div>

        <div className="d-flex align-items-center gap-2" style={{ marginBottom: "0px" }}>
          {/* Mã số thuế input */}
          <input
            type="text"
            className="form-control"
            id="Product-tax"
            placeholder=""
            value={Product.unit}
            onChange={(e) => handleChange("unit", e.target.value)} // Update Product tax ID
            style={{ width: "170px" }}
          />
          {/* Địa chỉ input */}
          <input
            type="text"
            className="form-control flex-grow-1"
            id="Product-address"
            placeholder=""
            value={Product.address}
            onChange={(e) => handleChange("address", e.target.value)} // Update Product address
          />
          <input
            type="number"
            className="form-control"
            id="quantity"
            placeholder="Số lượng nhập"
            style={{ width: "100px" }}
          />
          <input
            type="number"
            className="form-control"
            id="unitPrice"
            placeholder="Đơn giá"
            style={{ width: "150px" }}
          />
        </div>
      </div>
    </div>
  )
}
