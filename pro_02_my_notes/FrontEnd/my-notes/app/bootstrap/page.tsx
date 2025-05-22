export default function BootstrapPage() {
  return (
    <div className="container py-4 mx-auto" style={{ maxWidth: "900px" }}>
      <h1 className="display-5 fw-bold mb-4">Bootstrap 5 Tutorial componenets</h1>

      <div className="d-flex justify-content-between mb-4">
        <button className="btn btn-outline-secondary d-flex align-items-center gap-1">
          <i className="bi bi-chevron-left"></i> Home
        </button>
        <button className="btn btn-outline-secondary d-flex align-items-center gap-1">
          Next <i className="bi bi-chevron-right"></i>
        </button>
      </div>

      <div className="bg-light p-4 rounded mb-5">
        <h2 className="fs-2 fw-bold mb-3">Learn Bootstrap 5</h2>
        <p className="mb-3">
          Bootstrap 5 is the newest version of Bootstrap, which is the most popular HTML, CSS, and JavaScript framework
          for creating responsive, mobile-first websites.
        </p>
        <p className="mb-4">Bootstrap 5 is completely free to download and use!</p>
        <button className="btn btn-success">Start learning Bootstrap 5 now »</button>
      </div>

      <h2 className="fs-2 fw-bold mb-3">Try it Yourself Examples</h2>
      <p className="mb-3">This tutorial contains hundreds of Bootstrap 5 examples.</p>
      <p className="mb-4">With our online editor, you can edit the code, and click on a button to view the result.</p>

      <div className="border rounded p-4 mb-5">
        <h3 className="fs-4 fw-bold mb-3">Bootstrap 5 Example</h3>
        <div
          className="bg-light p-4 rounded mb-3 d-flex align-items-center justify-content-center"
          style={{ height: "250px" }}
        >
          <p className="text-muted">Example code preview would appear here</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-success">Try it Yourself »</button>
        </div>
      </div>

      <h2 className="fs-2 fw-bold mb-3">Bootstrap 5 vs. Bootstrap 4</h2>
      <p className="mb-3">
        Bootstrap 5 is the newest version of Bootstrap; with new components, faster stylesheet and more responsiveness.
      </p>
      <p className="mb-3">
        Bootstrap 5 supports the latest, stable releases of all major browsers and platforms. However, Internet Explorer
        11 and down is not supported.
      </p>
      <p className="mb-4">The main differences between Bootstrap 5 and Bootstrap 4 are:</p>

      <ul className="list-group list-group-flush mb-4">
        <li className="list-group-item">Bootstrap 5 has switched to vanilla JavaScript instead of jQuery</li>
        <li className="list-group-item">Bootstrap 5 has improved grid system</li>
        <li className="list-group-item">Bootstrap 5 has improved form elements and form validation</li>
        <li className="list-group-item">Bootstrap 5 has new utility classes</li>
        <li className="list-group-item">Bootstrap 5 has improved customization options</li>
      </ul>

      <div className="d-flex justify-content-between mt-5">
        <button className="btn btn-outline-secondary d-flex align-items-center gap-1">
          <i className="bi bi-chevron-left"></i> Home
        </button>
        <button className="btn btn-outline-secondary d-flex align-items-center gap-1">
          Next <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  )
}
