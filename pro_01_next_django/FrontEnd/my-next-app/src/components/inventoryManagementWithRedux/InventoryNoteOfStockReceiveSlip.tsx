// src/components/inventoryManagementWithRedux/InventoryNoteOfStockReceiveSlip.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSlipNote } from '../../features/formReceiptSlip/slipNoteSlice';
import { RootState } from '../../store/store';
import { getListOfWarehouse, Warehouse } from '@/utils/getListOfWarehouse';
import { useSyncUserIdFromLocalStorage } from '@/utils/useSyncUserIdFromLocalStorage';

// Định nghĩa interface cho props của InventoryNoteOfStockReceiveSlip
interface InventoryNoteOfStockReceiveSlipProps {
  onWarehouseChange?: (newWarehouse: string) => void;  // Hàm callback khi kho thay đổi
  onNotesChange?: (newNotes: string) => void;          // Hàm callback khi ghi chú thay đổi
}

const InventoryNoteOfStockReceiveSlip = ({
  onWarehouseChange,
  onNotesChange,
}: InventoryNoteOfStockReceiveSlipProps) => {
  const dispatch = useDispatch();

  // Lấy userId từ Redux (đồng bộ với localStorage)
  useSyncUserIdFromLocalStorage();
  const userId = useSelector((state: RootState) => state.user.userId || "");

  // State cho danh sách kho thực tế
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  // Lấy giá trị từ Redux store
  const { selectedWarehouse, notesOfSlip } = useSelector((state: RootState) => state.slipNote.slipNote);

  useEffect(() => {
    if (userId) {
      getListOfWarehouse(userId).then(setWarehouses).catch(() => setWarehouses([]));
    }
  }, [userId]);

  // Hàm xử lý khi kho thay đổi
  const handleWarehouseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newWarehouse = event.target.value;
    dispatch(setSlipNote({ selectedWarehouse: newWarehouse, notesOfSlip })); // Cập nhật Redux store với kho mới
    if (typeof onWarehouseChange === 'function') {
      onWarehouseChange(newWarehouse); // Thông báo về component cha nếu cần
    }
  };

  // Hàm xử lý khi ghi chú thay đổi
  const handleNotesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newNotes = event.target.value;
    dispatch(setSlipNote({ selectedWarehouse, notesOfSlip: newNotes })); // Cập nhật Redux store với ghi chú mới
    if (typeof onNotesChange === 'function') {
      onNotesChange(newNotes); // Thông báo về component cha nếu cần
    }
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
            {warehouses.length === 0 ? (
              <option value="">Đang tải kho...</option>
            ) : (
              warehouses.map((warehouse) => (
                <option key={warehouse.ma_kho} value={warehouse.ma_kho}>
                  {warehouse.ma_kho}
                </option>
              ))
            )}
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