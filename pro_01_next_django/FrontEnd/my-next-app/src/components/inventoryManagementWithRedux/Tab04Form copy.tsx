"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInventory,
  clearItems,
} from "../../../features/inventory/inventorySlice";
import {
  setDate,
  setDocumentNumber,
  setDocumentRequestNumber,
  setSlipNote,
  setSupplier,
  setSelectedProduct,
  setSelectedFile,
  setError,
  setSuccess,
  clearForm,
  importFile,
} from "../../../features/form/formSlice";
import { RootState } from "../../../app/store";
import { DateComponent } from "../../date/date-component";
import { DocumentNumberComponent } from "../../documentNumber/document-number-component";
import { DocumentRequestNumberComponent } from "../../documentRequestNumber/document-request-number-component";
import { SupplierComponent } from "./ObjectSupplierComponent";
import { ProductComponent } from "./ObjectProductComponent";
import { InventoryTableStockReceiveSlip } from "./Tab04Table";
import InventoryNoteOfStockReceiveSlip from "./InventoryNoteOfStockReceiveSlip";
import PopupFadeout from "../../popups/errorPopupComponentTypeFadeOutNum01";
import SuccessPopup from "../../popups/successPopupComponentTypeFadeOutNum01";

// Define interfaces
interface Supplier {
  code: string;
  name: string;
  taxId: string;
  address: string;
}

interface SlipNote {
  selectedWarehouse: string;
  notesOfSlip: string;
}

interface Product {
  code: string;
  name: string;
  unit: string;
  quantity: number;
  price: number;
  notes: string;
}

export function InventoryLogStockReceiveSlip() {
  const dispatch = useDispatch();
  const {
    date,
    documentNumber,
    documentRequestNumber,
    slipNote,
    supplier,
    selectedProduct,
    selectedFile,
    status: formStatus,
    error,
    success,
  } = useSelector((state: RootState) => state.form);
  const { status: inventoryStatus } = useSelector((state: RootState) => state.inventory);
  const [localFile, setLocalFile] = useState<File | null>(null); // Local state for File object

  // Fetch inventory data on mount
  useEffect(() => {
    if (inventoryStatus === "idle") {
      dispatch(fetchInventory());
    }
  }, [inventoryStatus, dispatch]);

  // Handle inventory table changes
  const handleInventoryTableChange = (newInventoryItems: any[]) => {
    console.log("Inventory table updated:", newInventoryItems);
    // No need to dispatch here, as table manages its own state in Redux
  };

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setLocalFile(file);
      dispatch(setSelectedFile(file.name)); // Store file name in Redux
      dispatch(setError(null));
    } else {
      dispatch(setError("No file selected"));
    }
  };

  // Handle file import
  const handleImportFile = () => {
    if (!localFile) {
      dispatch(setError("Please select a file to import"));
      return;
    }
    dispatch(importFile(localFile));
  };

  // Refetch inventory data after successful file import
  useEffect(() => {
    if (formStatus === "succeeded" && success) {
      dispatch(fetchInventory());
    }
  }, [formStatus, success, dispatch]);

  // Handle date change
  const handleDateChange = (newDate: string) => {
    dispatch(setDate(newDate));
  };

  // Handle document number change
  const handleDocumentNumberChange = (newDocumentNumber: string) => {
    dispatch(setDocumentNumber(newDocumentNumber));
  };

  // Handle document request number change
  const handleDocumentRequestNumberChange = (newDocumentRequestNumber: string) => {
    dispatch(setDocumentRequestNumber(newDocumentRequestNumber));
  };

  // Handle supplier change
  const handleSupplierChange = (newSupplier: Supplier) => {
    dispatch(setSupplier(newSupplier));
  };

  // Handle warehouse change
  const handleWarehouseChange = (newWarehouse: string) => {
    dispatch(setSlipNote({ ...slipNote, selectedWarehouse: newWarehouse }));
  };

  // Handle notes change
  const handleNotesChange = (newNotes: string) => {
    dispatch(setSlipNote({ ...slipNote, notesOfSlip: newNotes }));
  };

  // Handle product change
  const handleProductChange = (product: Product) => {
    dispatch(setSelectedProduct(product));
  };

  // Handle ALL data button
  const handleAllData = () => {
    dispatch(fetchInventory());
    dispatch(setSuccess("All data fetched!"));
  };

  // Handle Export data button
  const handleExportData = () => {
    console.log("Exporting data...");
    dispatch(setSuccess("Data export triggered!"));
    // Implement export logic (e.g., download CSV) if needed
  };

  // Handle Edit button
  const handleEdit = () => {
    console.log("Edit mode activated...");
    dispatch(setSuccess("Edit mode activated!"));
    // Implement edit logic if needed
  };

  // Handle Clear form button (optional, added for completeness)
  const handleClearForm = () => {
    dispatch(clearForm());
    dispatch(clearItems());
    setLocalFile(null);
  };

  return (
    <div className="card mt-3">
      <div className="card-header text-center">
        <h5 className="card-title mb-0">NHẬT KÝ NHẬP KHO</h5>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-4">
            <DateComponent initialDate={date} onDateChange={handleDateChange} />
          </div>
          <div className="col-md-4">
            <DocumentNumberComponent
              documentNumber={documentNumber}
              setDocumentNumber={handleDocumentNumberChange}
            />
          </div>
          <div className="col-md-4">
            <DocumentRequestNumberComponent
              documentNumber={documentRequestNumber}
              setDocumentNumber={handleDocumentRequestNumberChange}
            />
          </div>
        </div>

        <div className="row g-3 mt-1">
          <div className="col-md-6">
            <SupplierComponent onSupplierChange={handleSupplierChange} />
            <InventoryNoteOfStockReceiveSlip
              selectedWarehouse={slipNote.selectedWarehouse}
              notesOfSlip={slipNote.notesOfSlip}
              onWarehouseChange={handleWarehouseChange}
              onNotesChange={handleNotesChange}
            />
          </div>
          <div className="col-md-6">
            <ProductComponent onProductChange={handleProductChange} />
          </div>
        </div>

        {/* File Import Section */}
        <div className="row g-3 mt-3">
          <div className="col-md-6">
            <input
              type="file"
              className="form-control"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
            />
          </div>
          <div className="col-md-6">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleImportFile}
              disabled={!localFile}
            >
              Import Data File
            </button>
          </div>
        </div>

        <InventoryTableStockReceiveSlip
          product={selectedProduct}
          onInventoryTableChange={handleInventoryTableChange}
        />

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button type="button" className="btn btn-outline-secondary" onClick={handleAllData}>
            ALL data
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={handleExportData}>
            Export data
          </button>
          <button type="button" className="btn btn-primary" onClick={handleEdit}>
            Edit
          </button>
          <button type="button" className="btn btn-outline-danger" onClick={handleClearForm}>
            Clear Form
          </button>
        </div>
      </div>
      {/* Error Popup */}
      <PopupFadeout message={error} onClose={() => dispatch(setError(null))} />
      {/* Success Popup */}
      <SuccessPopup message={success} onClose={() => dispatch(setSuccess(null))} />
    </div>
  );
}