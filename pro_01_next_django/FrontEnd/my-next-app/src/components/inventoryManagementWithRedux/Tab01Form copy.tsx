// src/components/inventoryManagementWithRedux/Tab01Form.tsx
"use client";

import React, { useEffect } from "react";
import axios from 'axios';
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setDate } from "../../features/formReceiptSlip/dateSlice";
import { setDocumentNumber } from "../../features/formReceiptSlip/documentNumberSlice";
import { setDocumentRequestNumber } from "../../features/formReceiptSlip/documentRequestNumberSlice";
import { setSupplier } from "../../features/formReceiptSlip/supplierSlice";
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
} from "../../features/formReceiptSlip/formReceiptSlipSlice";
import { setItems } from "../../features/formReceiptSlip/inventoryTableSlice";
import { RootState } from "../../store/store";
import { DateComponent } from "../date/date-component-with-rkt";
import { DocumentNumberComponent } from "../documentNumber/document-number-component-with-rkt";
import { DocumentRequestNumberComponent } from "../documentRequestNumber/document-request-number-component-with-rkt";
import { SupplierComponent } from "./ObjectSupplierComponent";
import { ProductComponent } from "./ObjectProductComponent";
import { InventoryTableStockReceiveSlip } from "./Tab01Table";
import InventoryNoteOfStockReceiveSlip from "./InventoryNoteOfStockReceiveSlip";
import PopupFadeout from "../popups/errorPopupComponentTypeFadeOutNum01";
import SuccessPopup from "../popups/successPopupComponentTypeFadeOutNum01";
import { API_CHECK_SO_PHIEU_ENDPOINT } from '@/api/api';

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
  const dispatch = useAppDispatch();
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
  const inventoryItem = useAppSelector((state: RootState) => state.product.inventoryItem);

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

  useEffect(() => {
    if (JSON.stringify(inventoryTable) !== JSON.stringify(productItems)) {
      dispatch(setInventoryTable(productItems));
    }
  }, [dispatch, productItems, inventoryTable]);

  const handleInventoryTableChange = (newInventoryItems: InventoryItemExport[]) => {
    dispatch(setInventoryTable(newInventoryItems));
  };

  const handleSave = async () => {
    console.log("Tab01Form - Inventory Table State on Save:", tableItems);
    console.log("Tab01Form - States on Save:", {
      DateComponent: { date },
      DocumentNumberComponent: { documentNumber },
      DocumentRequestNumberComponent: { documentRequestNumber },
      SupplierComponent: { supplier },
      InventoryNoteOfStockReceiveSlip: { slipNote },
      ProductComponent: { selectedProduct },
      InventoryTableStockReceiveSlip: { inventoryTable, tableItems },
      FormStates: { selectedFile: selectedFile ? selectedFile.name : null, loading },
    });

    if (!documentNumber) {
      dispatch(setErrorMessage("Vui lòng nhập số phiếu"));
      return;
    }

    if (!tableItems || !Array.isArray(tableItems) || tableItems.length === 0) {
      console.warn("inventoryTable is empty or invalid:", tableItems);
      dispatch(setErrorMessage("Không có sản phẩm nào để lưu"));
      return;
    }

    try {
      const myApi = `${API_CHECK_SO_PHIEU_ENDPOINT}?so_phieu=${encodeURIComponent(documentNumber)}`;
      console.log("myApi:", myApi);
      const response = await axios.get(myApi, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log("API response:", response.data); // Log để kiểm tra dữ liệu trả về
      if (response.data.existed) {
        dispatch(setErrorMessage("Số phiếu đã tồn tại. Vui lòng chọn số phiếu khác."));
        return;
      }
    } catch (error: any) {
      console.error("Lỗi khi kiểm tra số phiếu:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
      });
      dispatch(setErrorMessage("Không thể kiểm tra số phiếu. Vui lòng thử lại."));
      return;
    }

    const currentDate = new Date().toISOString();
    const formattedDate = date ? new Date(date).toISOString().split('T')[0] + 'T00:00:00Z' : currentDate;

    const data = tableItems.map((item, index) => {
      if (!item || typeof item !== "object") {
        console.warn(`Invalid item at index ${index}:`, item);
        return {};
      }
      return {
        date,
        so_phieu: documentNumber,
        id_nhan_vien: "NV01",
        xoa_sua: "new",
        phan_loai_nhap_xuat_hoan: "receipt",
        ma_doi_tuong: supplier.code || "madoituong",
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

    console.log("Tab01Form - Data to save:", data);
    dispatch(saveInventory(data));
  };

  const handleTemplateClick = () => {
    dispatch(downloadImportTemplate());
  };

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
        dispatch(setErrorMessage("Không có tệp nào được chọn"));
      }
    }
  };

  const handleImportFile = () => {
    if (!selectedFile) {
      dispatch(setErrorMessage("Vui lòng chọn tệp để nhập"));
      return;
    }
    dispatch(importFile(selectedFile));
  };

  const handleSupplierChange = (newSupplier: Supplier) => {
    dispatch(setSupplier(newSupplier));
  };

  const handleProductChange = (product: InventoryItemExport) => {
    console.log("Tab01Form - Received product from ProductComponent:", product);
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

        <div className="d-flex justify-content-end gap-2 mt-3">
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
            Chọn tệp dữ liệu
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleImportFile}
            disabled={loading || !selectedFile}
          >
            Nhập
          </button>
          <button 
            type="button" 
            className="btn btn-outline-secondary" 
            onClick={handlePrintClick}
            disabled={loading}
          >
            In
          </button>
          <button 
            type="button" 
            className="btn btn-primary" 
            onClick={handleSave}
            disabled={loading}
          >
            Lưu
          </button>
          <button type="button" className="btn btn-outline-secondary" disabled={loading}>
            Cập nhật
          </button>
        </div>
      </div>
      <PopupFadeout message={errorMessage} onClose={() => dispatch(setErrorMessage(null))} />
      <SuccessPopup message={successMessage} onClose={() => dispatch(setSuccessMessage(null))} />
    </div>
  );
}