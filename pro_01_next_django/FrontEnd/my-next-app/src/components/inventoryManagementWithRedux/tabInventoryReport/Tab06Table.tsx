"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setInventoryData,
} from "@/features/formReceiptLog/formReceiptLogSlice";
import PopupFadeout from "@/components/popups/errorPopupComponentTypeFadeOutNum01";
import { setDateStart, setDateEnd } from "@/features/formReceiptLog/dateFilterFormSlice";
import { clearDocumentNumber } from "@/features/formReceiptLog/documentNumberFilterFormSlice";
import { clearDocumentRequestNumber } from "@/features/formReceiptLog/documentRequestNumberFilterFormSlice";
import { clearSupplier } from "@/features/formReceiptLog/supplierFilterFormSlice";
import { resetProductState } from "@/features/formReceiptLog/objectProductFilterFormSlice";
import { API_inventory_report_quantity } from '@/api/api';
import { getPermissionOnDB } from '@/utils/getPermissionOnDB';
import { formatNumber } from '@/utils/formatNumber';

// Định nghĩa interface cho báo cáo tồn kho
interface InventoryReportItem {
  ma_hang: string;
  ten_hang: string;
  dvt: string;
  ton_dau_ky: number;
  nhap_trong_ngay: number;
  xuat_trong_ngay: number;
  ton_cuoi_ngay: number;
}

// Define component props
interface InventoryTableStockReceiveSlipProps {
  onInventoryTableChange: (newItems: InventoryReportItem[]) => void;
  onRowSelect: (soPhieu: string) => void;
}

export function InventoryTableStockReceiveSlip({ onInventoryTableChange, onRowSelect }: InventoryTableStockReceiveSlipProps) {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.form);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reportData, setReportData] = useState<InventoryReportItem[]>([]);
  const [reportDate, setReportDate] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Lấy filter từ Redux store
  const documentNumber = useAppSelector((state) => state.documentNumberFilterForm.documentNumber);
  const documentRequestNumber = useAppSelector((state) => state.documentRequestNumberFilterForm.documentRequestNumber);
  const supplierCode = useAppSelector((state) => state.supplierFilterForm.supplier.code);
  const productCode = useAppSelector((state) => state.productFilterForm.Product.code);
  const dateStart = useAppSelector((state) => state.dateFilterForm.dateStart);
  const dateEnd = useAppSelector((state) => state.dateFilterForm.dateEnd);
  const userId = useAppSelector((state) => state.user.userId);
  const [justCleared, setJustCleared] = useState(true);

  // Đảm bảo ngày mặc định là 10 ngày gần nhất khi render lần đầu
  useEffect(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 9);
    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    // Nếu ngày hiện tại khác 10 ngày gần nhất thì set lại
    if (dateStart !== formatDate(start) || dateEnd !== formatDate(end)) {
      dispatch(setDateStart(formatDate(start)));
      dispatch(setDateEnd(formatDate(end)));
      setJustCleared(true); // Đảm bảo filter sẽ chạy lại với ngày mới
    }
    // eslint-disable-next-line
  }, []);

  // Khi reportData thay đổi, callback cho parent
  useEffect(() => {
    onInventoryTableChange(reportData);
  }, [reportData, onInventoryTableChange]);

  // Xử lý khi nhấn nút Filter
  const handleFilter = async () => {
    setIsLoading(true);
    // Tạo query params
    const params = new URLSearchParams();
    if (dateStart) params.append("from_date", dateStart);
    if (dateEnd) params.append("to_date", dateEnd);
    if (documentNumber) params.append("so_phieu", documentNumber);
    if (documentRequestNumber) params.append("so_phieu_de_nghi", documentRequestNumber);
    if (supplierCode) params.append("ma_doi_tuong", supplierCode);
    if (productCode) params.append("ma_hang", productCode);

    // Lấy model_key động từ quyền user
    let model_key = null;
    if (userId) {
      model_key = await getPermissionOnDB(userId);
    }
    if (model_key && typeof model_key === 'string' && model_key.trim()) {
      params.append('model_key', model_key);
    }

    const apiUrl = `${API_inventory_report_quantity}?${params.toString()}`;
    // console.log("API URL:", apiUrl);

    // Nếu muốn gọi API thực tế, bạn có thể fetch(apiUrl) ở đây
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Lỗi khi lấy dữ liệu!");
      const data = await response.json();
      setReportDate(data.date || "");
      setReportData(data.data || []);
    } catch (err: any) {
      setErrorMessage(err.message || "Lỗi không xác định!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearFilter = async () => {
    // Set lại ngày về 10 ngày gần nhất
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 9);

    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    dispatch(setDateStart(formatDate(start)));
    dispatch(setDateEnd(formatDate(end)));

    // Clear các filter khác
    dispatch(clearDocumentNumber());
    dispatch(clearDocumentRequestNumber());
    dispatch(clearSupplier());
    dispatch(resetProductState());

    setJustCleared(true);
  };

  // Lắng nghe thay đổi dateStart/dateEnd sau khi clear filter
  useEffect(() => {
    if (justCleared) {
      handleFilter();
      setJustCleared(false);
    }
    // eslint-disable-next-line
  }, [dateStart, dateEnd]);

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
          onClick={handleClearFilter}
          >
          Clear filter
        </button>
      </div>

      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Error: {error}</div>}

      <div className="border rounded">
        <div className="table-container">
          <div className="mb-2 text-end text-muted small">
            {reportDate && <span>Ngày báo cáo: {reportDate}</span>}
          </div>
          {isLoading ? (
            <div className="text-center py-4">Loading data...</div>
          ) : (
            <table className="table table-bordered table-hover mb-0">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã hàng</th>
                  <th>Tên hàng</th>
                  <th>Đvt</th>
                  <th>Tồn đầu kỳ</th>
                  <th>Nhập trong ngày</th>
                  <th>Xuất trong ngày</th>
                  <th>Tồn cuối ngày</th>
                </tr>
              </thead>
              <tbody>
                {reportData.length > 0 ? (
                  reportData.map((item, idx) => (
                    <tr key={item.ma_hang || idx}>
                      <td>{idx + 1}</td>
                      <td>{item.ma_hang}</td>
                      <td>{item.ten_hang}</td>
                      <td>{item.dvt}</td>
                      <td>{formatNumber(item.ton_dau_ky)}</td>
                      <td>{formatNumber(item.nhap_trong_ngay)}</td>
                      <td>{formatNumber(item.xuat_trong_ngay)}</td>
                      <td>{formatNumber(item.ton_cuoi_ngay)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-4">
                      No data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <PopupFadeout message={errorMessage} onClose={() => setErrorMessage(null)} />
    </div>
  );
}