'use client';

import React from 'react';
import useSWR from 'swr';
import { API_get_json_data } from '@/api/api';

// Hàm fetcher để gọi API
const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface ColumnConfig {
  name: string;
  width: number;
  min_width: number;
  anchor: string;
  stretch: boolean;
  font: {
    family: string;
    size: number;
    weight: string;
  };
  background_color: string;
  foreground_color: string;
  show: string;
}

interface TableConfig {
  name: string;
  description: string;
  headings: {
    family: string;
    size: number;
    weight: string;
  };
  columns: ColumnConfig[];
  scrollbars: {
    vertical: {
      enabled: boolean;
      command: string;
    };
    horizontal: {
      enabled: boolean;
      command: string;
    };
  };
  general: {
    border_width: number;
    relief: string;
    padding: number;
    background_color: string;
  };
}

const TableInventory: React.FC = () => {
  // Fetch dữ liệu từ API để lấy cấu hình bảng
  const { data, error } = useSWR<TableConfig>(API_get_json_data, fetcher);

  // Kiểm tra lỗi hoặc trạng thái loading
  if (error) return <div>Error loading data...</div>;
  if (!data) return <div>Loading...</div>;

  // Lấy thông tin cấu hình bảng từ dữ liệu JSON
  const { columns, general } = data.table;

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped" style={{ borderColor: general.background_color }}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                style={{
                  width: column.width,
                  minWidth: column.min_width,
                  textAlign: column.anchor === 'center' ? 'center' : 'left',
                  backgroundColor: column.background_color,
                  color: column.foreground_color,
                  fontFamily: column.font.family,
                  fontSize: `${column.font.size}px`,
                  fontWeight: column.font.weight,
                }}
              >
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Tạo dữ liệu cho bảng */}
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    style={{
                      textAlign: column.anchor === 'center' ? 'center' : 'left',
                      backgroundColor: column.background_color,
                      color: column.foreground_color,
                      fontFamily: column.font.family,
                      fontSize: `${column.font.size}px`,
                      fontWeight: column.font.weight,
                    }}
                  >
                    {row[column.name.toLowerCase().replace(/\s+/g, '_')]} {/* Thay đổi theo tên cột của dữ liệu */}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableInventory;
