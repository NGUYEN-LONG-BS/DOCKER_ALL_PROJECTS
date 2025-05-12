// src/inventoryManagementWithRedux/ObjectProductComponent.tsx
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
} from "../../features/objectProductComponent/objectProductComponentSlice";
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

  useEffect(() => {
    console.log("Current Product State:", {
      Product,
      quantity,
      unitPrice,
      value,
      notes,
      inventoryItem,
    });
  }, [Product, 
    quantity, 
    unitPrice, 
    value, 
    notes, 
    inventoryItem]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleFilter = (text: string) => {
    dispatch(setSearchText(text));
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      dispatch(filterProducts(text));
    }, 300);
  };

  const handleSelectProduct = (selectedItem: typeof Product) => {
    dispatch(selectProduct(selectedItem));
    if (onProductChange) {
      onProductChange({ ...inventoryItem, code: selectedItem.code, name: selectedItem.name, unit: selectedItem.unit });
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      dispatch(setShowDropdown(false));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleFocusProductCode = () => {
    dispatch(setShowDropdown(true));
  };

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

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setQuantity(value));
    if (onProductChange && inventoryItem.code) { // Chỉ gọi nếu đã chọn sản phẩm
      const updatedProduct = { ...inventoryItem, quantity: parseFloat(value.replace(/\./g, "")) || 0 };
      onProductChange(updatedProduct);
    }
  };

  const handleUnitPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setUnitPrice(value));
    if (onProductChange && inventoryItem.code) {
      const updatedProduct = { ...inventoryItem, price: parseFloat(value.replace(/\./g, "")) || 0 };
      onProductChange(updatedProduct);
    }
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setNotes(value));
    if (onProductChange && inventoryItem.code) {
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
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
              value={quantity}
              onChange={handleQuantityChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
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
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
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
                if (e.key === 'Enter') {
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