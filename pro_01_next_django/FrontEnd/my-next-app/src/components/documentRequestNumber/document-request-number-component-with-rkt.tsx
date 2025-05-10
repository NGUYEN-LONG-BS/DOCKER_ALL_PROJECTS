"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDocumentRequestNumber } from "../../features/formReceiptSlip/formReceiptSlipSlice";
import { RootState } from "../../store";
import { RefreshCw } from "lucide-react";

// Define props interface (documentNumber is optional, as it's now from Redux)
interface DocumentRequestNumberProps {
  documentNumber?: string; // Optional, as state is managed by Redux
}

export function DocumentRequestNumberComponent({ documentNumber: propDocumentNumber }: DocumentRequestNumberProps) {
  const dispatch = useDispatch();
  // Retrieve documentRequestNumber from Redux store with fallback
  const documentRequestNumber =
    useSelector((state: RootState) => state.inventory?.documentRequestNumber) ||
    propDocumentNumber ||
    "TB-DNNK-250001";

  // Generate a new document request number
  const generateNewNumber = () => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const newNumber = `TB-DNNK-${randomNum}`;
    dispatch(setDocumentRequestNumber(newNumber)); // Update Redux store
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDocumentRequestNumber(e.target.value)); // Update Redux store
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: "20px" }}>
      <label htmlFor="document-request-number" className="form-label me-2 mb-0" style={{ whiteSpace: "nowrap" }}>
        Số đề nghị:
      </label>
      <div className="input-group" style={{ maxWidth: "200px" }}>
        <input
          type="text"
          className="form-control text-center"
          id="document-request-number"
          value={documentRequestNumber}
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