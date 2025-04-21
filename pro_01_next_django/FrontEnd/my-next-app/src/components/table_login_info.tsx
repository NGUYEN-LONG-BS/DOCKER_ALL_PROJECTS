'use client';

import React from 'react';
import useSWR from 'swr';

// Hàm fetcher để gọi API
const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface LoginInfo {
  login_id: string;
  pass_field: string;
}

const TableLoginInfo: React.FC = () => {
  // Fetch dữ liệu từ API
  const { data, error } = useSWR<LoginInfo[]>('http://localhost:8000/api/get-login-info/', fetcher);

  // Kiểm tra lỗi hoặc trạng thái loading
  if (error) return <div>Error loading data...</div>;
  if (!data) return <div>Loading...</div>;

  // Tiêu đề cột mặc định
  const columnTitles = ['Login ID', 'Password'];

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead>
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
                <td>{row.login_id}</td>
                <td>{row.pass_field}</td>
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

export default TableLoginInfo;
