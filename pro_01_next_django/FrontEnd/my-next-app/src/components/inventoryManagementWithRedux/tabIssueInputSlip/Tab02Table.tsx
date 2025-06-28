// src/components/Tab01Table.tsx
"use client";

import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  addItemWithValidation,
  deleteItem,
  clearItems,
  updateItem,
  setErrorMessage,
  setItems,
} from '@/features/formReceiptSlip/inventoryTableSlice';
import { InventoryItemExport } from '@/features/formReceiptSlip/inventoryTableSlice';
import PopupFadeout from "../../popups/errorPopupComponentTypeFadeOutNum01";

interface InventoryTableStockReceiveSlipProps {
  product: InventoryItemExport;
  onInventoryTableChange: (newItems: InventoryItemExport[]) => void;
  formatNumber: (value: string | number) => string;
}

export function InventoryTableStockReceiveSlip({ product, onInventoryTableChange, formatNumber }: InventoryTableStockReceiveSlipProps) {
  const dispatch = useAppDispatch();
  const { items, errorMessage } = useAppSelector((state) => state.inventoryTable);

  // Validate items to prevent rendering invalid objects
  const validItems = useMemo(() => {
    return items.filter(
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
    }, [items]);

  const addRow = () => {
    console.log("Validation Data for Add Row:", { product });

    // Validation: Check if the Mã hàng (product code) is empty or Số lượng (quantity) is 0
    if (!product.code || product.quantity === 0) {
      dispatch(setErrorMessage("Mã hàng không được trống và Số lượng phải lớn hơn 0."));
      return; // Stop the function from continuing, thus preventing row addition
    }
    // Reset error message if input is valid
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

    // Check if a row with the same code already exists
    const existingIndex = items.findIndex(item => item.code === newItem.code);

    if (existingIndex !== -1) {
      // If a duplicate is found, remove the previous one and add the new one
      const updatedItems = items.filter(item => item.code !== newItem.code);
      updatedItems.push(newItem); // Add the new item at the end
      // Ensure the items are in sequential order
      const reindexedItems = reindexItems(updatedItems);
      dispatch(setItems(reindexedItems));
      onInventoryTableChange(reindexedItems); // Notify parent about changes
    } else {
      // If no duplicate is found, simply add the new row
      const updatedItems = [...items, newItem];
      const reindexedItems = reindexItems(updatedItems); // Reindex items
      dispatch(setItems(reindexedItems));
      onInventoryTableChange(reindexedItems); // Notify parent about changes
    }
  };

  const deleteRow = (id: number) => {
    dispatch(deleteItem(id));
    const updatedItems = validItems.filter((item) => item.id !== id);
    const reindexedItems = reindexItems(updatedItems); // Reindex items after deletion
    dispatch(setItems(reindexedItems));
    onInventoryTableChange(reindexedItems);
  };

  // Reindex function to ensure IDs are sequential
  const reindexItems = (items: InventoryItemExport[]): InventoryItemExport[] => {
    return items.map((item, index) => ({
      ...item,
      id: index + 1, // Reassign ID to be sequential starting from 1
    }));
  };

  const clearRows = () => {
    dispatch(clearItems());
    dispatch(setItems([]));
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
    dispatch(setItems(updatedItems));
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
                        readOnly // Ngăn chỉnh sửa
                        style={{ backgroundColor: "#c0c7cf", width: "120px" }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Tên mặt hàng"
                        value={item.name}
                        readOnly // Ngăn chỉnh sửa
                        style={{ backgroundColor: "#c0c7cf" }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Đvt"
                        value={item.unit}
                        readOnly // Ngăn chỉnh sửa
                        style={{ backgroundColor: "#c0c7cf", width: "60px" }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={formatNumber(item.quantity)}
                        readOnly
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={formatNumber(item.price)}
                        readOnly
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={formatNumber(item.value)}
                        readOnly
                        style={{ width: "120px" }}
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
                      <button
                        type="button"
                        className="btn btn-danger btn-sm position-relative"
                        onClick={() => deleteRow(item.id)}
                        style={{
                          borderRadius: "50%",
                          width: "30px",
                          height: "30px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: 0,
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
