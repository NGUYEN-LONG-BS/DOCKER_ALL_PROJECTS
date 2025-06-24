// SearchInventoryComponentOnInputForm.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import * as Utils from '@/utils';

interface InventoryItem {
  ma_hang: string;
  ten_hang: string;
  dvt: string;
}

interface ProductComponentProps {
  onProductChange?: (ProductProps: InventoryItem & { quantity: string; unitPrice: string; value: string; notes: string }) => void;
}

const API_SEARCH_INVENTORY = "http://localhost:8000/api/search-inventory-categories/";

export function ProductComponent({ onProductChange }: ProductComponentProps) {
  const [searchText, setSearchText] = useState("");
  const [product, setProduct] = useState<InventoryItem>({ ma_hang: "", ten_hang: "", dvt: "" });
  const [filteredProducts, setFilteredProducts] = useState<InventoryItem[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [value, setValue] = useState("");
  const [notes, setNotes] = useState("");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Tính lại giá trị khi quantity hoặc unitPrice thay đổi
  useEffect(() => {
    const q = parseFloat(quantity.replace(/,/g, ""));
    const p = parseFloat(unitPrice.replace(/,/g, ""));
    if (!isNaN(q) && !isNaN(p)) {
      setValue(Utils.formatNumber((q * p).toString()));
    } else {
      setValue("");
    }
  }, [quantity, unitPrice]);

  // Fetch products from API when user types
  const handleFilter = (text: string) => {
    setSearchText(text);
    setProduct((prev) => ({ ...prev, ma_hang: text }));
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(async () => {
      if (!text) {
        setFilteredProducts([]);
        setShowDropdown(false);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`${API_SEARCH_INVENTORY}?q=${encodeURIComponent(text)}&model_key=TB`);
        const data = await res.json();
        setFilteredProducts(data.results || []);
        setShowDropdown(true);
      } catch {
        setFilteredProducts([]);
        setShowDropdown(false);
      }
      setLoading(false);
    }, 300);
  };

  // Select product from dropdown
  const handleSelectProduct = (item: InventoryItem) => {
    setProduct(item);
    setSearchText(item.ma_hang);
    setShowDropdown(false);
    setFilteredProducts([]);
    setQuantity("");
    setUnitPrice("");
    setValue("");
    setNotes("");
    if (onProductChange) onProductChange({ ...item, quantity: "", unitPrice: "", value: "", notes: "" });
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") setHighlightedIndex((prev) => Math.min(filteredProducts.length - 1, prev + 1));
    if (e.key === "ArrowUp") setHighlightedIndex((prev) => Math.max(0, prev - 1));
    if (e.key === "Enter" && highlightedIndex >= 0) handleSelectProduct(filteredProducts[highlightedIndex]);
  };

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-scroll to highlighted item
  useEffect(() => {
    if (highlightedIndex >= 0 && dropdownRef.current) {
      const el = dropdownRef.current.children[highlightedIndex] as HTMLElement;
      if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [highlightedIndex]);

  // Xử lý thay đổi số lượng
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    setQuantity(value);
    if (onProductChange) onProductChange({ ...product, quantity: value, unitPrice, value, notes });
  };
  const handleQuantityBlur = () => {
    const formattedValue = Utils.formatNumber(quantity);
    setQuantity(formattedValue);
    if (onProductChange) onProductChange({ ...product, quantity: formattedValue, unitPrice, value, notes });
  };

  // Xử lý thay đổi đơn giá
  const handleUnitPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    setUnitPrice(value);
    if (onProductChange) onProductChange({ ...product, quantity, unitPrice: value, value, notes });
  };
  const handleUnitPriceBlur = () => {
    const formattedValue = Utils.formatNumber(unitPrice);
    setUnitPrice(formattedValue);
    if (onProductChange) onProductChange({ ...product, quantity, unitPrice: formattedValue, value, notes });
  };

  // Xử lý thay đổi ghi chú
  const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueNote = e.target.value;
    setNotes(valueNote);
    if (onProductChange) onProductChange({ ...product, quantity, unitPrice, value, notes: valueNote });
  };

  return (
    <div className="card" ref={wrapperRef}>
      <div className="card-body py-2">
        <div className="mb-1 position-relative">
          <div className="d-flex align-items-center gap-2" style={{ marginBottom: "0px" }}>
            <label htmlFor="ma_hang" className="form-label mb-0" style={{ width: "120px", whiteSpace: "nowrap" }}>
              Sản phẩm
            </label>
            <input
              type="text"
              className="form-control"
              id="ma_hang"
              placeholder="Search here"
              autoComplete="off"
              value={searchText}
              onChange={(e) => handleFilter(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowDropdown(true)}
              style={{ width: "150px" }}
            />
            <input
              type="text"
              className="form-control flex-grow-1"
              id="ten_hang"
              placeholder="tên hàng"
              autoComplete="off"
              value={product.ten_hang}
              readOnly
            />
          </div>
          {showDropdown && (
            <ul
              className="list-group position-absolute mt-1 shadow"
              ref={dropdownRef}
              style={{
                zIndex: 1000,
                width: "calc(100% - 50px)",
                marginLeft: "100px",
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              {loading ? (
                <li className="list-group-item text-center">Đang tải...</li>
              ) : (
                filteredProducts.map((item, idx) => (
                  <li
                    key={item.ma_hang}
                    className={`list-group-item list-group-item-action ${idx === highlightedIndex ? "bg-info" : ""}`}
                    style={{ cursor: "pointer", fontSize: "0.9rem" }}
                    onClick={() => handleSelectProduct(item)}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr 1fr", gap: "10px" }}>
                      <div><span>{item.ma_hang}</span></div>
                      <div><span>{item.ten_hang}</span></div>
                      <div><span>{item.dvt}</span></div>
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
        <div className="row mb-1 g-1">
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              id="dvt"
              placeholder="đvt"
              autoComplete="off"
              value={product.dvt}
              readOnly
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              id="quantity"
              placeholder="số lượng"
              autoComplete="off"
              value={quantity}
              onChange={handleQuantityChange}
              onBlur={handleQuantityBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              id="unitPrice"
              placeholder="đơn giá"
              autoComplete="off"
              value={unitPrice}
              onChange={handleUnitPriceChange}
              onBlur={handleUnitPriceBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              id="value"
              placeholder="giá trị"
              autoComplete="off"
              value={value}
              readOnly
            />
          </div>
        </div>
        {/* Ghi chú sản phẩm */}
        <div className="row mb-1">
          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              id="Product-notes"
              placeholder="ghi chú sản phẩm"
              autoComplete="off"
              value={notes}
              onChange={handleNotesChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}