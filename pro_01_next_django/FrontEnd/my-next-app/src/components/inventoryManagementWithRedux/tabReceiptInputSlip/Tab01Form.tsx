// src/components/inventoryManagementWithRedux/Tab01Form.tsx
"use client";

import React, { useEffect } from "react";
import axios from 'axios';
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setDate } from "@/features/formReceiptSlip/dateSlice";
import { setDocumentNumber } from "@/features/formReceiptSlip/documentNumberSlice";
import { setDocumentRequestNumber } from "@/features/formReceiptSlip/documentRequestNumberSlice";
import { setSupplier } from "@/features/formReceiptSlip/supplierInputFormSlice";
import {
  setInventoryTable,
  setSelectedProduct,
  setSelectedFile,
  setErrorMessage,
  setSuccessMessage,
  saveInventory,
  downloadImportTemplate,
  downloadPrintTemplate,
  importFile,
} from "@/features/formReceiptSlip/formReceiptSlipSlice";
import { setItems } from "@/features/formReceiptSlip/inventoryTableSlice";
import { RootState } from "@/store/store";
import { DateComponent } from "@/components/date/dateComponentInputForm";
import { DocumentNumberComponent } from "@/components/documentNumber/document-number-component-input-form";
import { DocumentRequestNumberComponent } from "@/components/documentRequestNumber/document-request-number-component-input-form";
import { SupplierComponent } from "@/components/objectSupplier/ObjectSupplierComponentInputForm";
import { ProductComponent } from "@/components/objectProduct/SearchInventoryFromAPIComponentOnInputForm";
import { InventoryTableStockReceiveSlip } from "./Tab01Table";
import InventoryNoteOfStockReceiveSlip from "../InventoryNoteOfStockReceiveSlip";
import PopupFadeout from "@/components/popups/errorPopupComponentTypeFadeOutNum01";
import SuccessPopup from "@/components/popups/successPopupComponentTypeFadeOutNum01";
import { API_check_so_phieu } from '@/api/api';
import { useSyncUserIdFromLocalStorage } from '@/utils/useSyncUserIdFromLocalStorage';
import { getCreateStatus } from '@/utils/getRecordStatus';

// Định nghĩa InventoryItemExport interface
interface InventoryItemExport {
  id: number;
  code: string;
  name: string;
  unit: string;
  quantity: number;
  price: number;
  value: number;
  notes: string;
}

interface Supplier {
  code: string;
  name: string;
  taxId: string;
  address: string;
}

