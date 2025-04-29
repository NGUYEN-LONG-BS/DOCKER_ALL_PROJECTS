"use client"

import { useState } from "react"

export function DateComponent() {
  const [currentDate] = useState(() => {
    const today = new Date()
    return today
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-")
  })

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: "20px" }}>
      <label htmlFor="date" className="form-label me-2 text-end" style={{ width: "80px" }}>
        Ngày:
      </label>
      <input
        type="text"
        className="form-control text-center"
        id="date"
        value={currentDate}
        readOnly
        style={{ maxWidth: "200px" }}
      />
    </div>
  )
}
