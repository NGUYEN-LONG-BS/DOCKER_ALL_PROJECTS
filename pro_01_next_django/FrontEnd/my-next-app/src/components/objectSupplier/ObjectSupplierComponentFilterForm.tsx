// src/components/inventoryManagementWithRedux/ObjectSupplierComponent.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSupplier } from "../../features/formReceiptSlip/supplierSlice"; // Import from supplierSlice
import { RootState } from "../../store/store";

interface SupplierData {
  code: string;
  name: string;
  taxId: string;
  address: string;
}

interface SupplierComponentProps {
  onSupplierChange?: (supplier: SupplierData) => void;
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
];

export function SupplierComponent({ onSupplierChange }: SupplierComponentProps) {
  const dispatch = useDispatch();
  // Retrieve supplier from Redux store
  const supplier = useSelector((state: RootState) => state.supplier.supplier);
  
  // Local state for UI concerns
  const [searchText, setSearchText] = useState(supplier.code); // Initialize with supplier code from Redux
  const [filteredSuppliers, setFilteredSuppliers] = useState<SupplierData[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Sync searchText with supplier.code when supplier changes
  useEffect(() => {
    setSearchText(supplier.code);
  }, [supplier.code]);

  // Filter suppliers based on search input
  const handleFilter = (text: string) => {
    setSearchText(text);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setLoading(true);
      const filtered = mockSuppliers.filter(
        (s) =>
          s.code.toLowerCase().includes(text.toLowerCase()) ||
          s.name.toLowerCase().includes(text.toLowerCase()) ||
          s.taxId.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredSuppliers(filtered);
      setLoading(false);
      setShowDropdown(true);
    }, 300);
  };

  // Handle supplier selection
  const handleSelectSupplier = (s: SupplierData) => {
    dispatch(setSupplier(s)); // Update Redux store
    setSearchText(s.code);
    setFilteredSuppliers([]);
    setShowDropdown(false);
    setHighlightedIndex(-1);
    if (onSupplierChange) onSupplierChange(s);
  };

  // Handle changes to supplier fields (name, taxId, address)
    const handleChange = (field: keyof SupplierData, value: string) => {
      const updatedSupplier = { ...supplier, [field]: value };
      dispatch(setSupplier(updatedSupplier)); // Update Redux store
      if (onSupplierChange) onSupplierChange(updatedSupplier);
    };

  // Close dropdown on outside click
  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setShowDropdown(false);
      setHighlightedIndex(-1);
    }
  };

  // Add/remove outside click listener
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault(); // Prevent cursor movement in input
      setHighlightedIndex((prev) => Math.min(filteredSuppliers.length - 1, prev + 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault(); // Prevent cursor movement in input
      setHighlightedIndex((prev) => Math.max(-1, prev - 1));
    }
    if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault(); // Prevent form submission
      handleSelectSupplier(filteredSuppliers[highlightedIndex]);
    }
  };

  // Show dropdown on input focus
  const handleFocus = () => {
    setShowDropdown(true);
  };

  // Auto-scroll to highlighted item
  useEffect(() => {
    if (highlightedIndex >= 0 && dropdownRef.current) {
      const highlightedElement = dropdownRef.current.children[highlightedIndex] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [highlightedIndex]);

  return (
    <div className="card" ref={wrapperRef}>
      <div className="card-body py-2">
        <div className="mb-1 position-relative">
          <div className="d-flex align-items-center gap-1" style={{ marginBottom: "0px" }}>
            <label htmlFor="supplier-code" className="form-label mb-0" style={{ width: "120px", whiteSpace: "nowrap" }}>
              Nhà cung cấp
            </label>
            {/* Mã nhà cung cấp input */}
            <input
              type="text"
              className="form-control"
              id="supplier-code"
              placeholder="Search here"
              autoComplete="off"
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
              autoComplete="off"
              value={supplier.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          {showDropdown && (
            <ul
              className="list-group position-absolute mt-1 shadow"
              ref={dropdownRef}
              style={{
                zIndex: 1000,
                width: "calc(100% - 0px)",
                marginLeft: "100px",
                maxHeight: "200px", // Set max height
                overflowY: "auto", // Enable scroll when list is too long
                gridTemplateColumns: "1fr 5fr 1fr 3fr", // Điều chỉnh số cột và kích thước cột (tỷ lệ)
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
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 5fr 1fr 3fr", gap: "10px" }}>
                      <div>
                        <strong>{s.code}</strong>
                      </div>
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
            autoComplete="off"
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
            autoComplete="off"
            value={supplier.address}
            onChange={(e) => handleChange("address", e.target.value)} // Update supplier address
          />
        </div>
      </div>
    </div>
  )
}
