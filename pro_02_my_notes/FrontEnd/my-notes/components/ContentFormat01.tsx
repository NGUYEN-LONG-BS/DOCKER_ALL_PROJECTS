// components/Content.tsx
import Link from "next/link";
export default function Content({ title, description, children }: { title: string; description: string; children?: React.ReactNode }) {
  return (
    <div className="flex-grow-1 p-4 mx-auto" style={{ maxWidth: "900px" }}>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-outline-secondary">
          <i className="bi bi-bookmark"></i>
        </button>
      </div>

      {/* Thêm dòng Home với liên kết */}
      {/* <div className="mb-3">
        <a href="/" className="text-decoration-none">
          Home
        </a>
      </div> */}

      <Link href="/" className="d-flex align-items-center text-decoration-none">
        <div
          className="position-relative bg-success d-flex align-items-center justify-content-center text-white fw-bold rounded"
          style={{ width: "40px", height: "40px" }}
        >
          <span className="fs-5">NL</span>
        </div>
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
    </div>
  );
}