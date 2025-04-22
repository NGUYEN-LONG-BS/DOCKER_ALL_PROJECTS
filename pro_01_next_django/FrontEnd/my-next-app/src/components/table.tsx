'use client';
import React from 'react';

interface TableProps {
  columns: string[]; // Cột của bảng
  data: any[]; // Dữ liệu bảng
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>{row[column]}</td>
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

// Dữ liệu của bạn
const columns = ['Name', 'Age', 'Email'];
const data = [
  { Name: 'John Doe', Age: 30, Email: 'john@example.com' },
  { Name: 'Jane Smith', Age: 25, Email: 'jane@example.com' },
  { Name: 'Alice Johnson', Age: 28, Email: 'alice@example.com' },
];

const Table_Test = () => {
  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Table_Test;
