// src/components/date/date-component-with-rkt.tsx
'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDate } from '../../features/formReceiptSlip/dateSlice';
import { RootState } from '../../store/store';

// Define props interface for DateComponent
interface DateComponentProps {
  onDateChange?: (newDate: string) => void; // Optional callback for parent
  initialDate?: string; // Optional initial date
}

export function DateComponent({ onDateChange, initialDate }: DateComponentProps) {
  const dispatch = useDispatch();
  // Retrieve date from Redux store with fallback to today's date
  const currentDate = useSelector((state: RootState) => state.date.date) || new Date().toISOString().split('T')[0];

  // Sync initialDate with Redux store if provided and different
  React.useEffect(() => {
      if (initialDate && currentDate !== initialDate) {
        dispatch(setDate(initialDate));
        if (typeof onDateChange === 'function') {
          onDateChange(initialDate); // Notify parent if callback exists
        }
      }
  }, [initialDate, currentDate, dispatch, onDateChange]);

  // Handle date input change
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;
    dispatch(setDate(newDate)); // Update Redux store
    if (typeof onDateChange === 'function') {
      onDateChange(newDate); // Notify parent if callback exists
    }
  };

  return (
    <div className="d-flex align-items-center gap-2" style={{ height: '20px' }}>
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <label htmlFor="dateStart" className="form-label me-1 mb-0" style={{ whiteSpace: 'nowrap' }}>
          Từ:
        </label>
        <input
          type="date"
          className="form-control text-center"
          id="dateStart"
          value={currentDate}
          onChange={handleDateChange}
          style={{ maxWidth: '150px', minWidth: '140px' }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <label htmlFor="dateEnd" className="form-label me-1 mb-0" style={{ whiteSpace: 'nowrap' }}>
          Đến:
        </label>
        <input
          type="date"
          className="form-control text-center"
          id="dateEnd"
          value={currentDate}
          onChange={handleDateChange}
          style={{ maxWidth: '150px', minWidth: '140px' }}
        />
      </div>
    </div>
  );
}