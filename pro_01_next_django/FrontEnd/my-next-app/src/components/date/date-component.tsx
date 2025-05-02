"use client"

import { useState } from "react"

// DateComponent now accepts an onDateChange prop
interface DateComponentProps {
  onDateChange: (newDate: string) => void; // Callback to update the date
}

export function DateComponent({ onDateChange }: DateComponentProps) {

  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    return today
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-");
  });

  // Update the date when the user selects a new one
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;
    setCurrentDate(newDate); // Update local state
    onDateChange(newDate); // Propagate the change to parent component
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: "20px" }}>
      <label htmlFor="date" className="form-label me-2 text-end" style={{ width: "80px" }}>
        Ngày:
      </label>
      <input
        type="date"
        className="form-control text-center"
        id="date"
        value={currentDate}
        onChange={handleDateChange} // Call handleDateChange when date is changed
        // readOnly
        style={{ maxWidth: "200px" }}
      />
    </div>
  )
}
