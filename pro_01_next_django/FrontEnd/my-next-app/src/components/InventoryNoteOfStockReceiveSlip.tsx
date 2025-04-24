'use client';

import { useState } from 'react';

const mockWarehouses = ['Kho A', 'Kho B', 'Kho C']; // Danh sách kho mẫu

const InventoryNoteOfStockReceiveSlip = () => {
  const [selectedWarehouse, setSelectedWarehouse] = useState('Kho A');
  const [notes, setNotes] = useState('');

  const handleWarehouseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWarehouse(event.target.value);
  };

  const handleNotesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(event.target.value);
  };

  return (
    
    <div className="card-body py-2">
        <div className="row g-1">
            {/* Dropdown for kho */}
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

            {/* Notes input */}
            <div className="col-md-9">
                <input
                type="text"
                className="form-control"
                id="Product-notes"
                placeholder="thông tin thêm"
                value={notes}
                onChange={handleNotesChange}
                />
            </div>
        </div>
    </div>
    
  );
};

export default InventoryNoteOfStockReceiveSlip;
