// src/components/inventoryManagementWithRedux/Tab04Table.tsx
"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  fetchInventoryData,
  setInventoryData,
  setError,
  setSuccess,
  clearForm,
} from "../../../features/formReceiptLog/formReceiptLogSlice";
import PopupFadeout from "../../popups/errorPopupComponentTypeFadeOutNum01";

// Define interface for API data
interface InventoryItem {
  id: number;
  so_phieu: string;
  ngay_tren_phieu: string;
  so_phieu_de_nghi: string;
  ma_doi_tuong: string;
  ten_doi_tuong?: string;
  ma_hang: string;
  ten_hang?: string;
  ma_kho_nhan: string;
  so_luong: string;
}

// Define component props
interface InventoryTableStockReceiveSlipProps {
  product: { code: string; name: string; unit: string; quantity: number; price: number; notes: string };
  onInventoryTableChange: (newItems: InventoryItem[]) => void;
}

export function InventoryTableStockReceiveSlip({ product, onInventoryTableChange }: InventoryTableStockReceiveSlipProps) {
  const dispatch = useAppDispatch();
  const { inventoryData, status, error } = useAppSelector((state) => state.form);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchInventoryData());
  }, [dispatch]);

  // Update parent when inventoryData changes
  useEffect(() => {
    if (inventoryData.length > 0) {
      onInventoryTableChange(inventoryData);
    }
  }, [inventoryData, onInventoryTableChange]);

  const addRow = () => {
    // Validation: Check if the Mã hàng (product code) is empty or Số lượng (quantity) is 0
    if (!product.code || product.quantity === 0) {
      setErrorMessage("Mã hàng không được trống và Số lượng phải lớn hơn 0.");
      return;
    }
    setErrorMessage(null);

    // Create a new InventoryItem based on the provided product
    const newItem: InventoryItem = {
      id: inventoryData.length + 1,
      so_phieu: product.code,
      ngay_tren_phieu: new Date().toISOString(),
      so_phieu_de_nghi: product.code,
      ma_doi_tuong: product.code,
      ma_hang: product.code,
      ten_hang: product.name || 'N/A',
      ma_kho_nhan: 'Kho A',
      so_luong: product.quantity.toString(),
    };

    // Check for duplicate by ma_hang
    const existingIndex = inventoryData.findIndex((item) => item.ma_hang === newItem.ma_hang);
    let updatedItems: InventoryItem[];

    if (existingIndex !== -1) {
      updatedItems = inventoryData.filter((item) => item.ma_hang !== newItem.ma_hang);
      updatedItems.push(newItem);
    } else {
      updatedItems = [...inventoryData, newItem];
    }

    // Reindex items
    updatedItems = reindexItems(updatedItems);
    dispatch(setInventoryData(updatedItems));
    dispatch(setSuccess('Row added successfully!'));
    onInventoryTableChange(updatedItems);
  };

  const deleteRow = (id: number) => {
    const updatedItems = inventoryData.filter((item) => item.id !== id);
    const reindexedItems = reindexItems(updatedItems);
    dispatch(setInventoryData(reindexedItems));
    dispatch(setSuccess('Row deleted successfully!'));
    onInventoryTableChange(reindexedItems);
  };

  const clearRows = () => {
    dispatch(clearForm());
    onInventoryTableChange([]);
  };

  // Reindex function to ensure IDs are sequential
  const reindexItems = (items: InventoryItem[]): InventoryItem[] => {
    return items.map((item, index) => ({
      ...item,
      id: index + 1,
    }));
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

      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Error: {error}</div>}

      <div className="border rounded">
        <div className="table-container">
          <table className="table table-bordered table-hover mb-0">
            <thead>
              <tr>
                <th style={{ width: "50px" }}>STT</th>
                <th>Số phiếu</th>
                <th>Ngày</th>
                <th>Số đề nghị</th>
                <th>Mã đối tượng</th>
                <th>Tên đối tượng</th>
                <th>Mã hàng</th>
                <th>Tên hàng</th>
                <th>Kho</th>
                <th>Số lượng</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.length > 0 ? (
                inventoryData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.so_phieu}</td>
                    <td>{new Date(item.ngay_tren_phieu).toLocaleDateString()}</td>
                    <td>{item.so_phieu_de_nghi}</td>
                    <td>{item.ma_doi_tuong}</td>
                    <td>{item.ten_doi_tuong || 'N/A'}</td>
                    <td>{item.ma_hang}</td>
                    <td>{item.ten_hang || 'N/A'}</td>
                    <td>{item.ma_kho_nhan}</td>
                    <td>{item.so_luong}</td>
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
                  <td colSpan={11} className="text-center py-4">
                    No data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <PopupFadeout message={errorMessage} onClose={() => setErrorMessage(null)} />
    </div>
  );
}