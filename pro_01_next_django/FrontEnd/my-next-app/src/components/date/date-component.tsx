'use client';

import { useState, useEffect } from 'react';

// DateComponent now accepts an onDateChange prop
interface DateComponentProps {
  onDateChange: (newDate: string) => void; // Callback to update the date
  initialDate?: string; // new optional prop
}

export function DateComponent({ onDateChange, initialDate }: DateComponentProps) {
  // Initialize the current date to today's date in YYYY-MM-DD format
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    // Set the default date as today's date in YYYY-MM-DD format
    const today = initialDate || new Date().toISOString().split('T')[0];
    setCurrentDate(today);
    // onDateChange(today); // ensure parent gets initial value
    if (typeof onDateChange === 'function') {
      onDateChange(today); // avoid runtime error
    }
  }, [initialDate]); // Runs only once when the component is mounted

  // Update the date when the user selects a new one
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;
    setCurrentDate(newDate); // Update local state
    onDateChange(newDate); // Propagate the change to the parent component
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '20px' }}>
      <label htmlFor="date" className="form-label me-2 text-end" style={{ width: '80px' }}>
        Ngày:
      </label>
      <input
        type="date"
        className="form-control text-center"
        id="date"
        value={currentDate}
        onChange={handleDateChange} // Call handleDateChange when date is changed
        style={{ maxWidth: '200px' }}
      />
    </div>
  );
}
