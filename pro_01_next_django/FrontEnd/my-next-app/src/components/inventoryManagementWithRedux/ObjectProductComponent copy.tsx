"use client";

// Import React hook
import { useEffect, useRef } from "react";
// Import các action từ Redux slice quản lý sản phẩm
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
} from "../../features/formReceiptSlip/objectProductComponentSlice";
// Custom hooks đã được typed sẵn từ store
import { useAppDispatch, useAppSelector } from "@/store/store";

// Kiểu dữ liệu sản phẩm xuất kho
interface InventoryItemExport {
  id: number;
  code: string;
  name: string;
  unit: string;
  quantity: number;
  price: number;
  value: number;
  notes: string;
}

// Props truyền vào component để callback khi dữ liệu sản phẩm thay đổi
interface ProductComponentProps {
  onProductChange?: (ProductProps: InventoryItemExport) => void;
}

export function ProductComponent({ onProductChange }: ProductComponentProps) {
  const dispatch = useAppDispatch();
  // Lấy state từ Redux
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
    inventoryItem,
  } = useAppSelector((state) => state.product);

  // In ra toàn bộ state khi component render hoặc khi state thay đổi
  useEffect(() => {
    console.log("ProductComponent State:", {
      inventoryItem,
    });
  }, [inventoryItem]);

  // Ref để theo dõi click bên ngoài và dropdown
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch danh sách sản phẩm khi component được mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Timeout để debounce người dùng gõ: người dùng gõ liên tục thì khoan tìm, ngừng gõ mới tìm
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Hàm xử lý khi người dùng nhập vào ô tìm kiếm sản phẩm
  const handleFilter = (text: string) => {
    // Cập nhật state tìm kiếm trong Redux Store
    dispatch(setSearchText(text));
    // Nếu đang có timeout từ lần nhập trước, thì clear để tránh gọi API/lọc nhiều lần
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    // Tạo timeout mới (debounce) để chỉ lọc sau khi người dùng ngừng gõ 300ms
    debounceTimeout.current = setTimeout(() => {
      // Gửi action để lọc sản phẩm theo text
      dispatch(filterProducts(text));
    }, 300);
  };

  // Hàm xử lý khi người dùng chọn một sản phẩm từ danh sách
  const handleSelectProduct = (selectedItem: typeof Product) => {
    // Gửi action để cập nhật sản phẩm đã chọn vào Redux Store
    dispatch(selectProduct(selectedItem));
    // Nếu có hàm callback từ component cha, gọi callback và truyền inventoryItem
    if (onProductChange) {
      // Sử dụng inventoryItem từ state hiện tại
      console.log("Sending product to onProductChange (select):", inventoryItem);
      onProductChange(inventoryItem);
    }
  };

  // Đóng dropdown khi click bên ngoài component
  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      inputRef.current &&
      !inputRef.current.contains(event.target as Node) // Không đóng nếu click vào input
    ) {
      console.log("Closing dropdown due to click outside");
      dispatch(setShowDropdown(false));
    }
  };

  // Thêm và gỡ sự kiện click bên ngoài component
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Xử lý điều hướng bằng phím (lên, xuống, enter)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      dispatch(setHighlightedIndex(Math.min(filteredProducts.length - 1, highlightedIndex + 1)));
    }
    if (e.key === "ArrowUp") {
      dispatch(setHighlightedIndex(Math.max(0, highlightedIndex - 1)));
    }
    if (e.key === "Enter" && highlightedIndex >= 0) {
      console.log("Enter key pressed, selecting:", filteredProducts[highlightedIndex]);
      handleSelectProduct(filteredProducts[highlightedIndex]);
    }
  };

  // Hiển thị dropdown khi người dùng focus ô tìm kiếm
  const handleFocusProductCode = () => {
    dispatch(setShowDropdown(true));
  };

  // Auto scroll tới item đang được highlight
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

  // Xử lý thay đổi số lượng
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setQuantity(value));
    if (onProductChange) {
      // Sử dụng inventoryItem từ state hiện tại
      console.log("Sending product to onProductChange (quantity):", inventoryItem);
      onProductChange(inventoryItem);
    }
  };

  // Xử lý thay đổi đơn giá
  const handleUnitPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setUnitPrice(value));
    if (onProductChange) {
      // Sử dụng inventoryItem từ state hiện tại
      console.log("Sending product to onProductChange (price):", inventoryItem);
      onProductChange(inventoryItem);
    }
  };

  // Xử lý thay đổi ghi chú
  const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setNotes(value));
    if (onProductChange) {
      // Sử dụng inventoryItem từ state hiện tại
      console.log("Sending product to onProductChange (notes):", inventoryItem);
      onProductChange(inventoryItem);
    }
  };

  return (
    <div className="card" ref={wrapperRef}>
      <div className="card-body py-2">
        {/* Dòng nhập sản phẩm */}
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
              value={Product?.name || ""}
              readOnly
            />
          </div>

          {/* Dropdown danh sách sản phẩm gợi ý */}
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
              onClick={(e) => console.log("Dropdown container clicked, target:", e.target)}
            >
              {loading ? (
                <li className="list-group-item text-center">Đang tải...</li>
              ) : (
                filteredProducts.map((s, index) => (
                  <li
                    key={s.code}
                    className={`list-group-item list-group-item-action ${index === highlightedIndex ? "bg-info" : ""}`}
                    style={{ cursor: "pointer", fontSize: "0.9rem" }}
                    onClick={() => {
                      console.log("Dropdown item clicked:", s);
                      handleSelectProduct(s);
                      dispatch(setShowDropdown(false));
                    }}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr 1fr", gap: "10px" }}>
                      <div><span>{s.code}</span></div>
                      <div><span>{s.name}</span></div>
                      <div><span>{s.unit}</span></div>
                    </div>
                  </li>
                ))
              )}
              {/* Trường hợp không tìm thấy sản phẩm */}
              {filteredProducts.length === 0 && !loading && (
                <li className="list-group-item text-muted">Vui lòng gợi ý thông tin</li>
              )}
            </ul>
          )}
        </div>

        {/* Dòng nhập thông tin sản phẩm */}
        <div className="row mb-1 g-1">
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              id="Product-unit"
              placeholder="đvt"
              autoComplete="off"
              value={Product?.unit || ""}
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