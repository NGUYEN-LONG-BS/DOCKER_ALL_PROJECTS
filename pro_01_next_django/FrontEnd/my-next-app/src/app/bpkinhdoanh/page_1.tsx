'use client'; // Đánh dấu đây là client component
import useSWR from 'swr';
import { useState } from 'react';

// Hàm fetcher để gọi API
const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface LoginInfo {
  login_id: string;
  pass_field: string;
}

export default function Home() {
  // Sử dụng SWR để lấy dữ liệu từ API
  const { data, error } = useSWR<LoginInfo[]>('http://localhost:8000/api/get-login-info/', fetcher);

  // Kiểm tra lỗi hoặc trạng thái loading
  if (error) return <div>Error loading data...</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h1 className="text-center">Login Information</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Login ID</th>
            <th scope="col">Password</th>
          </tr>
        </thead>
        <tbody>
          {data.map((loginInfo) => (
            <tr key={loginInfo.login_id}>
              <td>{loginInfo.login_id}</td>
              <td>{loginInfo.pass_field}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

