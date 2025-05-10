"use client";
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { DateComponent } from "../date/date-component-with-rkt";
import { DocumentNumberComponent } from "../documentNumber/document-number-component-with-rkt";
import { DocumentRequestNumberComponent } from "../documentRequestNumber/document-request-number-component-with-rkt";
import { SupplierComponent } from "./ObjectSupplierComponent";
import { ProductComponent } from "./ObjectProductComponent";
import { InventoryTableStockReceiveSlip } from "./Tab01Table";
import InventoryNoteOfStockReceiveSlip from "./InventoryNoteOfStockReceiveSlip";
import PopupFadeout from "../popups/errorPopupComponentTypeFadeOutNum01";
import SuccessPopup from "../popups/successPopupComponentTypeFadeOutNum01";

import {
  setDate,
  setDocumentNumber,
  setDocumentRequestNumber,
  setSlipNote,
  setSupplier,
  setInventoryTable,
  setSelectedProduct,
  setErrorMessage,
  setSuccessMessage,
  setSelectedFile,
} from '../../features/formReceiptSlip/inventorySlice';
import { RootState } from '../../store';

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

// Define the Supplier interface
interface Supplier {
  code: string;
  name: string;
  taxId: string;
  address: string;
}

export function InventoryFormStockReceiveSlip() {
  const dispatch = useDispatch();
  const {
    date,
    documentNumber,
    documentRequestNumber,
    slipNote,
    supplier,
    inventoryTable,
    selectedProduct,
    errorMessage,
    successMessage,
    selectedFile,
  } = useSelector((state: RootState) => state.inventory);

  // Hàm cập nhật bảng thông tin tồn kho
  const handleInventoryTableChange = (newInventoryItems: InventoryItemExport[]) => {
    dispatch(setInventoryTable(newInventoryItems));
  };

  const handleSave = async () => {
    const data = inventoryTable.map((item) => ({
      date,
      so_phieu: documentNumber,
      id_nhan_vien: 'NV01',
      xoa_sua: 'new',
      phan_loai_nhap_xuat_hoan: 'receipt',
      ma_doi_tuong: supplier.code || 'madoituong',
      ngay_tren_phieu: date,
      so_phieu_de_nghi: documentRequestNumber,
      thong_tin_them: slipNote.notesOfSlip,
      ma_kho_nhan: slipNote.selectedWarehouse || '.',
      ma_kho_xuat: '.',
      stt_dong: 1,
      ma_hang: item.code,
      ten_hang: item.name,
      don_vi_tinh: item.unit,
      so_luong: item.quantity > 0 ? item.quantity : 1,
      don_gia: item.price > 0 ? item.price : 1,
      thanh_tien: item.quantity > 0 && item.price > 0 ? item.quantity * item.price : 0,
      ghi_chu_sp: item.notes,
    }));

    console.log('Sending data:', JSON.stringify(data, null, 2));

    try {
      const response = await axios.post('http://localhost:8000/api/save-inventory/', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch(setSuccessMessage('Lưu thành công!'));
    } catch (error) {
      dispatch(setErrorMessage('Gửi thông tin thất bại!'));
    }
  };

  const handleTemplateClick = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/download-import-template/', {
        responseType: 'blob',
      });
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = fileURL;
      link.setAttribute('download', 'Import_template.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  const handlePrintClick = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/download-print-template/', {
        responseType: 'blob',
      });
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = fileURL;
      link.setAttribute('download', 'Print_template.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file) {
        console.log('File selected:', file.name);
        dispatch(setSelectedFile(file));
        dispatch(setErrorMessage(''));
      } else {
        dispatch(setErrorMessage('No file selected'));
      }
    }
  };

  const handleImportFile = async () => {
    if (!selectedFile) {
      dispatch(setErrorMessage('Please select a file to import'));
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:8000/api/import-data/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File imported successfully:', response.data);
      dispatch(setSuccessMessage('File imported successfully!'));
    } catch (error) {
      console.error('Error importing file:', error);
      dispatch(setErrorMessage('Error importing file'));
    }
  };

  // Hàm cập nhật thông tin nhà cung cấp từ SupplierComponent
  const handleSupplierChange = (newSupplier: Supplier) => {
    dispatch(setSupplier(newSupplier));
  };

  // Hàm xử lý khi sản phẩm thay đổi
  const handleProductChange = (product: InventoryItemExport) => {
    dispatch(setSelectedProduct(product));
  };

  return (
    <div className="card mt-3">
      <div className="card-header text-center">
        <h5 className="card-title mb-0">PHIẾU NHẬP KHO</h5>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-4">
            <DateComponent/>
          </div>
          <div className="col-md-4">
            <DocumentNumberComponent/>
          </div>
          <div className="col-md-4">
            <DocumentRequestNumberComponent/>
          </div>
        </div>

        <div className="row g-3 mt-1">
          <div className="col-md-6">
            <SupplierComponent onSupplierChange={handleSupplierChange} />
            {/* <InventoryNoteOfStockReceiveSlip
              selectedWarehouse={slipNote.selectedWarehouse}
              notesOfSlip={slipNote.notesOfSlip}
              onWarehouseChange={handleWarehouseChange}
              onNotesChange={handleNotesChange}
            /> */}
            <InventoryNoteOfStockReceiveSlip/>
          </div>
          <div className="col-md-6">
            <ProductComponent/>
          </div>
        </div>

        <InventoryTableStockReceiveSlip
          product={selectedProduct}
          onInventoryTableChange={handleInventoryTableChange}
        />

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button type="button" className="btn btn-outline-secondary" onClick={handleTemplateClick}>
            Template
          </button>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="import-file-input"
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => document.getElementById('import-file-input')?.click()}
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
      <PopupFadeout message={errorMessage} onClose={() => dispatch(setErrorMessage(null))} />
      <SuccessPopup message={successMessage} onClose={() => dispatch(setSuccessMessage(null))} />
    </div>
  );
}