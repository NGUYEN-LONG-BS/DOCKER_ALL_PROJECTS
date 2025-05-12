// src/components/Tab01Table.tsx
"use client";

import { useAppDispatch, useAppSelector } from '@/store';
import {
  addItem,
  deleteItem,
  clearItems,
  updateItem,
  setErrorMessage,
} from '@/features/objectProductComponent/objectProductComponentSlice';
import { InventoryItemExport } from '@/features/objectProductComponent/objectProductComponentSlice'; // Nhập interface
import PopupFadeout from "../popups/errorPopupComponentTypeFadeOutNum01";

interface InventoryTableStockReceiveSlipProps {
  product: { code: string; name: string; unit: string; quantity: number; price: number; notes: string };
  onInventoryTableChange: (newItems: InventoryItemExport[]) => void; // Callback to notify parent about changes
}

export function InventoryTableStockReceiveSlip({ product, onInventoryTableChange }: InventoryTableStockReceiveSlipProps) {
  const dispatch = useAppDispatch();
  const { items, errorMessage } = useAppSelector((state) => state.product);
  
  const addRow = () => {
    // Validation: Check if the Mã hàng (product code) is empty or Số lượng (quantity) is 0
    if (!product.code || product.quantity === 0) {
      dispatch(setErrorMessage('Mã hàng không được trống và Số lượng phải lớn hơn 0.'));
      return; // Stop the function from continuing, thus preventing row addition
    }
    // Reset error message if input is valid
    dispatch(setErrorMessage(null));
    // Create a new InventoryItem based on the provided product
    const newItem: InventoryItemExport = {
      id: items.length + 1,
      code: product.code,
      name: product.name,
      unit: product.unit,
      quantity: product.quantity,
      price: product.price,
      value: product.quantity * product.price,
      notes: product.notes,
    };

    // Dispatch action để thêm item
    dispatch(addItem(newItem));
    // Gọi callback để thông báo parent
    onInventoryTableChange([...items, newItem]);
  };

  const deleteRow = (id: number) => {
    dispatch(deleteItem(id));
    // Gọi callback sau khi xóa
    onInventoryTableChange(items.filter((item) => item.id !== id));
  };

  const clearRows = () => {
    dispatch(clearItems());
    // Gọi callback sau khi xóa tất cả
    onInventoryTableChange([]);
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
                        onChange={(e) =>
                          dispatch(updateItem({ id: item.id, field: 'code', value: e.target.value }))
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Tên mặt hàng"
                        value={item.name}
                        onChange={(e) =>
                          dispatch(updateItem({ id: item.id, field: 'name', value: e.target.value }))
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Đvt"
                        value={item.unit}
                        onChange={(e) =>
                          dispatch(updateItem({ id: item.id, field: 'unit', value: e.target.value }))
                        }
                        style={{ width: "60px" }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch(
                            updateItem({ id: item.id, field: 'quantity', value: Number(e.target.value) })
                          )
                        }
                        style={{ width: "80px" }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={item.price}
                        onChange={(e) =>
                          dispatch(
                            updateItem({ id: item.id, field: 'price', value: Number(e.target.value) })
                          )
                        }
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
                        onChange={(e) =>
                          dispatch(updateItem({ id: item.id, field: 'notes', value: e.target.value }))
                        }
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
