"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDocumentNumber } from "../../features/formReceiptSlip/inventorySlice";
import { RootState } from "../../store";
import { RefreshCw } from "lucide-react";

// Define props interface (documentNumber is optional, as it's now from Redux)
interface DocumentNumberProps {
  documentNumber?: string; // Optional, as state is managed by Redux
}

export function DocumentNumberComponent({ documentNumber: propDocumentNumber }: DocumentNumberProps) {
  const dispatch = useDispatch();
  // Retrieve documentNumber from Redux store with fallback
  const documentNumber = useSelector((state: RootState) => state.inventory?.documentNumber) || propDocumentNumber || "TB-PNK-250001";

  // Generate a new document number
  const generateNewNumber = () => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const newNumber = `TB-PNK-${randomNum}`;
    dispatch(setDocumentNumber(newNumber)); // Update Redux store
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDocumentNumber(e.target.value)); // Update Redux store
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: "20px" }}>
      <label htmlFor="document-number" className="form-label me-2 mb-0" style={{ whiteSpace: "nowrap" }}>
        Số chứng từ:
      </label>
      <div className="input-group" style={{ maxWidth: "200px" }}>
        <input
          type="text"
          className="form-control text-center"
          id="document-number"
          value={documentNumber}
          onChange={handleInputChange}
        />
        <button
          className="btn btn-outline-secondary btn-icon"
          type="button"
          onClick={generateNewNumber}
          title="Tạo số chứng từ mới"
        >
          <RefreshCw size={16} />
        </button>
      </div>
    </div>
  );
}