"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DateComponentFilterForm } from "@/components/date/dateComponentFilterForm";
import { DocumentNumberFilterForm } from "@/components/documentNumber/document-number-component-filter-form";
import { DocumentRequestNumberFilterForm } from "@/components/documentRequestNumber/document-request-number-component-filter-form";
import { SupplierComponentFilterForm } from "@/components/objectSupplier/ObjectSupplierComponentFilterForm";
import { ProductComponentFilterForm } from "@/components/objectProduct/ObjectProductComponentFilterForm";
import { InventoryTableStockReceiveSlip } from "./Tab06Table";
import PopupFadeout from "@/components/popups/errorPopupComponentTypeFadeOutNum01";
import SuccessPopup from "@/components/popups/successPopupComponentTypeFadeOutNum01";
import { useAppDispatch } from "@/store/store";
import { setActiveTab, TAB_NAMES } from "@/features/formReceiptSlip/tabNavSlice";

import { setDate as setDateRedux } from "@/features/formReceiptSlip/dateSlice";
import { setDocumentNumberReceipt as setDocumentNumberRedux } from "@/features/formReceiptSlip/documentNumberReceiptSlice";
import { setDocumentRequestNumber as setDocumentRequestNumberRedux } from "@/features/formReceiptSlip/documentRequestNumberSlice";
import { setSupplier as setSupplierRedux } from "@/features/formReceiptSlip/supplierInputFormSlice";
import { setItems } from "@/features/formReceiptSlip/inventoryTableSlice";
import { setSlipNote } from "@/features/formReceiptSlip/slipNoteSlice";
import { API_import_data, API_inventory_stock_by_so_phieu } from '@/api/api';

// Định nghĩa InventoryItemExport interface
interface InventoryItemExport {
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

// Tạo interface riêng cho SlipNote
interface SlipNote {
  selectedWarehouse: string;
  notesOfSlip: string;
}

interface InventoryFormState {
  date: string;
  documentNumber: string;
  supplier: string;
  notesOfSlip: SlipNote;
  inventoryTable: InventoryItemExport[];
}

// Define the Supplier interface
interface Supplier {
  code: string;
  name: string;
  taxId: string;
  address: string;
}

export function InventoryReport() {
  // State for all components
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [date, setDate] = useState<string>(() => {
    const today = new Date().toISOString().split('T')[0];
    return today;
  });
  const [documentNumber, setDocumentNumber] = useState<string>('TB-PNK-250001');
  const [documentRequestNumber, setDocumentRequestNumber] = useState<string>('TB-DNNK-250001');
  const [slipNote, setSlipNoteState] = useState<SlipNote>({
    selectedWarehouse: 'Kho A',
    notesOfSlip: '',
  });
  const [supplier, setSupplierState] = useState<Supplier>({
    code: '',
    name: '',
    taxId: '',
    address: '',
  });
  // State for all components
  const [inventoryTable, setInventoryTable] = useState<InventoryItemExport[]>([]);
  const [selectedSoPhieu, setSelectedSoPhieu] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // State to store the selected file
  // Cập nhật state để lưu trữ thông tin sản phẩm với kiểu InventoryItemExport
  const [selectedProduct, setSelectedProduct] = useState<InventoryItemExport>();
  
  const dispatch = useAppDispatch();
  
  // Hàm cập nhật bảng thông tin tồn kho
  const handleInventoryTableChange = (newInventoryItems: InventoryItemExport[]) => {
    setInventoryTable(newInventoryItems);
  };

  // Hàm xử lý khi người dùng chọn file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("starting");
    if (event.target.files) {
      const file = event.target.files[0]; // Lấy file được chọn
      if (file) {
        console.log("File selected:", file.name);
        setSelectedFile(file); // Lưu trữ file được chọn vào state
        setErrorMessage(""); // Xóa thông báo lỗi (nếu có)
      } else {
        setErrorMessage("No file selected"); // Thông báo nếu không có file
      }
    }
    console.log("ending");
  };

  // Hàm xử lý khi người dùng click vào nút "Import the data file"
  const handleImportFile = async () => {
    if (!selectedFile) {
      setErrorMessage("Please select a file to import");
      return;
    }

    // Tạo form data để gửi file qua API
    const formData = new FormData();
    formData.append("file", selectedFile); // Gửi file với key 'file'
    console.log("Sending file:"); // Kiểm tra dữ liệu trước khi gửi

    try {
      const response = await axios.post(API_import_data, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Cần set content-type là multipart/form-data để gửi file
        },
      });

