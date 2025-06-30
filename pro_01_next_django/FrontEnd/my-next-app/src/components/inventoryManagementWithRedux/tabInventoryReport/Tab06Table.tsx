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
  tong_nhap: number;
  tong_xuat: number;
  ton_cuoi_ky: number;
}

// Define component props
interface InventoryTableStockReceiveSlipProps {
  onInventoryTableChange: (newItems: InventoryReportItem[]) => void;
  onRowSelect: (soPhieu: string) => void;
}

const TABLE_HEADERS = [
  { label: "STT", width: "" },
  { label: "Mã hàng", width: "120px" },
  { label: "Tên hàng", width: "" },
  { label: "Đvt", width: "" },
  { label: "Tồn đầu kỳ", width: "" },
  { label: "Nhập trong kỳ", width: "" },
  { label: "Xuất trong kỳ", width: "" },
  { label: "Tồn cuối kỳ", width: "" },
];

export function InventoryTableStockReceiveSlip({ onInventoryTableChange, onRowSelect }: InventoryTableStockReceiveSlipProps) {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.form);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reportData, setReportData] = useState<InventoryReportItem[]>([]);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
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
      setFromDate(data.from_date || "");
      setToDate(data.to_date || "");
      // Map lại field cho đúng interface
      const mappedData = (data.data || []).map((item: any) => ({
        ma_hang: item.ma_hang,
        ten_hang: item.ten_hang,
        dvt: item.dvt,
        ton_dau_ky: item.ton_dau_ky,
        tong_nhap: item.tong_nhap, // map đúng field
        tong_xuat: item.tong_xuat, // map đúng field
        ton_cuoi_ky: item.ton_cuoi_ky, // map đúng field
      }));
      setReportData(mappedData);
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
          {/* <div className="mb-2 text-end text-muted small">
            {fromDate && toDate && (
              <span>Báo cáo từ {fromDate} đến {toDate}</span>
            )}
          </div> */}
          {isLoading ? (
            <div className="text-center py-4">Loading data...</div>
          ) : (
            <table className="table table-bordered table-hover mb-0">
              <thead>
                <tr>
                  {TABLE_HEADERS.map((h) => (
                    <th key={h.label} style={h.width ? { width: h.width } : {}}>{h.label}</th>
                  ))}
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
                      <td>{formatNumber(item.tong_nhap)}</td>
                      <td>{formatNumber(item.tong_xuat)}</td>
                      <td>{formatNumber(item.ton_cuoi_ky)}</td>
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