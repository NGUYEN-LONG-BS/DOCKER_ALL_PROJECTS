'use client';

import React from 'react';
import useSWR from 'swr';

// Hàm fetcher để gọi API
const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface LoginInfo {
  ma_hang: string;
  ten_hang: string;
  dvt: string;
}

const table_inventory_category: React.FC = () => {
  // Fetch dữ liệu từ API
  const { data, error } = useSWR<LoginInfo[]>('http://localhost:8000/api/get-inventory-categories/', fetcher);

  // Kiểm tra lỗi hoặc trạng thái loading
  if (error) return <div>Error loading data...</div>;
  if (!data) return <div>Loading...</div>;

  // Tiêu đề cột mặc định
  const columnTitles = ['Mã hàng', 'Tên hàng', 'Đvt'];

  return (
    <div className="table-responsive" style={{ maxHeight: 350, overflowY: 'auto' }}>
      <table className="table table-bordered table-striped" style={{ minWidth: 500 }}>
        <thead style={{ position: 'sticky', top: 0, zIndex: 2, background: '#fff' }}>
          <tr>
            {columnTitles.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>{row.ma_hang}</td>
                <td>{row.ten_hang}</td>
                <td>{row.dvt}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columnTitles.length} className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default table_inventory_category;
