// src/components/documentNumber/document-number-component-with-rkt.tsx
"use client";

import React from "react";
import { useAppSelector, useAppDispatch } from "../../store/store"; // Sử dụng useAppDispatch, useAppSelector
import { setDocumentNumber, fetchNewDocumentNumber } from "../../features/formReceiptSlip/documentNumberSlice";
import { RefreshCw } from "lucide-react";

interface DocumentNumberProps {
  documentNumber?: string;
}

export function DocumentNumberComponent({ documentNumber: propDocumentNumber }: DocumentNumberProps) {
  const dispatch = useAppDispatch(); // Sử dụng useAppDispatch thay vì useDispatch
  const documentNumber = useAppSelector((state) => state.documentNumber.documentNumber) || propDocumentNumber || "TB-PNK-250001";
  const loading = useAppSelector((state) => state.documentNumber.loading);

  const generateNewNumber = () => {
    dispatch(fetchNewDocumentNumber()); // TypeScript sẽ nhận diện đúng
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDocumentNumber(e.target.value));
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