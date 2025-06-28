"use client"

import { useState, useRef, useEffect } from "react"
import { API_search_supplier_categories } from '@/api/api';

interface SupplierData {
  code: string;
  name: string;
  taxId: string;
  address: string;
}

interface ApiSupplier {
  ma_nha_cung_cap: string;
  ten_nha_cung_cap: string;
  mst: string;
  dia_chi: string;
}

interface SupplierComponentProps {
  onSupplierChange?: (Supplier: SupplierData) => void
}

export function SupplierComponent({ onSupplierChange }: SupplierComponentProps) {
  // State variables to manage Supplier data, search input, and filtered Suppliers
  const [Supplier, setSupplier] = useState<SupplierData>({
    code: "",
    name: "",
    taxId: "",
    address: "",
  })
  const [searchText, setSearchText] = useState("") // The search text entered by the user
  const [filteredSuppliers, setFilteredSuppliers] = useState<SupplierData[]>([]) // Filtered list of Suppliers based on search text
  const [showDropdown, setShowDropdown] = useState(false) // Flag to toggle dropdown visibility
  const [loading, setLoading] = useState(false) // Loading state to show spinner when filtering

  const wrapperRef = useRef<HTMLDivElement>(null) // Reference to the wrapper for outside click detection
  const dropdownRef = useRef<HTMLUListElement>(null) // Reference to the dropdown list for scroll control

  // Debounce logic to delay the filter operation after user stops typing
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  // Filter function that is triggered when user types in the search box
  const handleFilter = async (text: string) => {
    setSearchText(text);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_search_supplier_categories}?q=${encodeURIComponent(text)}&model_key=TB`);
        const data = await res.json();
        const filtered: SupplierData[] = (data.results || []).map((item: ApiSupplier) => ({
          code: item.ma_nha_cung_cap,
          name: item.ten_nha_cung_cap,
          taxId: item.mst,
          address: item.dia_chi,
        }));
        setFilteredSuppliers(filtered);
      } catch {
        setFilteredSuppliers([]);
      }
      setLoading(false);
      setShowDropdown(true);
    }, 300);
  }

  // Handle selection of a Supplier from the dropdown
  const handleSelectSupplier = (s: SupplierData) => {
    setSupplier(s) // Set the selected Supplier in the state
    setSearchText(s.code) // Set the search text to the Supplier's code
    setFilteredSuppliers([]) // Clear the filtered Suppliers list
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
    const updatedSupplier = { ...Supplier, [field]: value }
    setSupplier(updatedSupplier) // Update the Supplier state
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
      handleSelectSupplier(filteredSuppliers[highlightedIndex]) // Select the highlighted Supplier on Enter
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
            <label htmlFor="Supplier-code" className="form-label mb-0" style={{ width: "120px", whiteSpace: "nowrap" }} >
              Nhà cung cấp
            </label>
            {/* Mã khách hàng input */}
            <input
              type="text"
              className="form-control"
              id="Supplier-code"
              placeholder="Search here"
              autoComplete="off"
              value={searchText}
              onChange={(e) => handleFilter(e.target.value)} // Filter Suppliers when input changes
              onKeyDown={handleKeyDown} // Handle keyboard navigation
              onFocus={handleFocus} // Show dropdown on focus
              style={{ width: "150px" }}
            />
            {/* Tên khách hàng input */}
            <input
              type="text"
              className="form-control flex-grow-1"
              id="Supplier-name"
              placeholder="tên đối tượng"
              value={Supplier.name}
              onChange={(e) => handleChange("name", e.target.value)} // Update Supplier name
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
                    key={s.code || index}
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
                <li className="list-group-item text-muted">Vui lòng gợi ý thông tin</li> // Display message if no Suppliers found
              )}
            </ul>
          )}
        </div>

        <div className="d-flex align-items-center gap-1" style={{ marginBottom: "0px" }}>
          {/* Mã số thuế input */}
          <input
            type="text"
            className="form-control"
            id="Supplier-tax"
            placeholder="mst"
            value={Supplier.taxId}
            onChange={(e) => handleChange("taxId", e.target.value)} // Update Supplier tax ID
            style={{ width: "170px" }}
          />
          {/* Địa chỉ input */}
          <input
            type="text"
            className="form-control flex-grow-1"
            id="Supplier-address"
            placeholder="địa chỉ"
            value={Supplier.address}
            onChange={(e) => handleChange("address", e.target.value)} // Update Supplier address
          />
        </div>
      </div>
    </div>
  )
}
