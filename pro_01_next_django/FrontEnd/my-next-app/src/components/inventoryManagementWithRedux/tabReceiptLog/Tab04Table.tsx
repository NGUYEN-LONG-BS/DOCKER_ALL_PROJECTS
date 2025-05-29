"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  fetchInventoryData,
  setInventoryData,
  setError,
  setSuccess,
  clearForm,
} from "@/features/formReceiptLog/formReceiptLogSlice";
import PopupFadeout from "@/components/popups/errorPopupComponentTypeFadeOutNum01";

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
  onInventoryTableChange: (newItems: InventoryItem[]) => void;
}

export function InventoryTableStockReceiveSlip({ onInventoryTableChange }: InventoryTableStockReceiveSlipProps) {
  const dispatch = useAppDispatch();
  const { inventoryData, status, error } = useAppSelector((state) => state.form);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Lấy filter từ Redux store
  const documentNumber = useAppSelector((state) => state.documentNumberFilterForm.documentNumber);
  const documentRequestNumber = useAppSelector((state) => state.documentRequestNumberFilterForm.documentRequestNumber);
  const supplierCode = useAppSelector((state) => state.supplierFilterForm.supplier.code);
  const productCode = useAppSelector((state) => state.productFilterForm.Product.code);
  const dateStart = useAppSelector((state) => state.dateFilterForm.dateStart);
  const dateEnd = useAppSelector((state) => state.dateFilterForm.dateEnd);


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

  // Xử lý khi nhấn nút Filter
  const handleFilter = async () => {
    console.log("Từ ngày:", dateStart);
    console.log("Đến ngày:", dateEnd);
    console.log("Số chứng từ:", documentNumber);
    console.log("Số đề nghị:", documentRequestNumber);
    console.log("Mã nhà cung cấp:", supplierCode);
    console.log("Mã sản phẩm:", productCode);
    // Bạn có thể thực hiện filter thực tế ở đây nếu muốn

    // Tạo query params
    const params = new URLSearchParams();
    if (dateStart) params.append("from_date", dateStart);
    if (dateEnd) params.append("to_date", dateEnd);
    if (documentNumber) params.append("so_phieu", documentNumber);
    if (documentRequestNumber) params.append("so_phieu_de_nghi", documentRequestNumber);
    if (supplierCode) params.append("ma_doi_tuong", supplierCode);
    if (productCode) params.append("ma_hang", productCode);

    const apiUrl = `http://127.0.0.1:8000/api/inventory-stock/?${params.toString()}`;
    console.log("API URL:", apiUrl);

    // Nếu muốn gọi API thực tế, bạn có thể fetch(apiUrl) ở đây
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Lỗi khi lấy dữ liệu!");
      const data = await response.json();
      // Giả sử data là mảng InventoryItem
      dispatch(setInventoryData(data));
      onInventoryTableChange(data);
    } catch (err: any) {
      setErrorMessage(err.message || "Lỗi không xác định!");
    }
  };

  return (
    <div className="mt-3">
      <div className="d-flex justify-content-center gap-2 mb-3">
        <button 
          type="button" 
          className="btn btn-primary" 
          onClick={handleFilter}
          >
          Filter
        </button>
        <button 
          type="button" 
          className="btn btn-outline-secondary" 
          // onClick={clearRows}
          >
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
              </tr>
            </thead>
            <tbody>
              {inventoryData.length > 0 ? (
                inventoryData.map((item, idx) => (
                  <tr key={item.id ? item.id : idx}>
                    <td>{idx + 1}</td>
                    <td>{item.so_phieu}</td>
                    <td>{new Date(item.ngay_tren_phieu).toLocaleDateString()}</td>
                    <td>{item.so_phieu_de_nghi}</td>
                    <td>{item.ma_doi_tuong}</td>
                    <td>{item.ten_doi_tuong || 'N/A'}</td>
                    <td>{item.ma_hang}</td>
                    <td>{item.ten_hang || 'N/A'}</td>
                    <td>{item.ma_kho_nhan}</td>
                    <td>{item.so_luong}</td>
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