"use client";

import React from "react";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { setDocumentRequestNumber, clearDocumentRequestNumber } from "@/features/formReceiptLog/documentRequestNumberFilterFormSlice";
import { RootState } from "@/store/store";
import { X } from "lucide-react"; // Thêm icon X

export function DocumentRequestNumberFilterForm() {
  const dispatch = useAppDispatch();
  const documentRequestNumber = useAppSelector((state: RootState) => state.documentRequestNumberFilterForm.documentRequestNumber);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDocumentRequestNumber(e.target.value));
  };

  const handleClear = () => {
    dispatch(clearDocumentRequestNumber());
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: "20px" }}>
      <label
        htmlFor="document-number-filter"
        className="form-label me-2 mb-0"
        style={{ whiteSpace: "nowrap" }}
      >
        Số đề nghị:
      </label>
      <div className="input-group" style={{ maxWidth: "200px" }}>
        <input
          type="text"
          className="form-control text-center"
          id="document-number-filter"
          value={documentRequestNumber}
          onChange={handleInputChange}
          placeholder="Số đề nghị"
          autoComplete="off"
        />
        <button
          className="btn btn-outline-secondary btn-icon"
          type="button"
          onClick={handleClear}
          title="Xóa số phiếu"
          disabled={!documentRequestNumber}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}