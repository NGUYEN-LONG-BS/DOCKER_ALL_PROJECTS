"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DateComponentFilterForm } from "@/components/date/dateComponentFilterForm";
import { DocumentNumberFilterForm } from "@/components/documentNumber/document-number-component-filter-form";
import { DocumentRequestNumberFilterForm } from "@/components/documentRequestNumber/document-request-number-component-filter-form";
import { SupplierComponentFilterForm } from "@/components/objectSupplier/ObjectSupplierComponentFilterForm";
import { ProductComponentFilterForm } from "@/components/objectProduct/ObjectProductComponentFilterForm";
import { InventoryTableStockReceiveSlip } from "./Tab04Table";
import PopupFadeout from "@/components/popups/errorPopupComponentTypeFadeOutNum01";
import SuccessPopup from "@/components/popups/successPopupComponentTypeFadeOutNum01";


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

export function InventoryLogStockReceiveSlip() {

  // State for all components
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [date, setDate] = useState<string>(() => {
    const today = new Date().toISOString().split('T')[0];
    return today;
  });
  const [documentNumber, setDocumentNumber] = useState<string>('TB-PNK-250001');
  const [documentRequestNumber, setDocumentRequestNumber] = useState<string>('TB-DNNK-250001');
  const [slipNote, setSlipNote] = useState<SlipNote>({
    selectedWarehouse: 'Kho A',   // Fallback to 'Kho A' if no value is passed
    notesOfSlip: '',              // Fallback to 'No notes' if no value is passed
  });
  const [supplier, setSupplier] = useState<Supplier>({
    code: '',
    name: '',
    taxId: '',
    address: '',
  });
  const [inventoryTable, setInventoryTable] = useState<InventoryItemExport[]>([]);
  // Hàm cập nhật bảng thông tin tồn kho
  const handleInventoryTableChange = (newInventoryItems: InventoryItemExport[]) => {
    setInventoryTable(newInventoryItems);
  };
  const [selectedSoPhieu, setSelectedSoPhieu] = useState<string | null>(null);

  
  // State for all components
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // State to store the selected file

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
      const response = await axios.post("http://localhost:8000/api/import-data/", formData, {
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
  
  // Thêm hàm này trong component InventoryLogStockReceiveSlip
  const handleEditClick = async () => {
    if (!selectedSoPhieu) {
      setErrorMessage("Vui lòng chọn 1 số phiếu để edit");
      return;
    }
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/inventory-stock-by-so-phieu/?so_phieu=${selectedSoPhieu}`
      );
      if (!response.ok) throw new Error("API error");
      const data = await response.json();
      console.log(data);
      // Bạn có thể xử lý data ở đây nếu muốn
    } catch (err) {
      setErrorMessage("Không thể lấy dữ liệu từ API!");
    }
  };

  // Use useEffect to trigger file import after selectedFile is updated
  useEffect(() => {
    if (selectedFile) {
      handleImportFile(); // Gọi hàm xử lý upload file ngay khi file được chọn
    }
  }, [selectedFile]); // This will run when selectedFile changes


  // Cập nhật giá trị kho
  const handleWarehouseChange = (newWarehouse: string) => {
    setSlipNote((prevState) => ({
      ...prevState,
      selectedWarehouse: newWarehouse,
    }));
  };

  // Cập nhật ghi chú
  const handleNotesChange = (newNotes: string) => {
    setSlipNote((prevState) => ({
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
    setSupplier(newSupplier);
  };

  // Cập nhật state để lưu trữ thông tin sản phẩm với kiểu InventoryItemExport
  const [selectedProduct, setSelectedProduct] = useState<InventoryItemExport>();

  // Hàm xử lý khi sản phẩm thay đổi
  const handleProductChange = (product: InventoryItemExport) => {
    setSelectedProduct(product); // Cập nhật thông tin sản phẩm đã chọn
  };

  return (
    <div className="card mt-3">
      <div className="card-header text-center">
        <h5 className="card-title mb-0">NHẬT KÝ NHẬP KHO</h5>
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
