// components/ContentFormat01.tsx
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import HomeIcon from "./HomeIcon"; // Import SVG component

export default function Content({ title, description, children }: { title: string; description: string; children?: React.ReactNode }) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Kiểm tra vị trí cuộn để hiển thị/ẩn nút
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // Hiển thị nút khi cuộn xuống quá 300px
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Dọn dẹp
  }, []);

  // Hàm cuộn mượt về đầu trang
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex-grow-1 p-4 mx-auto" style={{ maxWidth: "900px" }}>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-outline-secondary">
          <i className="bi bi-bookmark"></i>
        </button>
      </div>

      <Link href="/" className="d-flex align-items-center text-decoration-none">
        <HomeIcon />
      </Link>
      <h1 className="display-5 fw-bold mb-4">{title}</h1>

      <div className="d-flex justify-content-between mb-4">
        <button className="btn btn-outline-secondary d-flex align-items-center gap-1">
          <i className="bi bi-chevron-left"></i> Home
        </button>
        <button className="btn btn-outline-secondary d-flex align-items-center gap-1">
          Next <i className="bi bi-chevron-right"></i>
        </button>
      </div>

      <div className="bg-light p-4 rounded mb-5">
        <h2 className="fs-2 fw-bold mb-3">Learn {title}</h2>
        <p className="mb-3">{description}</p>
        <p className="mb-4">{title} is completely free to download and use!</p>
        <button className="btn btn-success">Start learning {title} now »</button>
      </div>

      {children}

      {/* Nút Back to Top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="btn btn-success position-fixed bottom-0 end-0 m-4"
          style={{ zIndex: 1000 }}
          title="Back to Top"
        >
          <i className="bi bi-arrow-up"></i>
        </button>
      )}
    </div>
  );
}