"use client"

import { useState, useRef, useEffect } from "react"

interface SupplierData {
  code: string
  name: string
  taxId: string
  address: string
}

interface SupplierComponentProps {
  onSupplierChange?: (supplier: SupplierData) => void
}

const mockSuppliers: SupplierData[] = [
  { code: "SUP001", name: "Công ty A", taxId: "0123456789", address: "Hà Nội" },
  { code: "SUP002", name: "Công ty B", taxId: "0987654321-001", address: "TP.HCM" },
  { code: "SUP003", name: "Công ty C", taxId: "0456123789", address: "Đà Nẵng" },
  { code: "SUP004", name: "Nhà máy D", taxId: "0654789321", address: "Cần Thơ" },
  { code: "SUP005", name: "Công ty A", taxId: "0123456789-002", address: "Hà Nội" },
  { code: "SUP006", name: "Công ty B", taxId: "0987654321", address: "TP.HCM" },
  { code: "SUP007", name: "Công ty C", taxId: "0456123789-001", address: "Đà Nẵng" },
  { code: "SUP008", name: "Nhà máy D", taxId: "0654789321-002", address: "Cần Thơ" },
]

export function SupplierComponent({ onSupplierChange }: SupplierComponentProps) {
  // State variables to manage supplier data, search input, and filtered suppliers
  const [supplier, setSupplier] = useState<SupplierData>({
    code: "",
    name: "",
    taxId: "",
    address: "",
  })
  const [searchText, setSearchText] = useState("") // The search text entered by the user
  const [filteredSuppliers, setFilteredSuppliers] = useState<SupplierData[]>([]) // Filtered list of suppliers based on search text
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
      const filtered = mockSuppliers.filter(
        s =>
          s.code.toLowerCase().includes(text.toLowerCase()) || // Filter by code
          s.name.toLowerCase().includes(text.toLowerCase()) || // Filter by name
          s.taxId.toLowerCase().includes(text.toLowerCase()) // Filter by tax ID
      )
      setFilteredSuppliers(filtered) // Set the filtered list of suppliers
      setLoading(false) // Hide loading spinner after filtering
      setShowDropdown(true) // Show the dropdown when there are filtered results
    }, 300) // Delay the filter action by 300ms
  }

  // Handle selection of a supplier from the dropdown
  const handleSelectSupplier = (s: SupplierData) => {
    setSupplier(s) // Set the selected supplier in the state
    setSearchText(s.code) // Set the search text to the supplier's code
    setFilteredSuppliers([]) // Clear the filtered suppliers list
    setShowDropdown(false) // Hide the dropdown after selection
    if (onSupplierChange) onSupplierChange(s) // Trigger the callback if provided
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

  // Function to handle changes in the other fields (name, taxId, address)
  const handleChange = (field: keyof SupplierData, value: string) => {
    const updatedSupplier = { ...supplier, [field]: value }
    setSupplier(updatedSupplier) // Update the supplier state
    if (onSupplierChange) {
      onSupplierChange(updatedSupplier) // Trigger the callback if provided
    }
  }

  // Keyboard navigation logic: navigate through the dropdown using arrow keys
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)

  // Handle keyboard events for arrow keys and enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex(prev => Math.min(filteredSuppliers.length - 1, prev + 1)) // Move down the list
    }
    if (e.key === "ArrowUp") {
      setHighlightedIndex(prev => Math.max(0, prev - 1)) // Move up the list
    }
    if (e.key === "Enter" && highlightedIndex >= 0) {
      handleSelectSupplier(filteredSuppliers[highlightedIndex]) // Select the highlighted supplier on Enter
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
    <div className="card" ref={wrapperRef}>
      <div className="card-body py-2">
        <div className="mb-1 position-relative">
          <div className="d-flex align-items-center gap-1" style={{ marginBottom: "0px" }}>
            <label htmlFor="supplier-code" className="form-label mb-0" style={{ width: "120px", whiteSpace: "nowrap" }} >
              Nhà cung cấp
            </label>
            {/* Mã nhà cung cấp input */}
            <input
              type="text"
              className="form-control"
              id="supplier-code"
              placeholder="Search here"
              value={searchText}
              onChange={(e) => handleFilter(e.target.value)} // Filter suppliers when input changes
              onKeyDown={handleKeyDown} // Handle keyboard navigation
              onFocus={handleFocus} // Show dropdown on focus
              style={{ width: "150px" }}
            />
            {/* Tên nhà cung cấp input */}
            <input
              type="text"
              className="form-control flex-grow-1"
              id="supplier-name"
              placeholder="tên đối tượng"
              value={supplier.name}
              onChange={(e) => handleChange("name", e.target.value)} // Update supplier name
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
                filteredSuppliers.map((s, index) => (
                  <li
                    key={s.code}
                    className={`list-group-item list-group-item-action ${index === highlightedIndex ? 'bg-info' : ''}`}
                    style={{ cursor: "pointer", fontSize: "0.9rem" }}
                    onClick={() => handleSelectSupplier(s)} // Select item on click
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 2fr 3fr", gap: "10px" }}>
                      <div><strong>{s.code}</strong></div>
                      <div>{s.name}</div>
                      <div>{s.taxId}</div>
                      <div>{s.address}</div>
                    </div>
                  </li>
                ))
              )}
              {filteredSuppliers.length === 0 && !loading && (
                <li className="list-group-item text-muted">Vui lòng gợi ý thông tin</li> // Display message if no suppliers found
              )}
            </ul>
          )}
        </div>

        <div className="d-flex align-items-center gap-1" style={{ marginBottom: "0px" }}>
          {/* Mã số thuế input */}
          <input
            type="text"
            className="form-control"
            id="supplier-tax"
            placeholder="mst"
            value={supplier.taxId}
            onChange={(e) => handleChange("taxId", e.target.value)} // Update supplier tax ID
            style={{ width: "170px" }}
          />
          {/* Địa chỉ input */}
          <input
            type="text"
            className="form-control flex-grow-1"
            id="supplier-address"
            placeholder="địa chỉ"
            value={supplier.address}
            onChange={(e) => handleChange("address", e.target.value)} // Update supplier address
          />
        </div>
      </div>
    </div>
  )
}
