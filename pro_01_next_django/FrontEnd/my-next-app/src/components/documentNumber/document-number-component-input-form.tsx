// src/components/documentNumber/document-number-component-input-form.tsx
"use client";

import React from "react";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { setDocumentNumber, fetchNewDocumentNumber } from "@/features/formReceiptSlip/documentNumberSlice";
import { RootState } from "@/store/store";
import { RefreshCw } from "lucide-react";

// Define props interface (documentNumber is optional, as it's now from Redux)
interface DocumentNumberProps {
  documentNumber?: string; // Optional, as state is managed by Redux
}

export function DocumentNumberComponent({ documentNumber: propDocumentNumber }: DocumentNumberProps) {
  const dispatch = useAppDispatch();
  // Retrieve documentNumber from Redux store with fallback
  const documentNumber = useAppSelector((state: RootState) => state.documentNumber.documentNumber) || propDocumentNumber || "TB-PNK-250001";
  const loading = useAppSelector((state: RootState) => state.documentNumber.loading);

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