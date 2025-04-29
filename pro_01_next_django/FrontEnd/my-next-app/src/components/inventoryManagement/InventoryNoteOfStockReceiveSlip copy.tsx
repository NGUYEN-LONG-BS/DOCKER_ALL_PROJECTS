'use client';

import { useState } from 'react';

// Danh sách kho mẫu
const mockWarehouses = ['Kho A', 'Kho B', 'Kho C'];

// Định nghĩa interface cho props của InventoryNoteOfStockReceiveSlip
interface InventoryNoteOfStockReceiveSlipProps {
  selectedWarehouse: string;        // Giá trị kho đã chọn
  notesOfSlip: string;                    // Giá trị ghi chú
  onWarehouseChange: (newWarehouse: string) => void;  // Hàm callback khi kho thay đổi
  onNotesChange: (newNotes: string) => void;          // Hàm callback khi ghi chú thay đổi
}

const InventoryNoteOfStockReceiveSlip = ({
  selectedWarehouse,
  notesOfSlip,
  onWarehouseChange,
  onNotesChange,
}: InventoryNoteOfStockReceiveSlipProps) => {
  // Hàm xử lý khi kho thay đổi
  const handleWarehouseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onWarehouseChange(event.target.value); // Truyền giá trị kho về component cha
  };

  // Hàm xử lý khi ghi chú thay đổi
  const handleNotesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onNotesChange(event.target.value); // Truyền giá trị ghi chú về component cha
  };

  return (
    <div className="card-body py-2">
      <div className="row g-1">
        {/* Dropdown cho kho */}
        <div className="col-md-3">
          <select
            className="form-control"
            id="Product-warehouse"
            value={selectedWarehouse}
            onChange={handleWarehouseChange}
          >
            {mockWarehouses.map((warehouse, index) => (
              <option key={index} value={warehouse}>
                {warehouse}
              </option>
            ))}
          </select>
        </div>

        {/* Input cho ghi chú */}
        <div className="col-md-9">
          <input
            type="text"
            className="form-control"
            id="Product-notes"
            placeholder="thông tin thêm"
            value={notesOfSlip}
            onChange={handleNotesChange}
          />
        </div>
      </div>
    </div>
  );
};

export default InventoryNoteOfStockReceiveSlip;
