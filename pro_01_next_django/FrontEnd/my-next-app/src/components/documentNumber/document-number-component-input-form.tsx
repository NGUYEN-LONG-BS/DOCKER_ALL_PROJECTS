// src/components/documentNumber/document-number-component-input-form.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { setDocumentNumber, fetchNewDocumentNumber } from "@/features/formReceiptSlip/documentNumberSlice";
import { RootState } from "@/store/store";
import { RefreshCw } from "lucide-react";
import { getSupplierModelKey } from '@/utils/getPermissionOnDB';

// Đặt map loại phiếu ở đầu file
const SLIP_TYPE_MAP: Record<string, { prefix: string; type: string }> = {
  TB: { prefix: 'TB', type: 'PNK' },
  LA: { prefix: 'LA', type: 'PNK' },
  PA: { prefix: 'PA', type: 'PNK' },
  NAMAN: { prefix: 'NA', type: 'PNK' },
  HANOI: { prefix: 'HN', type: 'PNK' },
  MIENTAY: { prefix: 'MY', type: 'PNK' },
};

// Define props interface (documentNumber is optional, as it's now from Redux)
interface DocumentNumberProps {
  documentNumber?: string; // Optional, as state is managed by Redux
}

export function DocumentNumberComponent({ documentNumber: propDocumentNumber }: DocumentNumberProps) {
  const dispatch = useAppDispatch();
  const [defaultDocNumber, setDefaultDocNumber] = useState('');
  const reduxDocNumber = useAppSelector((state: RootState) => state.documentNumber.documentNumber);
  const loading = useAppSelector((state: RootState) => state.documentNumber.loading);

  useEffect(() => {
    async function getDefaultNumber() {
      let userId = '';
      if (typeof window !== 'undefined') {
        userId = localStorage.getItem('user_id') || '';
      }
      let modelKey = 'TB';
      if (userId) {
        const key = await getSupplierModelKey(userId);
        if (key && SLIP_TYPE_MAP[key]) modelKey = key;
      }
      const slip = SLIP_TYPE_MAP[modelKey] || SLIP_TYPE_MAP['TB'];
      const currentYear = new Date().getFullYear().toString().slice(-2);
      setDefaultDocNumber(`${slip.prefix}-${slip.type}-${currentYear}0001`);
    }
    getDefaultNumber();
  }, []);

  // Retrieve documentNumber from Redux store with fallback
  const documentNumber = reduxDocNumber || propDocumentNumber || defaultDocNumber;

  // Generate a new document number
  const generateNewNumber = () => {
    dispatch(fetchNewDocumentNumber());
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDocumentNumber(e.target.value)); // Update Redux store
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: "20px" }}>
      <label 
        htmlFor="document-number" 
        className="form-label me-2 mb-0" 
        style={{ whiteSpace: "nowrap" }}
        >
        Số chứng từ:
      </label>
      <div className="input-group" style={{ maxWidth: "200px" }}>
        <input
          type="text"
          className="form-control text-center"
          id="document-number"
          value={documentNumber}
          onChange={handleInputChange}
          disabled={loading}
        />
        <button
          className="btn btn-outline-secondary btn-icon"
          type="button"
          onClick={generateNewNumber}
          title="Tạo số chứng từ mới"
          disabled={loading}
        >
          <RefreshCw size={16} />
        </button>
      </div>
    </div>
  );
}