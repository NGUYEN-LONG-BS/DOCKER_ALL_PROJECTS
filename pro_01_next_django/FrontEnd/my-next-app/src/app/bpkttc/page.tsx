import Head from "next/head";
import HeaderDepartment from '@/components/header/header_department';
import Footer from '@/components/footer/Footer';

export default function Home() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <HeaderDepartment title="BP TÀI CHÍNH - KẾ TOÁN" />
      <main className="container py-5 flex-grow-1">
        {/* Nội dung trang */}
      </main>
      <Footer />
    </div>
  );
}
