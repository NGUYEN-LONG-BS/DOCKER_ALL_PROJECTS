"use client"

import { useState, useRef, useEffect } from "react"

interface ClientData {
  code: string
  name: string
  taxId: string
  address: string
}

interface ClientComponentProps {
  onClientChange?: (Client: ClientData) => void
}

const mockClients: ClientData[] = [
  { code: "CLI001", name: "Công ty A", taxId: "0123456789", address: "Hà Nội" },
  { code: "CLI002", name: "Công ty B", taxId: "0987654321-001", address: "TP.HCM" },
  { code: "CLI003", name: "Công ty C", taxId: "0456123789", address: "Đà Nẵng" },
  { code: "CLI004", name: "Nhà máy D", taxId: "0654789321", address: "Cần Thơ" },
  { code: "CLI005", name: "Công ty A", taxId: "0123456789-002", address: "Hà Nội" },
  { code: "CLI006", name: "Công ty B", taxId: "0987654321", address: "TP.HCM" },
  { code: "CLI007", name: "Công ty C", taxId: "0456123789-001", address: "Đà Nẵng" },
  { code: "CLI008", name: "Nhà máy D", taxId: "0654789321-002", address: "Cần Thơ" },
]

export function ClientComponent({ onClientChange }: ClientComponentProps) {
  // State variables to manage Client data, search input, and filtered Clients
  const [Client, setClient] = useState<ClientData>({
    code: "",
    name: "",
    taxId: "",
    address: "",
  })
  const [searchText, setSearchText] = useState("") // The search text entered by the user
  const [filteredClients, setFilteredClients] = useState<ClientData[]>([]) // Filtered list of Clients based on search text
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
      const filtered = mockClients.filter(
        s =>
          s.code.toLowerCase().includes(text.toLowerCase()) || // Filter by code
          s.name.toLowerCase().includes(text.toLowerCase()) || // Filter by name
          s.taxId.toLowerCase().includes(text.toLowerCase()) // Filter by tax ID
      )
      setFilteredClients(filtered) // Set the filtered list of Clients
      setLoading(false) // Hide loading spinner after filtering
      setShowDropdown(true) // Show the dropdown when there are filtered results
    }, 300) // Delay the filter action by 300ms
  }

  // Handle selection of a Client from the dropdown
  const handleSelectClient = (s: ClientData) => {
    setClient(s) // Set the selected Client in the state
    setSearchText(s.code) // Set the search text to the Client's code
    setFilteredClients([]) // Clear the filtered Clients list
    setShowDropdown(false) // Hide the dropdown after selection
    if (onClientChange) onClientChange(s) // Trigger the callback if provided
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
  const handleChange = (field: keyof ClientData, value: string) => {
    const updatedClient = { ...Client, [field]: value }
    setClient(updatedClient) // Update the Client state
    if (onClientChange) {
      onClientChange(updatedClient) // Trigger the callback if provided
    }
  }

  // Keyboard navigation logic: navigate through the dropdown using arrow keys
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)

  // Handle keyboard events for arrow keys and enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex(prev => Math.min(filteredClients.length - 1, prev + 1)) // Move down the list
    }
    if (e.key === "ArrowUp") {
      setHighlightedIndex(prev => Math.max(0, prev - 1)) // Move up the list
    }
    if (e.key === "Enter" && highlightedIndex >= 0) {
      handleSelectClient(filteredClients[highlightedIndex]) // Select the highlighted Client on Enter
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
            <label htmlFor="Client-code" className="form-label mb-0" style={{ width: "120px", whiteSpace: "nowrap" }} >
              Khách hàng
            </label>
            {/* Mã khách hàng input */}
            <input
              type="text"
              className="form-control"
              id="Client-code"
              placeholder="Search here"
              autoComplete="off"
              value={searchText}
              onChange={(e) => handleFilter(e.target.value)} // Filter Clients when input changes
              onKeyDown={handleKeyDown} // Handle keyboard navigation
              onFocus={handleFocus} // Show dropdown on focus
              style={{ width: "150px" }}
            />
            {/* Tên khách hàng input */}
            <input
              type="text"
              className="form-control flex-grow-1"
              id="Client-name"
              placeholder="tên đối tượng"
              autoComplete="off"
              value={Client.name}
              onChange={(e) => handleChange("name", e.target.value)} // Update Client name
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
                filteredClients.map((s, index) => (
                  <li
                    key={s.code}
                    className={`list-group-item list-group-item-action ${index === highlightedIndex ? 'bg-info' : ''}`}
                    style={{ cursor: "pointer", fontSize: "0.9rem" }}
                    onClick={() => handleSelectClient(s)} // Select item on click
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
              {filteredClients.length === 0 && !loading && (
                <li className="list-group-item text-muted">Vui lòng gợi ý thông tin</li> // Display message if no Clients found
              )}
            </ul>
          )}
        </div>

        <div className="d-flex align-items-center gap-1" style={{ marginBottom: "0px" }}>
          {/* Mã số thuế input */}
          <input
            type="text"
            className="form-control"
            id="Client-tax"
            placeholder="mst"
            autoComplete="off"
            value={Client.taxId}
            onChange={(e) => handleChange("taxId", e.target.value)} // Update Client tax ID
            style={{ width: "170px" }}
          />
          {/* Địa chỉ input */}
          <input
            type="text"
            className="form-control flex-grow-1"
            id="Client-address"
            placeholder="địa chỉ"
            autoComplete="off"
            value={Client.address}
            onChange={(e) => handleChange("address", e.target.value)} // Update Client address
          />
        </div>
      </div>
    </div>
  )
}
