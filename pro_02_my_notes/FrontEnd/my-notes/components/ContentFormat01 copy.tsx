import { useEffect, useState } from "react";
import Link from "next/link";

interface ContentProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  htmlFilePath?: string;
  nextLink?: string;
}

export default function Content({ title, description, children, htmlFilePath, nextLink }: ContentProps) {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    if (htmlFilePath) {
      fetch(htmlFilePath)
        .then((response) => response.text())
        .then((data) => {
          setHtmlContent(data);
        })
        .catch((error) => console.error("Error fetching HTML content:", error));
    }
  }, [htmlFilePath]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

      {/* Add Home link above H1 */}
      <div className="mb-3">
        <Link href="http://localhost:3001/" passHref>
          <a className="text-decoration-none">Home</a>
        </Link>
      </div>

      <h1 className="display-5 fw-bold mb-4">{title}</h1>

      <div className="d-flex justify-content-between mb-4">
        <Link href="/" passHref>
          <button className="btn btn-outline-secondary d-flex align-items-center gap-1">
            <i className="bi bi-chevron-left"></i> Home 1
          </button>
        </Link>
        {nextLink ? (
          <Link href={nextLink} passHref>
            <button className="btn btn-outline-secondary d-flex align-items-center gap-1">
              Next <i className="bi bi-chevron-right"></i>
            </button>
          </Link>
        ) : (
          <button className="btn btn-outline-secondary d-flex align-items-center gap-1" disabled>
            Next <i className="bi bi-chevron-right"></i>
          </button>
        )}
      </div>

      <div className="bg-light p-4 rounded mb-5">
        <h2 className="fs-2 fw-bold mb-3">Learn {title}</h2>
        <p className="mb-3">{description}</p>
        <p className="mb-4">{title} is completely free to download and use!</p>
        <button className="btn btn-success">Start learning {title} now »</button>
      </div>

      {htmlFilePath ? (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      ) : (
        <div>{children}</div>
      )}

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="btn btn-primary"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
          }}
        >
          <i className="bi bi-arrow-up"></i> Top
        </button>
      )}
    </div>
  );
}