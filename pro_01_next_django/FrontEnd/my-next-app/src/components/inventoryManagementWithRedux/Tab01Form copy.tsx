// src/components/inventoryManagementWithRedux/Tab01Form.tsx
"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from '@/store';
import { ProductComponent } from "./ObjectProductComponent";
import { InventoryTableStockReceiveSlip } from "./Tab01Table";
import { InventoryItemExport } from '@/features/inventoryTable/inventoryTableSlice';
import { setInventoryTable } from '@/features/formReceiptSlip/formReceiptSlipSlice';
import { setDate } from '@/features/formReceiptSlip/dateSlice';
import { setDocumentNumber } from '@/features/formReceiptSlip/documentNumberSlice';
import { setDocumentRequestNumber } from '@/features/formReceiptSlip/documentRequestNumberSlice';
import { setSupplier } from '@/features/formReceiptSlip/supplierSlice';
import { setSlipNote } from '@/features/formReceiptSlip/slipNoteSlice';

// Giả định các component có sẵn
import { DateComponent } from './DateComponent'; // Giả định
import { DocumentNumberComponent } from './DocumentNumberComponent'; // Giả định
import { DocumentRequestNumberComponent } from './DocumentRequestNumberComponent'; // Giả định
import { SupplierComponent } from './SupplierComponent'; // Giả định
import { SlipNoteComponent } from './SlipNoteComponent'; // Giả định

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

interface FormState {
  date: string;
  documentNumber: string;
  documentRequestNumber: string;
  supplier: Supplier;
  slipNote: SlipNote;
  product: InventoryItemExport;
  items: InventoryItemExport[];
}

export default function Tab01Form() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.inventoryTable);
  const { date } = useAppSelector((state) => state.date);
  const { documentNumber } = useAppSelector((state) => state.documentNumber);
  const { documentRequestNumber } = useAppSelector((state) => state.documentRequestNumber);
  const { supplier } = useAppSelector((state) => state.supplier);
  const { slipNote } = useAppSelector((state) => state.slipNote);

  const [formState, setFormState] = useState<FormState>({
    date: date || new Date().toISOString().split('T')[0],
    documentNumber: documentNumber || 'TB-PNK-250001',
    documentRequestNumber: documentRequestNumber || 'TB-DNNK-250001',
    supplier: supplier || { code: '', name: '', taxId: '', address: '' },
    slipNote: slipNote || { selectedWarehouse: 'Kho A', notesOfSlip: '' },
    product: {
      id: 0,
      code: '',
      name: '',
      unit: '',
      quantity: 0,
      price: 0,
      value: 0,
      notes: '',
    },
    items: items || [],
  });

  // Đồng bộ formState với Redux state
  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      date: date || prev.date,
      documentNumber: documentNumber || prev.documentNumber,
      documentRequestNumber: documentRequestNumber || prev.documentRequestNumber,
      supplier: supplier || prev.supplier,
      slipNote: slipNote || prev.slipNote,
      items: items || prev.items,
    }));
  }, [date, documentNumber, documentRequestNumber, supplier, slipNote, items]);

  const handleProductChange = (newProduct: InventoryItemExport) => {
    console.log("Tab01Form received product:", newProduct);
    setFormState((prev) => ({ ...prev, product: newProduct }));
  };

  const handleInventoryTableChange = (newItems: InventoryItemExport[]) => {
    console.log("Tab01Form received items:", newItems);
    setFormState((prev) => ({ ...prev, items: newItems }));
    dispatch(setInventoryTable(newItems)); // Đồng bộ với formReceiptSlipSlice
  };

  const handleDateChange = (newDate: string) => {
    setFormState((prev) => ({ ...prev, date: newDate }));
    dispatch(setDate(newDate));
  };

  const handleDocumentNumberChange = (newNumber: string) => {
    setFormState((prev) => ({ ...prev, documentNumber: newNumber }));
    dispatch(setDocumentNumber(newNumber));
  };

  const handleDocumentRequestNumberChange = (newNumber: string) => {
    setFormState((prev) => ({ ...prev, documentRequestNumber: newNumber }));
    dispatch(setDocumentRequestNumber(newNumber));
  };

  const handleSupplierChange = (newSupplier: Supplier) => {
    setFormState((prev) => ({ ...prev, supplier: newSupplier }));
    dispatch(setSupplier(newSupplier));
  };

  const handleSlipNoteChange = (newSlipNote: SlipNote) => {
    setFormState((prev) => ({ ...prev, slipNote: newSlipNote }));
    dispatch(setSlipNote(newSlipNote));
  };

  const handleSubmit = () => {
    console.log("Form submitted with data:", formState);
    // Gửi dữ liệu lên server, ví dụ:
    // dispatch(saveInventory(formState.items));
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Phiếu nhập kho</h5>
          <div className="mb-3">
            <label>Ngày:</label>
            <DateComponent
              value={formState.date}
              onChange={handleDateChange}
            />
          </div>
          <div className="mb-3">
            <label>Số chứng từ:</label>
            <DocumentNumberComponent
              value={formState.documentNumber}
              onChange={handleDocumentNumberChange}
            />
          </div>
          <div className="mb-3">
            <label>Số yêu cầu:</label>
            <DocumentRequestNumberComponent
              value={formState.documentRequestNumber}
              onChange={handleDocumentRequestNumberChange}
            />
          </div>
          <div className="mb-3">
            <label>Nhà cung cấp:</label>
            <SupplierComponent
              value={formState.supplier}
              onChange={handleSupplierChange}
            />
          </div>
          <div className="mb-3">
            <label>Thông tin phiếu:</label>
            <SlipNoteComponent
              value={formState.slipNote}
              onChange={handleSlipNoteChange}
            />
          </div>
          <ProductComponent onProductChange={handleProductChange} />
          <InventoryTableStockReceiveSlip
            product={formState.product}
            onInventoryTableChange={handleInventoryTableChange}
          />
          <div className="d-flex justify-content-end mt-3">
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}