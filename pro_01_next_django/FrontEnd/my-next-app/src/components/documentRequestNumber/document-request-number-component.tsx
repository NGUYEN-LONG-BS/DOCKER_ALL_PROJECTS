"use client"

import { useState } from "react"
import { RefreshCw } from "lucide-react"

interface DocumentNumberProps {
  defaultNumber?: string
}

export function DocumentRequestNumberComponent({ defaultNumber = "TB-DNNK-250006" }: DocumentNumberProps) {
  const [documentNumber, setDocumentNumber] = useState(defaultNumber)

  const generateNewNumber = () => {
    // Tạo số chứng từ mới với định dạng TB-PNK-XXXXXX
    const randomNum = Math.floor(100000 + Math.random() * 900000)
    setDocumentNumber(`TB-DNNK-${randomNum}`)
  }

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: "20px" }}>
      <label htmlFor="document-request-number" className="form-label me-2 mb-0" style={{ whiteSpace: 'nowrap' }}>
        Số đề nghị:
      </label>
      <div className="input-group" style={{ maxWidth: "200px" }}>
        <input
          type="text"
          className="form-control text-center"
          id="document-request-number"
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
