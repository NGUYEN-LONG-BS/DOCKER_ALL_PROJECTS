// src/components/Tab01Table.tsx
"use client";

import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  addItem,
  deleteItem,
  clearItems,
  updateItem,
  setErrorMessage,
} from '@/features/formReceiptSlip/inventoryTableSlice';
import { InventoryItemExport } from '@/features/formReceiptSlip/inventoryTableSlice';
import PopupFadeout from "../popups/errorPopupComponentTypeFadeOutNum01";

interface InventoryTableStockReceiveSlipProps {
  product: InventoryItemExport;
  onInventoryTableChange: (newItems: InventoryItemExport[]) => void;
}

export function InventoryTableStockReceiveSlip({ product, onInventoryTableChange }: InventoryTableStockReceiveSlipProps) {
  const dispatch = useAppDispatch();
  const { items, errorMessage } = useAppSelector((state) => state.inventoryTable);
  
  // // Log props and state for debugging
  // console.log("InventoryTableStockReceiveSlip - Props and State:", { product, items });

  // Validate items to prevent rendering invalid objects
  const validItems = items.filter(
    (item): item is InventoryItemExport =>
      item &&
      typeof item === "object" &&
      "id" in item &&
      "code" in item &&
      "name" in item &&
      "unit" in item &&
      "quantity" in item &&
      "price" in item &&
      "value" in item &&
      "notes" in item
  );
  
  const addRow = () => {
    console.log("Validation Data for Add Row:", { product });

    // Validate product prop
    if (!product.code || product.quantity <= 0) {
      dispatch(setErrorMessage("Mã hàng không được trống và Số lượng phải lớn hơn 0."));
      return;
    }
    
    // Reset error message
    dispatch(setErrorMessage(null));

    // Create new item
    const newItem: InventoryItemExport = {
      id: validItems.length + 1,
      code: product.code || "",
      name: product.name || "",
      unit: product.unit || "",
      quantity: product.quantity || 0,
      price: product.price || 0,
      value: (product.quantity || 0) * (product.price || 0),
      notes: product.notes || "",
    };

    // Dispatch action to add item
    dispatch(addItem(newItem));

    // Update parent with new items
    const updatedItems = [...validItems, newItem];
    onInventoryTableChange(updatedItems);
  };

  const deleteRow = (id: number) => {
    dispatch(deleteItem(id));
    const updatedItems = validItems.filter((item) => item.id !== id);
    onInventoryTableChange(updatedItems);
  };

  const clearRows = () => {
    dispatch(clearItems());
    onInventoryTableChange([]);
  };

  const handleUpdateItem = (id: number, field: keyof InventoryItemExport, value: string | number) => {
    dispatch(updateItem({ id, field, value }));

    const updatedItems = validItems.map((item) =>
      item.id === id
        ? {
            ...item,
            [field]: value,
            value:
              field === "quantity" || field === "price"
                ? (field === "quantity" ? Number(value) : item.quantity) *
                  (field === "price" ? Number(value) : item.price)
                : item.value,
          }
        : item
    );
    onInventoryTableChange(updatedItems);
  };

  return (
    <div className="mt-3">
      <div className="d-flex justify-content-center gap-2 mb-3">
        <button type="button" className="btn btn-primary" onClick={addRow}>
          Add Row
        </button>
        <button type="button" className="btn btn-outline-secondary" onClick={clearRows}>
          Clear Rows
        </button>
      </div>

      <div className="border rounded">
        <div className="table-container">
          <table className="table table-bordered table-hover mb-0">
            <thead>
              <tr>
                <th style={{ width: "50px" }}>STT</th>
                <th>Mã hàng</th>
                <th>Tên mặt hàng</th>
                <th>Đvt</th>
                <th>SL thực nhập</th>
                <th>Đơn giá</th>
                <th>Giá trị</th>
                <th>Ghi chú sản phẩm</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {validItems.length > 0 ? (
                validItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Mã hàng"
                        value={item.code}
                        onChange={(e) => handleUpdateItem(item.id, "code", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Tên mặt hàng"
                        value={item.name}
                        onChange={(e) => handleUpdateItem(item.id, "name", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Đvt"
                        value={item.unit}
                        onChange={(e) => handleUpdateItem(item.id, "unit", e.target.value)}
                        style={{ width: "60px" }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={item.quantity}
                        onChange={(e) => {
                          const newQuantity = Number(e.target.value);
                          if (newQuantity < 0) return;
                          handleUpdateItem(item.id, "quantity", newQuantity);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                          }
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
                          const newPrice = Number(e.target.value);
                          if (newPrice < 0) return;
                          handleUpdateItem(item.id, "price", newPrice);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                          }
                        }}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={item.value}
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
                        onChange={(e) => handleUpdateItem(item.id, "notes", e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                          }
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
                        <span className="fw-bold">X</span>
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
      <PopupFadeout message={errorMessage} onClose={() => dispatch(setErrorMessage(null))} />
    </div>
  );
}
