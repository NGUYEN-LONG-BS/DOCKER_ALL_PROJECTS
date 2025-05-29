'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDateStart, setDateEnd } from '@/features/formReceiptLog/dateFilterFormSlice';
import { RootState } from '@/store/store';

export function DateComponentFilterForm() {
  const dispatch = useDispatch();
  const dateStart = useSelector((state: RootState) => state.dateFilterForm.dateStart);
  const dateEnd = useSelector((state: RootState) => state.dateFilterForm.dateEnd);

  const handleDateStartChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDateStart(event.target.value));
  };

  const handleDateEndChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDateEnd(event.target.value));
  };

  // Helper to format date as yyyy-mm-dd
  const formatDate = (date: Date) =>
    date.toISOString().split('T')[0];

  // Button handlers
  const setRange = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days + 1);
    dispatch(setDateStart(formatDate(start)));
    dispatch(setDateEnd(formatDate(end)));
  };

  // Set mặc định 10 ngày khi render lần đầu
  useEffect(() => {
    setRange(10);
  }, []);

  return (
    <div 
      className="d-flex align-items-center gap-2" 
      style={{ height: '20px' }}
      >
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <label htmlFor="dateStart" className="form-label me-1 mb-0" style={{ whiteSpace: 'nowrap' }}>
          Từ:
        </label>
        <input
          type="date"
          className="form-control text-center"
          id="dateStart"
          value={dateStart}
          onChange={handleDateStartChange}
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
          value={dateEnd}
          onChange={handleDateEndChange}
          style={{ maxWidth: '150px', minWidth: '140px' }}
        />
      </div>
      <div className="ms-2 d-flex gap-1">
        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setRange(2)}>
          2D
        </button>
        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setRange(7)}>
          1W
        </button>
        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setRange(10)}>
          10D
        </button>
        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setRange(30)}>
          1M
        </button>
        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setRange(365)}>
          1Y
        </button>
      </div>
    </div>
  );
}