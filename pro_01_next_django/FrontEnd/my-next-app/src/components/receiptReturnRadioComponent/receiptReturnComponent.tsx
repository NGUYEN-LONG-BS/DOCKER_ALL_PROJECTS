"use client"

import React, { useState, useEffect } from "react"

interface ReceiptReturnComponentProps {
  defaultAction: string // Prop to pass the default action (either "receipt" or "return")
}

export function ReceiptReturnComponent({ defaultAction }: ReceiptReturnComponentProps) {
  const [selectedAction, setSelectedAction] = useState<string>(defaultAction) // Default is "receipt"

  const handleActionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAction(event.target.value) // Update state based on selected radio button
  }

  return (
    <div className="d-flex align-items-center">
      <div className="form-check me-4">
        <input
          type="radio"
          id="receipt"
          name="inventoryAction"
          value="receipt"
          checked={selectedAction === "receipt"}
          onChange={handleActionChange}
          className="form-check-input"
        />
        <label htmlFor="receipt" className="form-check-label">
          Nhập Kho
        </label>
      </div>

      <div className="form-check">
        <input
          type="radio"
          id="return"
          name="inventoryAction"
          value="return"
          checked={selectedAction === "return"}
          onChange={handleActionChange}
          className="form-check-input"
        />
        <label htmlFor="return" className="form-check-label">
          Hoàn Nhập
        </label>
      </div>
    </div>
  )
}
