"use client";

import { useState, useEffect } from "react";
import PopupFadeout from "../popups/errorPopupComponentTypeFadeOutNum01";

interface InventoryItem {
  id: number;
  code: string;
  name: string;
  unit: string;
  quantity: number;
  price: number;
  value: number;
  notes: string;
}

interface InventoryTableStockReceiveSlipProps {
  product: { code: string; name: string; unit: string; quantity: number; price: number; notes: string };
  onInventoryTableChange: (newItems: InventoryItem[]) => void; // Callback to notify parent about changes
}

const TABLE_HEADERS = [
  { label: "STT", width: "50px" },
  { label: "Mã hàng", width: "120px" },
  { label: "Tên hàng", width: "" },
  { label: "Đvt", width: "" },
];

export function InventoryTableStockReceiveSlip({ product, onInventoryTableChange }: InventoryTableStockReceiveSlipProps) {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const addRow = () => {
    // Validation: Check if the Mã hàng (product code) is empty or Số lượng (quantity) is 0
    if (!product.code || product.quantity === 0) {
      setErrorMessage("Mã hàng không được trống và Số lượng phải lớn hơn 0.");
      return; // Stop the function from continuing, thus preventing row addition
    }
    // Reset error message if input is valid
    setErrorMessage(null);
    // Create a new InventoryItem based on the provided product
    const newItem: InventoryItem = {
      id: items.length + 1,
      code: product.code,
      name: product.name,
      unit: product.unit,
      quantity: product.quantity,
      price: product.price,
      value: product.quantity * product.price,
      notes: product.notes,
    };

    // Check if a row with the same code already exists
    const existingIndex = items.findIndex(item => item.code === newItem.code);
  
    if (existingIndex !== -1) {
      // If a duplicate is found, remove the previous one and add the new one
      const updatedItems = items.filter(item => item.code !== newItem.code);
      updatedItems.push(newItem); // Add the new item at the end
      // Ensure the items are in sequential order
      const reindexedItems = reindexItems(updatedItems);
      setItems(reindexedItems);
      onInventoryTableChange(updatedItems); // Notify parent about changes
    } else {
      // If no duplicate is found, simply add the new row
      setItems(prevItems => {
        const updatedItems = [...prevItems, newItem];
        const reindexedItems = reindexItems(updatedItems); // Reindex items
        onInventoryTableChange(reindexedItems); // Notify parent about changes
        return reindexedItems; // Return reindexed items
      });
    }
  };

  const deleteRow = (id: number) => {
    const newItems = items.filter(item => item.id !== id)

    // Reindex the remaining items to ensure sequential order
    setItems(reindexItems(newItems)); // Update the state with reindexed items
  };

  // Reindex function to ensure IDs are sequential
  const reindexItems = (items: InventoryItem[]): InventoryItem[] => {
    return items.map((item, index) => ({
      ...item,
      id: index + 1, // Reassign ID to be sequential starting from 1
    }));
  };

  const clearRows = () => {
    setItems([]);
    };
  
    // Use useEffect to update the state after the render is done
  useEffect(() => {
    if (items.length > 0) {
      onInventoryTableChange(items);  // Notify parent after items are updated
    }
  }, [items]);  // Trigger when items change

  return (
    <div className="mt-3">
      <div className="d-flex justify-content-center gap-2 mb-3">
        <button type="button" className="btn btn-primary" onClick={addRow}>
          Filter
        </button>
        <button type="button" className="btn btn-outline-secondary" onClick={clearRows}>
          Clear filter
        </button>
      </div>

      <div className="border rounded">
        <div className="table-container">
          <table className="table table-bordered table-hover mb-0">
            <thead>
              <tr>
                {TABLE_HEADERS.map((h) => (
                  <th key={h.label} style={h.width ? { width: h.width } : {}}>{h.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Mã hàng"
                        value={item.code}
                        onChange={(e) => {
                          const newItems = [...items]
                          newItems[index].code = e.target.value
                          setItems(newItems)
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Tên mặt hàng"
                        value={item.name}
                        onChange={(e) => {
                          const newItems = [...items]
                          newItems[index].name = e.target.value
                          setItems(newItems)
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Đvt"
                        value={item.unit}
                        onChange={(e) => {
                          const newItems = [...items]
                          newItems[index].unit = e.target.value
                          setItems(newItems)
                        }}
                        style={{ width: "60px" }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={item.quantity}
                        onChange={(e) => {
                          const newItems = [...items]
                          newItems[index].quantity = Number(e.target.value)
                          newItems[index].value = newItems[index].quantity * newItems[index].price
                          setItems(newItems)
                        }}
                        style={{ width: "80px" }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={item.price}
                        onChange={(e) => {
                          const newItems = [...items]
                          newItems[index].price = Number(e.target.value)
                          newItems[index].value = newItems[index].quantity * newItems[index].price
                          setItems(newItems)
                        }}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={item.value} // Hiển thị giá trị tính toán
                        readOnly
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Ghi chú"
                        value={item.notes}
                        onChange={(e) => {
                          const newItems = [...items]
                          newItems[index].notes = e.target.value
                          setItems(newItems)
                        }}
                      />
                    </td>
                    <td>
                      {/* Thêm button xóa với icon dấu "X" */}
                      <button
                        type="button"
                        className="btn btn-danger btn-sm position-relative"
                        onClick={() => deleteRow(item.id)}
                        style={{
                          borderRadius: "50%",
                          padding: "5px 10px",
                          width: "30px",
                          height: "30px",
                        }}
                      >
                        <span className="fw-bold">X</span> {/* Dấu X */}
                        {/* Hiển thị chữ "Delete" khi hover */}
                        <span
                          className="position-absolute top-100 start-50 translate-middle-x"
                          style={{
                            fontSize: "12px",
                            whiteSpace: "nowrap",
                            display: "none",
                            zIndex: 1,
                          }}
                          id={`deleteText-${item.id}`}
                        >
                          Delete
                        </span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-4">
                    No data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Error Popup */}
      <PopupFadeout message={errorMessage} onClose={() => setErrorMessage(null)} />
    </div>
  )
}
