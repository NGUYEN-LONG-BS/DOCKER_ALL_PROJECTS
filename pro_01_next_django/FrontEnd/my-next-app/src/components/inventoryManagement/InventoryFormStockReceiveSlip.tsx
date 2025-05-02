"use client";

import { useState } from "react";
import { DateComponent } from "../date/date-component";
import { DocumentNumberComponent } from "../documentNumber/document-number-component";
import { SupplierComponent } from "./ObjectSupplierComponent";
import { ProductComponent } from "./ObjectProductComponent";
import { InventoryTableStockReceiveSlip } from "./InventoryTableStockReceiveSlip";
import InventoryNoteOfStockReceiveSlip from "./InventoryNoteOfStockReceiveSlip";

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
  const [date, setDate] = useState<string>('');
  const [documentNumber, setDocumentNumber] = useState<string>('');
  // Sử dụng SlipNote interface để lưu trữ kho và ghi chú
  const [slipNote, setSlipNote] = useState<SlipNote>({
    selectedWarehouse: 'Kho A',
    notesOfSlip: '',
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

  // Handle the save button click
  const handleSave = () => {
    const data = {
      date: date,
      documentNumber: documentNumber,
      supplier: supplier,
      slipNote: slipNote,
      inventoryTable: inventoryTable,
    };

    console.log(JSON.stringify(data, null, 2)); // Log the data as a formatted JSON string
  };

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
          <div className="col-md-6">
            <DateComponent />
          </div>
          <div className="col-md-6">
            <DocumentNumberComponent />
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
          <button type="button" className="btn btn-outline-secondary">
            Template
          </button>
          <button type="button" className="btn btn-outline-secondary">
            Get file
          </button>
          <button type="button" className="btn btn-outline-secondary">
            Print
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={handleSave}>
            Save
          </button>
          <button type="button" className="btn btn-primary">
            Update
          </button>
        </div>
      </div>
    </div>
  )
}
