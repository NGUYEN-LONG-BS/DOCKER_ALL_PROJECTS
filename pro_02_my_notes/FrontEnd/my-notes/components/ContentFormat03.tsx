// components/ContentFormat02.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface ContentProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  htmlFilePath?: string; // New prop for the HTML file path
}

export default function Content({ title, description, children, htmlFilePath }: ContentProps) {
  const [htmlContent, setHtmlContent] = useState<string>("");
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

  useEffect(() => {
    if (htmlFilePath) {
      // Fetch the HTML file from the public directory
      fetch(htmlFilePath)
        .then((response) => response.text())
        .then((data) => setHtmlContent(data))
        .catch((error) => console.error("Error fetching HTML content:", error));
    }
  }, [htmlFilePath]);

  return (
    <div className="flex-grow-1 p-4 mx-auto" style={{ maxWidth: "900px" }}>

      <Link href="/" className="d-flex align-items-center text-decoration-none">
        <div
          className="position-relative bg-success d-flex align-items-center justify-content-center text-white fw-bold rounded"
          style={{ width: "40px", height: "40px" }}
        >
          <span className="fs-5">NL</span>
        </div>
      </Link>

      <h1 className="display-5 fw-bold mb-4">{title}</h1>

      {htmlFilePath ? (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      ) : (
        <div>{children}</div>
      )}

      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-outline-secondary">
          <i className="bi bi-bookmark"></i>
        </button>
      </div>

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