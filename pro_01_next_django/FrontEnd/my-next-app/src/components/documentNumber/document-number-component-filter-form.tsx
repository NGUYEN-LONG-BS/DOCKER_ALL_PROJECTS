"use client";

import React from "react";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { setDocumentNumber, clearDocumentNumber } from "@/features/formReceiptLog/documentNumberFilterFormSlice";
import { RootState } from "@/store/store";
import { X } from "lucide-react"; // Thêm icon X

export function DocumentNumberFilterForm() {
  const dispatch = useAppDispatch();
  const documentNumber = useAppSelector((state: RootState) => state.documentNumberFilterForm.documentNumber);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDocumentNumber(e.target.value));
  };

  const handleClear = () => {
    dispatch(clearDocumentNumber());
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: "20px" }}>
      <label
        htmlFor="document-number-filter"
        className="form-label me-2 mb-0"
        style={{ whiteSpace: "nowrap" }}
      >
        Số chứng từ:
      </label>
      <div className="input-group" style={{ maxWidth: "200px" }}>
        <input
          type="text"
          className="form-control text-center"
          id="document-number-filter"
          value={documentNumber}
          onChange={handleInputChange}
          placeholder="Số phiếu"
          autoComplete="off"
        />
        <button
          className="btn btn-outline-secondary btn-icon"
          type="button"
          onClick={handleClear}
          title="Xóa số phiếu"
          disabled={!documentNumber}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}