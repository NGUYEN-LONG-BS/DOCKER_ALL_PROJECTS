"use client";
import { useEffect, useState } from "react";

interface ContentProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  htmlFilePath?: string; // New prop for the HTML file path
}

export default function Content({ title, description, children, htmlFilePath }: ContentProps) {
  const [htmlContent, setHtmlContent] = useState<string>("");

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
    </div>
  );
}