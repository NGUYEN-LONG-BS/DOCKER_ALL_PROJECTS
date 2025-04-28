'use client'; // Đảm bảo đây là một component client-side

import { useRouter } from 'next/navigation'; // Dùng next/navigation thay vì next/router
import Head from "next/head";
import Header from '@/components/header/Header';
import Navbar from '@/components/Navbar';
import Footer from '@/components/footer/Footer';

export default function Home() {
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
                <h2 className="card-title text-center mb-4">Chào mừng đến với trang chủ của tôi!</h2>
                <p className="card-text text-center">
                  Đây là nơi bạn có thể khám phá thông tin về trang web của tôi.
                </p>
                <div className="text-center">
                  <a href="/about" className="btn btn-primary btn-lg">
                    Tìm hiểu thêm về tôi
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
