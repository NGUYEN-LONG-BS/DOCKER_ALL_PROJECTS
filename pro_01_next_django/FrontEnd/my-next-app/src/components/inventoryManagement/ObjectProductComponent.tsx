"use client"

import { useState, useRef, useEffect } from "react"

// Define InventoryItemExport interface if it's not imported from another file
interface InventoryItemExport { 
  id: number;
  code: string;
  name: string;
  unit: string;
  quantity: number;
  price: number;
  notes: string;
}

interface ProductData {
  code: string
  name: string
  unit: string
  
}

interface ProductComponentProps {
  onProductChange?: (ProductProps: InventoryItemExport) => void
}

// const mockProducts: ProductData[] = [
//   { code: "HH-01A-001", name: "Mặt hàng A1", unit: "cái" },
//   { code: "HH-01A-002", name: "Mặt hàng A2", unit: "chiếc" },
//   { code: "HH-01A-003", name: "Mặt hàng A3", unit: "thùng" },
//   { code: "HH-01A-004", name: "Mặt hàng A4", unit: "bộ" },
//   { code: "HH-01A-005", name: "Mặt hàng A5", unit: "kg" },
//   { code: "HH-01A-006", name: "Mặt hàng A6", unit: "m" },
//   { code: "HH-01A-007", name: "Mặt hàng A7", unit: "lít" },
//   { code: "HH-01A-008", name: "Mặt hàng A8", unit: "hộp" },
// ]