export function InventoryFormStockReceiveSlip() {
  useSyncUserIdFromLocalStorage();
  const userId = useAppSelector((state: RootState) => state.user.userId);

  const dispatch = useAppDispatch();
  // Select state from different slices
  const date = useAppSelector((state: RootState) => state.date.date);
  const documentNumber = useAppSelector((state: RootState) => state.documentNumber.documentNumber);
  const documentRequestNumber = useAppSelector((state: RootState) => state.documentRequestNumber.documentRequestNumber);
  const supplier = useAppSelector((state: RootState) => state.supplier.supplier);
  const slipNote = useAppSelector((state: RootState) => state.slipNote.slipNote);
  const { inventoryTable, selectedProduct, errorMessage, successMessage, selectedFile, loading } = useAppSelector(
    (state: RootState) => state.inventory
  );
  const productItems = useAppSelector((state: RootState) => state.product.items);
  const tableItems = useAppSelector((state: RootState) => state.inventoryTable.items);
  const inventoryItem = useAppSelector((state: RootState) => state.product.inventoryItem); // Lấy inventoryItem

  // Đồng bộ selectedProduct với inventoryItem
  useEffect(() => {
    if (
      inventoryItem.code &&
      (selectedProduct.code !== inventoryItem.code ||
        selectedProduct.quantity !== inventoryItem.quantity ||
        selectedProduct.price !== inventoryItem.price ||
        selectedProduct.notes !== inventoryItem.notes)
    ) {
      console.log("Syncing selectedProduct with inventoryItem:", inventoryItem);
      dispatch(setSelectedProduct(inventoryItem));
    }
  }, [dispatch, inventoryItem, selectedProduct]);

  // Sync inventoryTable with product.items
  useEffect(() => {
    if (JSON.stringify(inventoryTable) !== JSON.stringify(productItems)) {
      dispatch(setInventoryTable(productItems));
    }
  }, [dispatch, productItems, inventoryTable]);
    
  // // Log selected product for debugging
  // useEffect(() => {
  //     console.log("Tab01Form - Selected Product:", selectedProduct);
  //   }, [selectedProduct]);

  const handleInventoryTableChange = (newInventoryItems: InventoryItemExport[]) => {
    dispatch(setInventoryTable(newInventoryItems));
  };

  // Handle save action
  const handleSave = async () => {
    // Log state của bảng (items từ inventoryTableSlice)
    console.log("Tab01Form - Inventory Table State on Save:", tableItems);

    // Validate documentNumber
    if (!documentNumber) {
      dispatch(setErrorMessage("Vui lòng nhập số phiếu"));
      return;
    }

    // Kiểm tra documentRequestNumber (so_phieu_de_nghi)
    if (!documentRequestNumber || documentRequestNumber.trim() === "") {
      dispatch(setErrorMessage("Vui lòng nhập số phiếu đề nghị"));
      return;
    }

    // Kiểm tra ma_doi_tuong (supplier.code)
    if (!supplier.code || supplier.code.trim() === "") {
      dispatch(setErrorMessage("Vui lòng nhập mã đối tượng (nhà cung cấp)"));
      return;
    }

    // Validate inventoryTable
    if (!tableItems || !Array.isArray(tableItems) || tableItems.length === 0) {
      console.warn("inventoryTable is empty or invalid:", tableItems);
      dispatch(setErrorMessage("Vui lòng thêm một sản phẩm vào bảng"));
      return;
    }

    // Kiểm tra số phiếu qua API
    try {
      const myApi = `${API_check_so_phieu}?so_phieu=${encodeURIComponent(documentNumber)}`;
      console.log("myApi:", myApi);
      const response = await axios.get(myApi, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.existed) {
        dispatch(setErrorMessage("Số phiếu đã tồn tại. Vui lòng chọn số phiếu khác."));
        return;
      }
    } catch (error: any) {
      console.error("Lỗi khi kiểm tra số phiếu:", error);
      console.error("Lỗi khi kiểm tra số phiếu:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
      });
      dispatch(setErrorMessage("Không thể kiểm tra số phiếu. Vui lòng thử lại."));
      return;
    }
    
    // Tạo ngày hiện tại ở định dạng ISO
    const currentDate = new Date().toISOString();
    // Chuyển đổi date thành định dạng ISO (chỉ lấy phần ngày)
    const formattedDate = date ? new Date(date).toISOString().split('T')[0] + 'T00:00:00Z' : currentDate;

    // Thêm model_key vào từng object gửi lên backend
    const data = tableItems.map((item, index) => {
      if (!item || typeof item !== "object") {
        console.warn(`Invalid item at index ${index}:`, item);
        return {};
      }
      return {
        model_key: "TB", // Thêm model_key cố định
        date,
        so_phieu: documentNumber,
        id_nhan_vien: userId,
        xoa_sua: getCreateStatus(),
        phan_loai_nhap_xuat_hoan: "receipt",
        ma_doi_tuong: supplier.code || "",
        ngay_tren_phieu: date,
        so_phieu_de_nghi: documentRequestNumber,
        thong_tin_them: slipNote.notesOfSlip,
        ma_kho_nhan: slipNote.selectedWarehouse || ".",
        ma_kho_xuat: ".",
        stt_dong: index + 1,
        ma_hang: item.code || "",
        ten_hang: item.name || "",
        don_vi_tinh: item.unit || "",
        so_luong: item.quantity > 0 ? item.quantity : 1,
        don_gia: item.price > 0 ? item.price : 1,
        thanh_tien: item.value || 0,
        ghi_chu_sp: item.notes || "",
      };
    });
    // Log the mapped data for debugging
    console.log("Tab01Form - Data to save:", data);

    dispatch(saveInventory(data));
  };

  // Handle template download
  const handleTemplateClick = () => {
      dispatch(downloadImportTemplate());
    };

  // Handle print template download
    const handlePrintClick = () => {
      dispatch(downloadPrintTemplate());
    };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file) {
        console.log("File selected:", file.name);
        dispatch(setSelectedFile(file));
        dispatch(setErrorMessage(""));
      } else {
        dispatch(setErrorMessage("No file selected"));
      }
    }
  };

  // Handle file import
  const handleImportFile = () => {
    if (!selectedFile) {
      dispatch(setErrorMessage("Please select a file to import"));
      return;
    }
    dispatch(importFile(selectedFile));
  };

  // Hàm cập nhật thông tin nhà cung cấp từ SupplierComponent
  const handleSupplierChange = (newSupplier: Supplier) => {
    dispatch(setSupplier(newSupplier));
  };

  // Hàm xử lý khi sản phẩm thay đổi
  const handleProductChange = (product: any) => {
    // Map dữ liệu từ ProductComponent (API) sang InventoryItemExport
    const mappedProduct: InventoryItemExport = {
      id: 0, // hoặc có thể tạo id tự tăng nếu cần
      code: product.ma_hang || product.code || "",
      name: product.ten_hang || product.name || "",
      unit: product.dvt || product.unit || "",
      quantity: product.quantity ? Number(product.quantity) : 0,
      price: product.unitPrice ? Number(product.unitPrice) : 0,
      value: product.value ? Number(product.value) : 0,
      notes: product.notes || "",
    };
    console.log("Tab01Form - Received product from ProductComponent (mapped):", mappedProduct);
    dispatch(setSelectedProduct(mappedProduct));
  };

  return (
    <div className="card mt-3">
      <div className="card-header text-center">
        <h5 className="card-title mb-0">PHIẾU NHẬP KHO</h5>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-4">
            <DateComponent />
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
            <SupplierComponent onSupplierChange={handleSupplierChange} />
            <InventoryNoteOfStockReceiveSlip />
          </div>
          <div className="col-md-6">
            <ProductComponent onProductChange={handleProductChange} />
          </div>
        </div>

        <InventoryTableStockReceiveSlip
          product={selectedProduct}
          onInventoryTableChange={handleInventoryTableChange}
        />

        <div className="d-flex justify-content-between gap-2 mt-3">
          <div className="d-flex gap-2">
            <button 
              type="button" 
              className="btn btn-outline-secondary" 
              onClick={handleTemplateClick}
              disabled={loading}
              >
              Template
            </button>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="import-file-input"
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => document.getElementById("import-file-input")?.click()}
              disabled={loading}
            >
              Import the data file
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleImportFile}
              disabled={loading || !selectedFile}
            >
              Import
            </button>
          </div>
          <div className="d-flex gap-2">
            <button 
            type="button" 
            className="btn btn-outline-secondary" 
            onClick={handlePrintClick}
            disabled={loading}
            >
              Print
            </button>
            <button 
              type="button" 
              className="btn btn-primary" 
              onClick={handleSave}
              disabled={loading}
              >
              Save
            </button>
            <button 
              type="button" 
              className="btn btn-outline-secondary" 
              disabled={loading}>
              Update
            </button>
          </div>
        </div>
      </div>
      <PopupFadeout message={errorMessage} onClose={() => dispatch(setErrorMessage(null))} />
      <SuccessPopup message={successMessage} onClose={() => dispatch(setSuccessMessage(null))} />
    </div>
  );
}