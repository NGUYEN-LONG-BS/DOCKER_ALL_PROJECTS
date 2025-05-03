"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { DateComponent } from "../date/date-component";
import { DocumentNumberComponent } from "../documentNumber/document-number-component";
import { DocumentRequestNumberComponent } from "../documentRequestNumber/document-request-number-component";
import { SupplierComponent } from "./ObjectSupplierComponent";
import { ProductComponent } from "./ObjectProductComponent";
import { InventoryTableStockReceiveSlip } from "./InventoryTableStockReceiveSlip";
import InventoryNoteOfStockReceiveSlip from "./InventoryNoteOfStockReceiveSlip";
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

export function InventoryFormStockReceiveSlip() {

  // State for all components
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [date, setDate] = useState<string>(() => {
    const today = new Date().toISOString().split('T')[0];
    return today;
  });
  const [documentNumber, setDocumentNumber] = useState<string>('');
  // Sử dụng SlipNote interface để lưu trữ kho và ghi chú
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

    const handleSave = async () => {
      // Prepare data with the correct structure
      const data = {
        date: date,
        so_phieu: documentNumber || "DEFAULT_DOC_NUMBER",  // Ensure this is not empty
        id_nhan_vien: 'EMP001234',  // Replace with actual employee code (max 10 characters)
        xoa_sua: 'insert',  // Replace with actual action (insert/update)
        phan_loai_nhap_xuat_hoan: 'receipt',  // Replace with appropriate category
        ma_doi_tuong: supplier.code || "DEFAULT_SUPPLIER_CODE",  // Ensure this is not empty
        ngay_tren_phieu: date,  // Date should be provided
        so_phieu_de_nghi: documentNumber || "DEFAULT_DOC_NUMBER",  // Ensure this is not empty
        thong_tin_them: slipNote.notesOfSlip || "No additional notes",  // Default if empty
        stt_dong: 1,  // Default or dynamically calculated
        ma_kho_nhan: slipNote.selectedWarehouse || "DEFAULT_WAREHOUSE",  // Ensure this is not empty
        ma_kho_xuat: slipNote.selectedWarehouse || "DEFAULT_WAREHOUSE",  // Ensure this is not empty
        inventory_items: inventoryTable.map(item => ({
          ma_hang: item.code || "DEFAULT_ITEM_CODE",  // Ensure item code is not empty
          ten_hang: item.name || "DEFAULT_ITEM_NAME",  // Default if empty
          don_vi_tinh: item.unit || "unit",  // Default if empty
          so_luong: item.quantity > 0 ? item.quantity : 1,  // Ensure quantity is valid (set to 1 if invalid)
          don_gia: item.price > 0 ? item.price : 1,  // Ensure price is valid (set to 1 if invalid)
          thanh_tien: (item.quantity > 0 && item.price > 0) ? item.quantity * item.price : 0,  // Calculate thanh_tien, default to 0 if invalid
          ghi_chu_sp: item.notes || "No notes",  // Default if empty
        }))
      };

      console.log('Sending data:', JSON.stringify(data, null, 2));  // Kiểm tra dữ liệu trước khi gửi

      try {
        const response = await axios.post('http://localhost:8000/api/save-inventory/', data, {
          headers: {
            'Content-Type': 'application/json', // Chỉ cần định nghĩa headers nếu cần
          },
        });

        // console.log('Data saved successfully:', response.data);
        setErrorMessage('Lưu thành công!');
      } catch (error) {
        // console.error('Error saving data:', error);
        setErrorMessage('Gửi thông tin thất bại!');
      }
  };

  const handleTemplateClick = async () => {
    // Bước 1: gửi dữ liệu đi là muốn down file gì, thông tin cần cung cấp là gì, backend sẽ xử lý và trả file về thư mục static/downloads
    // Bước 2: tiến hành download file
    try {
      const response = await axios.get('http://localhost:8000/api/download-import-template/', {
        responseType: 'blob',  // Đảm bảo file được trả về dưới dạng blob
      });

      // Tạo một URL tạm thời cho file blob
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      
      // Tạo một element <a> để tải file
      const link = document.createElement('a');
      link.href = fileURL;
      link.setAttribute('download', 'Import_template.xlsx');  // Tên file khi tải xuống
      document.body.appendChild(link);
      link.click();  // Mô phỏng nhấp chuột để tải file xuống
      document.body.removeChild(link);  // Xóa element sau khi tải xong
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  const handlePrintClick = async () => {
    // Bước 1: gửi dữ liệu đi là muốn down file gì, thông tin cần cung cấp là gì, backend sẽ xử lý và trả file về thư mục static/downloads
    // Bước 2: tiến hành download file
    try {
      const response = await axios.get('http://localhost:8000/api/download-print-template/', {
        responseType: 'blob',  // Đảm bảo file được trả về dưới dạng blob
      });

      // Tạo một URL tạm thời cho file blob
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      
      // Tạo một element <a> để tải file
      const link = document.createElement('a');
      link.href = fileURL;
      link.setAttribute('download', 'Print_template.xlsx');  // Tên file khi tải xuống
      document.body.appendChild(link);
      link.click();  // Mô phỏng nhấp chuột để tải file xuống
      document.body.removeChild(link);  // Xóa element sau khi tải xong
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
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

  // Hàm cập nhật bảng thông tin tồn kho
  const handleInventoryTableChange = (newInventoryItems: InventoryItemExport[]) => {
    setInventoryTable(newInventoryItems);
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
        <h5 className="card-title mb-0">PHIẾU NHẬP KHO</h5>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-4">
            <DateComponent initialDate={date} onDateChange={handleDateChange}/>
          </div>
          <div className="col-md-4">
            <DocumentNumberComponent />
          </div>
          <div className="col-md-4">
            <DocumentRequestNumberComponent />
          </div>
        </div>

        <div className="row g-3 mt-1">
          <div className="col-md-6">
            <SupplierComponent />
            <InventoryNoteOfStockReceiveSlip
            selectedWarehouse={slipNote.selectedWarehouse}  // Truyền giá trị kho vào đây
            notesOfSlip={slipNote.notesOfSlip}              // Truyền ghi chú vào đây
            onWarehouseChange={handleWarehouseChange}  // Callback thay đổi kho
            onNotesChange={handleNotesChange}        // Callback thay đổi ghi chú
          />
          </div>
          <div className="col-md-6">
            <ProductComponent onProductChange={handleProductChange} />
          </div>
        </div>

        {/* Truyền selectedProduct vào InventoryTableStockReceiveSlip */}
        <InventoryTableStockReceiveSlip product={selectedProduct} />

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button type="button" className="btn btn-outline-secondary" onClick={handleTemplateClick}>
            Template
          </button>
          {/* Thêm input file để người dùng chọn file */}
          <input 
            type="file" 
            accept=".xlsx,.xls" // Chỉ cho phép chọn file Excel
            onChange={handleFileChange}
            style={{ display: 'none' }} // Ẩn input file đi, để nút bên dưới làm việc
            id="import-file-input"
          />
          <button 
            type="button" 
            className="btn btn-outline-secondary"
            onClick={() => document.getElementById('import-file-input')?.click()} // Tự động mở cửa sổ chọn file khi nhấn nút
          >
            Import the data file
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={handlePrintClick}>
            Print
          </button>
          <button type="button" className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
          <button type="button" className="btn btn-outline-secondary">
            Update
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
