"use client"

import { useState } from "react"
import { RefreshCw } from "lucide-react"

interface DocumentNumberProps {
  documentNumber: string
  setDocumentNumber: (value: string) => void
}

export function DocumentNumberComponent({ documentNumber, setDocumentNumber }: DocumentNumberProps) {
  const generateNewNumber = () => {
    // Tạo số chứng từ mới với định dạng TB-PNK-XXXXXX
    const randomNum = Math.floor(100000 + Math.random() * 900000)
    setDocumentNumber(`TB-PNK-${randomNum}`)
  }

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: "20px" }}>
      <label htmlFor="document-number" className="form-label me-2 mb-0" style={{ whiteSpace: 'nowrap' }}>
        Số chứng từ:
      </label>
      <div className="input-group" style={{ maxWidth: "200px" }}>
        <input
          type="text"
          className="form-control text-center"
          id="document-number"
          value={documentNumber}
          onChange={(e) => setDocumentNumber(e.target.value)}
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
  )
}
