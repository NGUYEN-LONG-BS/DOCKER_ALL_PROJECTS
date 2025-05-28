"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DateComponentFilterForm } from "../date/dateComponentFilterForm";
import { DocumentNumberFilterForm } from "../documentNumber/document-number-component-filter-form";
import { DocumentRequestNumberFilterForm } from "../documentRequestNumber/document-request-number-component-filter-form";
import { SupplierComponentFilterForm } from "../objectSupplier/ObjectSupplierComponentFilterForm";

// import { ProductComponent } from "../objectProduct/ObjectProductComponentInputForm";
import { ProductComponentFilterForm } from "../objectProduct/ObjectProductComponentFilterForm";
import { InventoryTableStockReceiveSlip } from "./Tab04Table";
import PopupFadeout from "../popups/errorPopupComponentTypeFadeOutNum01";
import SuccessPopup from "../popups/successPopupComponentTypeFadeOutNum01";


// Định nghĩa InventoryItemExport interface
interface InventoryItemExport {
  id: number;
  code: string;
  name: string;
  unit: string;
  quantity: number;
  price: number;
  notes: string;
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
  const [inventoryTable, setInventoryTable] = useState<InventoryItemExport[]>([
    { id: 1, 
      code: '', 
      name: '', 
      unit: '', 
      quantity: 0, 
      price: 0, 
      notes: '' },
  ]);
  // Hàm cập nhật bảng thông tin tồn kho
  const handleInventoryTableChange = (newInventoryItems: InventoryItemExport[]) => {
    setInventoryTable(newInventoryItems);
  };

  
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
  const [selectedProduct, setSelectedProduct] = useState<InventoryItemExport>({
    id: Date.now(), // Tạo id tạm thời
    code: '',
    name: '',
    unit: '',
    quantity: 0,
    price: 0,
    notes: '',
  });

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
          <div className="col-md-4">
            <DateComponentFilterForm />
          </div>
          <div className="col-md-4">
            <DocumentNumberFilterForm/>
          </div>
          <div className="col-md-4">
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
        product={selectedProduct} 
        onInventoryTableChange={handleInventoryTableChange}
        />

        <div className="d-flex justify-content-end gap-2 mt-3">          
          <button type="button" className="btn btn-outline-secondary">
            ALl data
          </button>
          <button type="button" className="btn btn-outline-secondary">
            Export data
          </button>
          <button type="button" className="btn btn-primary">
            Edit
          </button>
        </div>
      </div>
      {/* Error Popup */}
      <PopupFadeout message={errorMessage} onClose={() => setErrorMessage(null)} />
      {/* Success Popup */}
      <SuccessPopup message={successMessage} onClose={() => setSuccessMessage(null)} />
    </div>
  )
}