      console.log("File imported successfully:", response.data);
      setSuccessMessage("File imported successfully!");
    } catch (error) {
      console.error("Error importing file:", error);
      setErrorMessage("Error importing file");
    }

    console.log("kết thúc");
  };
  
  
  

  

  // Use useEffect to trigger file import after selectedFile is updated
  useEffect(() => {
    if (selectedFile) {
      handleImportFile(); // Gọi hàm xử lý upload file ngay khi file được chọn
    }
  }, [selectedFile]); // This will run when selectedFile changes


  // Cập nhật giá trị kho
  const handleWarehouseChange = (newWarehouse: string) => {
    setSlipNoteState((prevState) => ({
      ...prevState,
      selectedWarehouse: newWarehouse,
    }));
  };

  // Cập nhật ghi chú
  const handleNotesChange = (newNotes: string) => {
    setSlipNoteState((prevState) => ({
      ...prevState,
      notesOfSlip: newNotes,
    }));
  };

  // Hàm cập nhật thông tin ngày tháng từ DateComponent
  const handleDateChange = (newDate: string) => {
    setDate(newDate);
  };

  // Hàm cập nhật thông tin số tài liệu từ DocumentNumberComponent
  const handleDocumentNumberChange = (newDocumentNumber: string) => {
    setDocumentNumber(newDocumentNumber);
  };

  // Hàm cập nhật thông tin nhà cung cấp từ SupplierComponent
  const handleSupplierChange = (newSupplier: Supplier) => {
    setSupplierState(newSupplier);
  };

  // Hàm xử lý khi sản phẩm thay đổi
  const handleProductChange = (product: InventoryItemExport) => {
    setSelectedProduct(product); // Cập nhật thông tin sản phẩm đã chọn
  };

  const mapApiDataToForm = (apiDataArray: any[]) => {
    if (!Array.isArray(apiDataArray) || apiDataArray.length === 0) return;

    // Lấy thông tin chung từ dòng đầu tiên
    const first = apiDataArray[0];

    // 1. Ngày trên phiếu
    if (first.ngay_tren_phieu) {
      const date = first.ngay_tren_phieu.split("T")[0];
      dispatch(setDateRedux(date));
    }
    // 2. Số phiếu
    if (first.so_phieu) {
      dispatch(setDocumentNumberRedux(first.so_phieu));
    }
    // 3. Số phiếu đề nghị
    if (first.so_phieu_de_nghi) {
      dispatch(setDocumentRequestNumberRedux(first.so_phieu_de_nghi));
    }
    // 4. Mã đối tượng (nhà cung cấp)
    if (first.ma_doi_tuong) {
      dispatch(setSupplierRedux({
        code: first.ma_doi_tuong,
        name: first.ten_doi_tuong || "",
        taxId: first.tax_id || "",
        address: first.address || ""
      }));
    }
    // 5. Ghi chú kho nhận
    if (first.ma_kho_nhan) {
      dispatch(setSlipNote({ selectedWarehouse: first.ma_kho_nhan, notesOfSlip: "" }));
    }

    // 6. Dữ liệu bảng sản phẩm
    const items = apiDataArray.map((row: any) => ({
      id: row.STT,
      code: row.ma_hang,
      name: row.ten_hang,
      unit: "",
      quantity: Number(row.so_luong),
      price: 0,
      value: 0,
      notes: "",
    }));
    dispatch(setItems(items));
  
  };

  // Thêm hàm này trong component InventoryReport
  const handleEditClick = async () => {
    if (!selectedSoPhieu) {
      setErrorMessage("Vui lòng chọn 1 số phiếu để edit");
      return;
    }
    try {
      const response = await fetch(
        `${API_inventory_stock_by_so_phieu}?so_phieu=${selectedSoPhieu}`
      );
      if (!response.ok) throw new Error("API error");
      const data = await response.json();
      console.log(data);
      // GỌI mapApiDataToForm ở đây!
      if (Array.isArray(data) && data.length > 0) {
        mapApiDataToForm(data);
      }
      // Chuyển sang tab nhập kho
      dispatch(setActiveTab(TAB_NAMES.NHAP_KHO));
      // Bạn có thể truyền data sang tab mới nếu cần
    } catch (err) {
      setErrorMessage("Không thể lấy dữ liệu từ API!");
    }
  };

  return (
    <div className="card mt-3">
      <div className="card-header text-center">
        <h5 className="card-title mb-0">BÁO CÁO TỒN KHO</h5>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-6">
            <DateComponentFilterForm />
          </div>
          <div className="col-md-3">
            <DocumentNumberFilterForm/>
          </div>
          <div className="col-md-3">
            <DocumentRequestNumberFilterForm />
          </div>
        </div>

        <div className="row g-3 mt-1">
          <div className="col-md-6">
            <SupplierComponentFilterForm />
          </div>
          <div className="col-md-6">
            <ProductComponentFilterForm />
          </div>
        </div>

        {/* Truyền selectedProduct vào InventoryTableStockReceiveSlip */}
        <InventoryTableStockReceiveSlip 
        onInventoryTableChange={handleInventoryTableChange}
        onRowSelect={setSelectedSoPhieu}
        />

        <div className="d-flex justify-content-between gap-2 mt-3">  
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-outline-secondary">
              Export all data
            </button>
            <button type="button" className="btn btn-outline-secondary">
              Export current data
            </button>
          </div>
          <div className="d-flex gap-2">
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button 
              type="button" 
              className="btn btn-danger"
              onClick={() => {
                if (!selectedSoPhieu) {
                  setErrorMessage("Vui lòng chọn 1 số phiếu để delete");
                } else {
                  console.log(selectedSoPhieu);
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      {/* Error Popup */}
      <PopupFadeout message={errorMessage} onClose={() => setErrorMessage(null)} />
      {/* Success Popup */}
      <SuccessPopup message={successMessage} onClose={() => setSuccessMessage(null)} />
    </div>
  )
}
