"use client";

import React, { useState } from "react";
import { X } from "lucide-react"; // Thêm icon X

export function DocumentRequestNumberInputForm({ value, onChange }: { value?: string; onChange?: (val: string) => void }) {
  // Nếu không truyền value/onChange thì dùng state nội bộ
  const [internalValue, setInternalValue] = useState("");
  const documentRequestNumber = value !== undefined ? value : internalValue;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    } else {
      setInternalValue(e.target.value);
    }
  };

  const handleClear = () => {
    if (onChange) {
      onChange("");
    } else {
      setInternalValue("");
    }
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