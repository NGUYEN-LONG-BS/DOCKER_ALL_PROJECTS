'use client';

import React from 'react';
import useSWR, { mutate } from 'swr';
import { API_get_inventory_categories } from '@/api/api';
import { getPermissionOnDB } from '@/utils/getPermissionOnDB';

// Hàm fetcher để gọi API
const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface LoginInfo {
  ma_hang: string;
  ten_hang: string;
  dvt: string;
}

const TABLE_HEADERS = [
  { label: 'STT', width: '50px' },
  { label: 'Mã hàng', width: '120px' },
  { label: 'Tên hàng', width: '' },
  { label: 'Đvt', width: '' },
];

const table_inventory_category: React.FC<{ refreshKey?: number }> = ({ refreshKey }) => {
  const [modelKey, setModelKey] = React.useState<string | null>(null);
  React.useEffect(() => {
    async function fetchModelKey() {
      // Lấy userId từ localStorage hoặc context nếu cần
      const userId = localStorage.getItem('user_id') || '';
      if (userId) {
        const key = await getPermissionOnDB(userId);
        setModelKey(key);
      }
    }
    fetchModelKey();
  }, []);

  // Fetch dữ liệu từ API (có model_key)
  const { data, error } = useSWR<LoginInfo[]>(
    modelKey ? `${API_get_inventory_categories}?model_key=${modelKey}` : null,
    fetcher,
    { refreshInterval: 0 }
  );

  // Kiểm tra lỗi hoặc trạng thái loading
  if (error) return <div>Error loading data...</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="table-responsive" style={{ maxHeight: 350, overflowY: 'auto' }}>
      <table className="table table-bordered table-striped" style={{ minWidth: 500 }}>
        <thead style={{ position: 'sticky', top: 0, zIndex: 2, background: '#fff' }}>
          <tr>
            {TABLE_HEADERS.map((h) => (
              <th key={h.label} style={h.width ? { width: h.width } : {}}>{h.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>{rowIndex + 1}</td>
                <td>{row.ma_hang}</td>
                <td>{row.ten_hang}</td>
                <td>{row.dvt}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={TABLE_HEADERS.length} className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Để cập nhật bảng từ component cha, hãy gọi mutate(API_get_inventory_categories) sau khi thêm/sửa/xóa thành công.

export default table_inventory_category;