export function ProductComponent({ onProductChange }: ProductComponentProps) {
  // State variables to manage Product data, search input, and filtered Products
  const [Product, setProduct] = useState<ProductData>({
    code: "",
    name: "",
    unit: "",
  })

  const [inventoryItem, setInventoryItem] = useState<InventoryItemExport>({
    id: 0,
    code: "",
    name: "",
    unit: "",
    quantity: 0,
    price: 0,
    notes: "",
  });

  const [searchText, setSearchText] = useState("") // The search text entered by the user
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]) // Filtered list of Products based on search text
  const [showDropdown, setShowDropdown] = useState(false) // Flag to toggle dropdown visibility
  const [loading, setLoading] = useState(false) // Loading state to show spinner when filtering

  // State to manage quantity, price, and value
  const [quantity, setQuantity] = useState<string>("")
  const [unitPrice, setUnitPrice] = useState<string>("")
  const [formattedUnitPrice, setFormattedUnitPrice] = useState<string>("");
  const [value, setValue] = useState<string>("")
  const [notes, setNotes] = useState<string>("")

  const wrapperRef = useRef<HTMLDivElement>(null) // Reference to the wrapper for outside click detection
  const dropdownRef = useRef<HTMLUListElement>(null) // Reference to the dropdown list for scroll control
  const [mockProducts, setMockProducts] = useState<ProductData[]>([]); // State to store the fetched products

  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/get-inventory-categories/");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        // Map the data into the ProductData format
        const products: ProductData[] = data.map((item: { ma_hang: string, ten_hang: string, dvt: string }) => ({
          code: item.ma_hang,
          name: item.ten_hang,
          unit: item.dvt,
        }));
        setMockProducts(products); // Set the fetched products into state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the function to fetch data
  }, []); // Empty dependency array to run only once on component mount
  
  // Debounce logic to delay the filter operation after user stops typing
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  // Filter function that is triggered when user types in the search box
  const handleFilter = (text: string) => {
    console.log("handleFilter:")
    // cập nhật text vào searchText
    setSearchText(text)
    // Xóa timeout hiện tại nếu có: nếu người dùng đang gõ thì không tìm kiếm
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current) // Clear the previous timeout
    }

    // Trong vòng 300ms, nếu người dùng không gõ thì tìm kiếm
    debounceTimeout.current = setTimeout(() => {
      setLoading(true) // Show loading spinner while filtering
      const filtered = mockProducts.filter(
        s =>
          s.code.toLowerCase().includes(text.toLowerCase()) || // Filter by code
          s.name.toLowerCase().includes(text.toLowerCase())
      )
      setFilteredProducts(filtered) // Set the filtered list of Products
      setLoading(false) // Hide loading spinner after filtering
      setShowDropdown(true) // Show the dropdown when there are filtered results
    }, 300) // Delay the filter action by 300ms
  }

  // Handle selection of a Product from the dropdown
  const handleSelectProduct = (selectedItem: ProductData) => {
    console.log("handleSelectProduct:")
    setProduct(selectedItem) // Set the selected Product in the state
    setSearchText(selectedItem.code) // Set the search text to the Product's code
    setFilteredProducts([]) // Clear the filtered Products list
    setShowDropdown(false) // Hide the dropdown after selection
        
    // Reset quantity, unit price, and value when product is selected
    setQuantity("")
    setUnitPrice("")
    setValue("")
    setNotes("")
    console.log("handleSelectProduct:")
    console.log(selectedItem)
    if (onProductChange) 
      onProductChange(createInventoryItem(selectedItem)) // Trigger the callback if provided
  }

  // Close the dropdown if a click occurs outside the wrapper
  const handleClickOutside = (event: MouseEvent) => {
    console.log("handleClickOutside:")
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setShowDropdown(false) // Close the dropdown
    }
  }

  // UseEffect to listen for outside click events to close the dropdown
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside) // Clean up on component unmount
  }, [])

  // Function to handle changes in the other fields
  const handleChange = (field: keyof ProductData, value: string) => {
    console.log("handleChange:")
    const updatedProduct = {
      ...Product, 
      [field]: value }

    setProduct(updatedProduct) // Update the Product state
    if (onProductChange) {
      onProductChange(createInventoryItem(updatedProduct)) // Trigger the callback if provided
    }
    console.log("handleChange:", updatedProduct)
  }

  const handleProductChange = (newProductData: InventoryItemExport) => {
    setInventoryItem(newProductData);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value; // Lấy giá trị đơn giá từ input
    setQuantity(value); // Cập nhật giá trị đơn giá trong state
    updateValue(value, unitPrice) // Update value when unit price changes
    // Cập nhật InventoryItemExport sau khi thay đổi đơn giá
    if (onProductChange) {
      const updatedProduct = createInventoryItem(Product); // Tạo lại InventoryItemExport với thông tin hiện tại của sản phẩm
      updatedProduct.quantity = parseFloat(value.replace(/\./g, "")) || 0; // Cập nhật trường đơn giá trong InventoryItemExport
      onProductChange(updatedProduct); // Gọi callback để cập nhật thông tin sản phẩm
    }
  }

  const handleUnitPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value; // Lấy giá trị đơn giá từ input
    setUnitPrice(value); // Cập nhật giá trị đơn giá trong state
    updateValue(quantity, value) // Update value when unit price changes
    // Cập nhật InventoryItemExport sau khi thay đổi đơn giá
    if (onProductChange) {
      const updatedProduct = createInventoryItem(Product); // Tạo lại InventoryItemExport với thông tin hiện tại của sản phẩm
      updatedProduct.price = parseFloat(value.replace(/\./g, "")) || 0; // Cập nhật trường đơn giá trong InventoryItemExport
      onProductChange(updatedProduct); // Gọi callback để cập nhật thông tin sản phẩm
    }
  }

  // const handleUnitPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value; // Lấy giá trị đơn giá từ input

  //   // Nếu chứa chữ cái thì không làm gì
  //   if (/[a-zA-Z]/.test(value)) {
  //     return; // Không làm gì cả
  //   }

  //   // Nếu có dấu phẩy, cho phép người dùng nhập, nhưng xử lý và chuyển sang số đúng
  //   // Loại bỏ tất cả ký tự không phải số và dấu chấm (.) (không xóa dấu phẩy cho đến khi tính toán)
  //   const validValue = value.replace(/[^0-9,\.]/g, "");

  //   // Kiểm tra nếu số nhập có nhiều dấu chấm (.) hoặc dấu phẩy (,) không hợp lệ
  //   if (validValue.split(".").length > 2) {
  //     return; // Chặn không cho nhiều dấu chấm
  //   }

  //   // Đảm bảo rằng dấu phẩy chỉ xuất hiện trong phần phân cách hàng nghìn
  //   // Chuyển dấu phẩy thành dấu không gian tạm thời để xử lý phần phân tách số
  //   const noCommasValue = validValue.replace(/,/g, "");

  //   // Cập nhật giá trị đơn giá trong state
  //   setUnitPrice(noCommasValue); 

  //   // Update value when unit price changes
  //   updateValue(quantity, noCommasValue) 

  //   // chuyển chuỗi thành số
  //   // Kiểm tra nếu noCommasValue là chuỗi rỗng
  //   const numericValidValue = parseFloat(noCommasValue);
  //   const newValueTypeNumber = isNaN(numericValidValue) ? 0 : numericValidValue // Nếu không phải số, gán giá trị 0

  //   // // Kiểm tra nếu newValueTypeNumber là số hợp lệ với định dạng 123,456.78
  //   // const formattedValue = isNaN(newValueTypeNumber)
  //   // ? "0"
  //   // : new Intl.NumberFormat("en-US", {
  //   //     style: "decimal",
  //   //     maximumFractionDigits: 2,
  //   //   }).format(newValueTypeNumber);

  //   // Cập nhật lại giá trị hiển thị cho người dùng
  //   // setFormattedUnitPrice(newValueTypeNumber);

  //   // Cập nhật InventoryItemExport sau khi thay đổi đơn giá
  //   if (onProductChange) {
  //     const updatedProduct = createInventoryItem(Product); // Tạo lại InventoryItemExport với thông tin hiện tại của sản phẩm
  //     updatedProduct.price = newValueTypeNumber; // Nếu không phải số, gán giá trị 0
  //     onProductChange(updatedProduct); // Gọi callback để cập nhật thông tin sản phẩm
  //   }
  // }

  // const handleBlurUnitPrice = () => {
  //   // Khi người dùng rời khỏi input, định dạng giá trị thành 123,456.12
  //   const numericValidValue = parseFloat(unitPrice);
  
  //   const newValueTypeNumber = isNaN(numericValidValue) ? 0 : numericValidValue;
  
  //   // Định dạng giá trị
  //   const formattedValue = new Intl.NumberFormat("en-US", {
  //     style: "decimal",
  //     maximumFractionDigits: 2,
  //   }).format(newValueTypeNumber);
  
  //   // Cập nhật giá trị đã được định dạng
  //   setFormattedUnitPrice(formattedValue);
  // };
  
  // const handleFocusUnitPrice = () => {
  //   // Khi người dùng focus vào input, hiển thị giá trị gốc (không định dạng)
  //   setFormattedUnitPrice(unitPrice);
  // };

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
  const handleFocusProductCode = () => {
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
  
  // Function to update the value (price * quantity)
  const updateValue = (quantity: string, price: string) => {
    const qty = parseFloat(quantity.replace(/\./g, "")) || 0
    const unitPrice = parseFloat(price.replace(/\./g, "")) || 0
    const result = qty * unitPrice
    setValue(formatNumber(result.toString())) // Set the formatted value
  }
  
  const formatNumber = (value: string): string => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value // Lấy giá trị ghi chú từ input
    setNotes(value) // Cập nhật giá trị ghi chú trong state
  
    // Cập nhật InventoryItemExport sau khi thay đổi ghi chú
    if (onProductChange) {
      const updatedProduct = createInventoryItem(Product) // Tạo lại InventoryItemExport với thông tin hiện tại của sản phẩm
      updatedProduct.notes = value // Cập nhật trường ghi chú trong InventoryItemExport
      onProductChange(updatedProduct) // Gọi callback để cập nhật thông tin sản phẩm
    }
  }

  // Create InventoryItemExport object
  const createInventoryItem = (product: ProductData): InventoryItemExport => {
    const qty = parseFloat(quantity.replace(/\./g, "")) || 0
    const price = parseFloat(unitPrice.replace(/\./g, "")) || 0
    const value = qty * price

    console.log("createInventoryItem:");
    console.log(qty);
    return {
      id: Date.now(), // Temporarily use current timestamp as ID
      code: product.code,
      name: product.name,
      unit: product.unit,
      quantity: qty,
      price: price,
      notes: notes,
    }
  }

  return (
    <div className="card" ref={wrapperRef}>
      <div className="card-body py-2">
        <div className="mb-1 position-relative">
          <div className="d-flex align-items-center gap-2" style={{ marginBottom: "0px" }}>
            <label htmlFor="Product-code" className="form-label mb-0" style={{ width: "120px", whiteSpace: "nowrap" }}>
              Sản phẩm
            </label>
            {/* Mã hàng input */}
            <input
              type="text"
              className="form-control"
              id="Product-code"
              placeholder="Search here"
              value={searchText}
              onChange={(e) => handleFilter(e.target.value)} // Filter Products when input changes
              onKeyDown={handleKeyDown} // Handle keyboard navigation
              onFocus={handleFocusProductCode} // Show dropdown on focus
              style={{ width: "150px" }}
            />
            {/* Tên hàng input */}
            <input
              type="text"
              className="form-control flex-grow-1"
              id="Product-name"
              placeholder="tên hàng"
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
                width: "calc(100% - 50px)",
                marginLeft: "100px",
                maxHeight: "200px", // Set max height
                overflowY: "auto", // Enable scroll when list is too long
                gridTemplateColumns: "2fr 3fr 1fr", // Điều chỉnh số cột và kích thước cột (tỷ lệ)
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
                    <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr 1fr", gap: "10px" }}>
                      <div><span>{s.code}</span></div>
                      <div><span>{s.name}</span></div>
                      <div><span>{s.unit}</span></div>
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

        <div className="row mb-1 g-1">
          {/* Đvt input */}
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              id="Product-unit"
              placeholder="đvt"
              value={Product.unit}
              onChange={(e) => handleChange("unit", e.target.value)} // Update Product tax ID
            />
          </div>

          {/* Số lượng input */}
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              id="quantity"
              placeholder="số lượng"
              value={quantity} // Bind the quantity value
              onChange={handleQuantityChange} // Update quantity
            />
          </div>

          {/* Đơn giá input */}
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              id="unitPrice"
              placeholder="đơn giá"
              // value={formattedUnitPrice} // Bind the unit price value
              onChange={handleUnitPriceChange} // Update unit price
              // onFocus={handleFocusUnitPrice} // Show dropdown on focus
              // onBlur={handleBlurUnitPrice}  // Khi người dùng rời đi
            />
          </div>

          {/* Giá trị input */}
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              id="value"
              placeholder="giá trị"
              value={value} // Bind the value (calculated)
              readOnly
            />
          </div>
        </div>

        <div className="row mb-1">
          {/* notes input */}
          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              id="Product-notes"
              placeholder="ghi chú sản phẩm"
              value={notes} // Bind the unit price value
              onChange={handleNotesChange} // Update unit price
            />
          </div>
        </div>
      </div>
    </div>
  )
}
