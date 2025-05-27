// src/components/inventoryManagementWithRedux/Tab04Table.tsx
"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedProduct,
  clearForm,
  setError,
} from "../../features/formReceiptLog/formReceiptLogSlice";
import PopupFadeout from "../popups/errorPopupComponentTypeFadeOutNum01";
import { RootState } from "../../store"; // Giả sử bạn đã cấu hình store

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
}

export function InventoryTableStockReceiveSlip({ product }: InventoryTableStockReceiveSlipProps) {
  const dispatch = useDispatch();
  // Lấy danh sách items từ Redux store
  const items = useSelector((state: RootState) => state.form.items || []);
  const errorMessage = useSelector((state: RootState) => state.form.error);

  // Hàm thêm một hàng mới
  const addRow = () => {
    // Validation: Kiểm tra mã hàng và số lượng
    if (!product.code || product.quantity === 0) {
      dispatch(setError("Mã hàng không được trống và Số lượng phải lớn hơn 0."));
      return;
    }

    // Tạo item mới
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

    // Kiểm tra trùng mã hàng
    const existingIndex = items.findIndex((item) => item.code === newItem.code);

    if (existingIndex !== -1) {
      // Nếu trùng, thay thế item cũ
      const updatedItems = items.filter((item) => item.code !== newItem.code);
      updatedItems.push(newItem);
      const reindexedItems = reindexItems(updatedItems);
      dispatch(setSelectedProduct({ items: reindexedItems }));
    } else {
      // Thêm item mới
      const updatedItems = [...items, newItem];
      const reindexedItems = reindexItems(updatedItems);
      dispatch(setSelectedProduct({ items: reindexedItems }));
    }

    dispatch(setError(null)); // Xóa lỗi nếu hợp lệ
  };

  // Hàm xóa một hàng
  const deleteRow = (id: number) => {
    const newItems = items.filter((item) => item.id !== id);
    const reindexedItems = reindexItems(newItems);
    dispatch(setSelectedProduct({ items: reindexedItems }));
  };

  // Hàm xóa toàn bộ hàng
  const clearRows = () => {
    dispatch(setSelectedProduct({ items: [] }));
  };

  // Hàm reindex để đảm bảo ID tuần tự
  const reindexItems = (items: InventoryItem[]): InventoryItem[] => {
    return items.map((item, index) => ({
      ...item,
      id: index + 1,
    }));
  };

  // Hàm cập nhật item trong bảng
  const updateItem = (index: number, field: keyof InventoryItem, value: any) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
      value: field === "quantity" || field === "price" ? newItems[index].quantity * newItems[index].price : newItems[index].value,
    };
    dispatch(setSelectedProduct({ items: newItems }));
  };

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
                <th style={{ width: "50px" }}>STT</th>
                <th>Mã hàng</th>
                <th>Tên hàng</th>
                <th>Đvt</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
                <th>Ghi chú</th>
                <th></th>
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
                        onChange={(e) => updateItem(index, "code", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Tên mặt hàng"
                        value={item.name}
                        onChange={(e) => updateItem(index, "name", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Đvt"
                        value={item.unit}
                        onChange={(e) => updateItem(index, "unit", e.target.value)}
                        style={{ width: "60px" }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, "quantity", Number(e.target.value))}
                        style={{ width: "80px" }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={item.price}
                        onChange={(e) => updateItem(index, "price", Number(e.target.value))}
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
                        onChange={(e) => updateItem(index, "notes", e.target.value)}
                      />
                    </td>
                    <td>
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
      <PopupFadeout message={errorMessage} onClose={() => dispatch(setError(null))} />
    </div>
  );
}