'use client';

import React from 'react';
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

  return (
    <div className="d-flex align-items-center gap-2" style={{ flexWrap: 'wrap', height: '38px' }}>
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <label htmlFor="dateStart" className="form-label me-1 mb-0" style={{ whiteSpace: 'nowrap' }}>
          Từ ngày:
        </label>
        <input
          type="date"
          className="form-control text-center"
          id="dateStart"
          value={dateStart}
          onChange={handleDateStartChange}
          style={{ maxWidth: '130px', minWidth: '110px' }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <label htmlFor="dateEnd" className="form-label me-1 mb-0" style={{ whiteSpace: 'nowrap' }}>
          Đến ngày:
        </label>
        <input
          type="date"
          className="form-control text-center"
          id="dateEnd"
          value={dateEnd}
          onChange={handleDateEndChange}
          style={{ maxWidth: '130px', minWidth: '110px' }}
        />
      </div>
    </div>
  );
}