'use client'; // Đánh dấu đây là client component
import useSWR from 'swr';
import { useState } from 'react';

import Head from "next/head";
import Header from '@/components/header/Header';
import Navbar from '@/components/Navbar';
import Footer from '@/components/footer/Footer';

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
    <div className="d-flex flex-column min-vh-100">
      <Head>
        <title>TAG-Home</title>
        <meta name="description" content="Trang chủ của công ty XYZ, nơi bạn có thể tìm thấy thông tin về sản phẩm và dịch vụ của chúng tôi." />
      </Head>
      <Header />
      <Navbar />
      <main className="container py-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Login Information</h2>
                
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
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


