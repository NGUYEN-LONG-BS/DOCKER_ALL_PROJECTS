'use client';

import React from 'react';
import Table from '@/components/table'; // Đảm bảo import đúng đường dẫn

const HomePage = () => {
  const columns = ['Name', 'Age', 'Email']; // Định nghĩa các cột của bảng
  const data = [
    { Name: 'John Doe', Age: 30, Email: 'john@example.com' },
    { Name: 'Jane Smith', Age: 25, Email: 'jane@example.com' },
    { Name: 'Alice Johnson', Age: 28, Email: 'alice@example.com' },
  ]; // Dữ liệu mẫu cho bảng

  return (
    <div className="container mt-5">
      <h1 className="text-center">User Information</h1>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default HomePage;
