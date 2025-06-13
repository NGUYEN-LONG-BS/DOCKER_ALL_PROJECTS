'use client'; // Đảm bảo đây là một component client-side

import Head from "next/head";
import Navbar from '@/components/header/Navbar';
import Footer from '@/components/footer/Footer';
import { useEffect } from 'react';

export default function Home() {
  // =============================================================
  // useEffect(() => {
  //   // Debug: In ra id và pass từ localStorage/sessionStorage/cookie nếu có
  //   const id = localStorage.getItem('login_id') || sessionStorage.getItem('login_id') || '';
  //   const pass = localStorage.getItem('pass_field') || sessionStorage.getItem('pass_field') || '';
  //   console.log('login_id:', id, 'pass_field:', pass);
  // }, []);
  // =============================================================

  return (
    <div className="d-flex flex-column min-vh-100">
      <Head>
        <title>TAG-Home</title>
        <meta name="description" content="Trang chủ của công ty XYZ, nơi bạn có thể tìm thấy thông tin về sản phẩm và dịch vụ của chúng tôi." />
      </Head>
      <Navbar />
      <main className="container py-5 flex-grow-1">
        
      </main>
      <Footer />
    </div>
  );
}
