// src/components/documentNumber/document-number-component-receipt-input-form.tsx
"use client";

import React, { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { getPermissionOnDB } from '@/utils/getPermissionOnDB';
import { API_new_number_slip_pnk } from '@/api/api';

// Đặt map loại phiếu ở đầu file
const SLIP_TYPE_MAP: Record<string, { prefix: string; type: string }> = {
  TB: { prefix: 'TB', type: 'PNK' },
  LA: { prefix: 'LA', type: 'PNK' },
  PA: { prefix: 'PA', type: 'PNK' },
  NAMAN: { prefix: 'NA', type: 'PNK' },
  HANOI: { prefix: 'HN', type: 'PNK' },
  MIENTAY: { prefix: 'MY', type: 'PNK' },
};

// Define props interface (documentNumber is optional, as it's now from Redux)
interface DocumentNumberProps {
  value: string;
  onChange: (value: string) => void;
}

export function DocumentNumberComponent({ value, onChange }: DocumentNumberProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Chạy generateNewNumber khi mount lần đầu
  useEffect(() => {
    generateNewNumber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Gọi API tạo số phiếu mới
  const generateNewNumber = async () => {
    setLoading(true);
    setError(null);
    try {
      let userId = '';
      if (typeof window !== 'undefined') {
        userId = localStorage.getItem('user_id') || '';
      }
      let modelKey = 'null';
      if (userId) {
        const key = await getPermissionOnDB(userId);
        if (key && SLIP_TYPE_MAP[key]) modelKey = key;
      }
      const url = `${API_new_number_slip_pnk}?model_key=${encodeURIComponent(modelKey)}`;
      const response = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
      if (!response.ok) throw new Error('Failed to fetch new document number');
      const data = await response.json();
      onChange(data.new_number_slip);
    } catch (err: any) {
      setError('Không thể tạo số phiếu mới.');
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: "20px" }}>
      <label 
        htmlFor="document-number" 
        className="form-label me-2 mb-0" 
        style={{ whiteSpace: "nowrap" }}
        >
        Số chứng từ:
      </label>
      <div className="input-group" style={{ maxWidth: "200px" }}>
        <input
          type="text"
          className="form-control text-center"
          id="document-number"
          value={value}
          onChange={handleInputChange}
          disabled={loading}
        />
        <button
          className="btn btn-outline-secondary btn-icon"
          type="button"
          onClick={generateNewNumber}
          title="Tạo số chứng từ mới"
          disabled={loading}
        >
          <RefreshCw size={16} />
        </button>
        {/* {error && <div className="text-danger small mt-1">{error}</div>} */}
      </div>
    </div>
  );
}