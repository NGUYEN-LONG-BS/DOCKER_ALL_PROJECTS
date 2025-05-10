'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDate } from '../../features/formReceiptSlip/inventorySlice';
import { RootState } from '../../store';

// Define props interface for DateComponent
interface DateComponentProps {
  onDateChange?: (newDate: string) => void; // Optional callback for parent
  initialDate?: string; // Optional initial date
}

export function DateComponent({ onDateChange, initialDate }: DateComponentProps) {
  const dispatch = useDispatch();
  // Retrieve date from Redux store with fallback to today's date
  const currentDate = useSelector((state: RootState) => state.inventory?.date) || new Date().toISOString().split('T')[0];

  // Sync initialDate with Redux store if provided and different
  if (initialDate && currentDate !== initialDate) {
    dispatch(setDate(initialDate));
    if (typeof onDateChange === 'function') {
      onDateChange(initialDate); // Notify parent if callback exists
    }
  }

  // Handle date input change
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;
    dispatch(setDate(newDate)); // Update Redux store
    if (typeof onDateChange === 'function') {
      onDateChange(newDate); // Notify parent if callback exists
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '20px' }}>
      <label htmlFor="date" className="form-label me-2 mb-0" style={{ whiteSpace: 'nowrap' }}>
        Ngày:
      </label>
      <input
        type="date"
        className="form-control text-center"
        id="date"
        value={currentDate}
        onChange={handleDateChange}
        style={{ maxWidth: '200px' }}
      />
    </div>
  );
}