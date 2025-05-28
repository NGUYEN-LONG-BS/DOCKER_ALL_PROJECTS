"use client";

import { useState, useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { setSupplier, clearSupplier } from "@/features/formReceiptLog/supplierFilterFormSlice";
import type { SupplierFilter } from "@/features/formReceiptLog/supplierFilterFormSlice";

const mockSuppliers: SupplierFilter[] = [
  { code: "SUP001", name: "Công ty A", taxId: "0123456789", address: "Hà Nội" },
  { code: "SUP002", name: "Công ty B", taxId: "0987654321-001", address: "TP.HCM" },
  { code: "SUP003", name: "Công ty C", taxId: "0456123789", address: "Đà Nẵng" },
  { code: "SUP004", name: "Nhà máy D", taxId: "0654789321", address: "Cần Thơ" },
  { code: "SUP005", name: "Công ty E", taxId: "0123456789-002", address: "Hà Nội" },
];

export function SupplierComponentFilterForm() {
  const dispatch = useAppDispatch();
  const supplier = useAppSelector((state) => state.supplierFilterForm.supplier);

  const [searchText, setSearchText] = useState(supplier.code);
  const [filteredSuppliers, setFilteredSuppliers] = useState<SupplierFilter[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setSearchText(supplier.code);
  }, [supplier.code]);

  const handleFilter = (text: string) => {
    setSearchText(text);
    // if (text.trim() === "") {
    //   setFilteredSuppliers([]);
    //   setShowDropdown(false);
    //   dispatch(clearSupplier());
    //   return;
    // }
    const filtered = mockSuppliers.filter(
      (s) =>
        s.code.toLowerCase().includes(text.toLowerCase()) ||
        s.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSuppliers(filtered);
    setShowDropdown(true);
  };

  const handleSelectSupplier = (s: SupplierFilter) => {
    dispatch(setSupplier(s));
    setSearchText(s.code);
    setShowDropdown(false);
    setHighlightedIndex(-1);
  };

  const handleChange = (field: keyof SupplierFilter, value: string) => {
    const updatedSupplier = { ...supplier, [field]: value };
    dispatch(setSupplier(updatedSupplier));
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.min(filteredSuppliers.length - 1, prev + 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(-1, prev - 1));
    }
    if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelectSupplier(filteredSuppliers[highlightedIndex]);
    }
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
              onChange={(e) => handleFilter(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowDropdown(true)}
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
                width: "calc(100% - 120px)",
                marginLeft: "120px",
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              {filteredSuppliers.length > 0 ? (
                filteredSuppliers.map((s, index) => (
                  <li
                    key={s.code}
                    className={`list-group-item list-group-item-action ${index === highlightedIndex ? 'bg-info' : ''}`}
                    style={{ cursor: "pointer", fontSize: "0.9rem" }}
                    onClick={() => handleSelectSupplier(s)}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr 2fr", gap: "10px" }}>
                      <div>
                        <strong>{s.code}</strong>
                      </div>
                      <div>{s.name}</div>
                      <div style={{ display: "none" }}>{s.taxId}</div>
                      <div style={{ display: "none" }}>{s.address}</div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="list-group-item text-muted">Không tìm thấy nhà cung cấp</li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}