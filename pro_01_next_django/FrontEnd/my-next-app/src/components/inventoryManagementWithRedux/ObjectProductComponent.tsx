"use client";

import { useEffect, useRef } from "react";
import {
  fetchProducts,
  filterProducts,
  selectProduct,
  setSearchText,
  setShowDropdown,
  setHighlightedIndex,
  setQuantity,
  setUnitPrice,
  setNotes,
} from "../../features/product/productSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

interface InventoryItemExport {
  id: number;
  code: string;
  name: string;
  unit: string;
  quantity: number;
  price: number;
  notes: string;
}

interface ProductComponentProps {
  onProductChange?: (ProductProps: InventoryItemExport) => void;
}

export function ProductComponent({ onProductChange }: ProductComponentProps) {
  const dispatch = useAppDispatch();
  const {
    Product,
    searchText,
    filteredProducts,
    showDropdown,
    loading,
    quantity,
    unitPrice,
    value,
    notes,
    highlightedIndex,
    mockProducts,
    inventoryItem,
  } = useAppSelector((state) => state.product);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Debounce logic for filtering
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleFilter = (text: string) => {
    console.log(text)
    dispatch(setSearchText(text));
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      dispatch(filterProducts(text));
    }, 300);
  };

  // Handle product selection
  const handleSelectProduct = (selectedItem: typeof Product) => {
    dispatch(selectProduct(selectedItem));
    if (onProductChange) {
      onProductChange(inventoryItem);
    }
  };

  // Handle outside click to close dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      dispatch(setShowDropdown(false));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      dispatch(setHighlightedIndex(Math.min(filteredProducts.length - 1, highlightedIndex + 1)));
    }
    if (e.key === "ArrowUp") {
      dispatch(setHighlightedIndex(Math.max(0, highlightedIndex - 1)));
    }
    if (e.key === "Enter" && highlightedIndex >= 0) {
      handleSelectProduct(filteredProducts[highlightedIndex]);
    }
  };

  // Show dropdown on focus
  const handleFocusProductCode = () => {
    dispatch(setShowDropdown(true));
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

  // Handle quantity change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setQuantity(value));
    if (onProductChange) {
      const updatedProduct = { ...inventoryItem, quantity: parseFloat(value.replace(/\./g, "")) || 0 };
      onProductChange(updatedProduct);
    }
  };

  // Handle unit price change
  const handleUnitPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setUnitPrice(value));
    if (onProductChange) {
      const updatedProduct = { ...inventoryItem, price: parseFloat(value.replace(/\./g, "")) || 0 };
      onProductChange(updatedProduct);
    }
  };

  // Handle notes change
  const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setNotes(value));
    if (onProductChange) {
      const updatedProduct = { ...inventoryItem, notes: value };
      onProductChange(updatedProduct);
    }
  };

  return (
    <div className="card" ref={wrapperRef}>
      <div className="card-body py-2">
        <div className="mb-1 position-relative">
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
              onFocus={handleFocusProductCode}
              style={{ width: "150px" }}
            />
            <input
              type="text"
              className="form-control flex-grow-1"
              id="Product-name"
              placeholder="tên hàng"
              value={Product?.name}
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
                gridTemplateColumns: "2fr 3fr 1fr",
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
                    <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr 1fr", gap: "10px" }}>
                      <div><span>{s.code}</span></div>
                      <div><span>{s.name}</span></div>
                      <div><span>{s.unit}</span></div>
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
              id="Product-unit"
              placeholder="đvt"
              value={Product?.unit}
              readOnly
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              id="quantity"
              placeholder="số lượng"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              id="unitPrice"
              placeholder="đơn giá"
              value={unitPrice}
              onChange={handleUnitPriceChange}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              id="value"
              placeholder="giá trị"
              value={value}
              readOnly
            />
          </div>
        </div>

        <div className="row mb-1">
          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              id="Product-notes"
              placeholder="ghi chú sản phẩm"
              value={notes}
              onChange={handleNotesChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}