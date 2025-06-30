"use client";

export function ProductComponentFilterForm() {
  return (
    <div>
      <div>
        {/* Dòng nhập sản phẩm */}
        <div className="mb-1 position-relative">
          <div className="d-flex align-items-center gap-2" style={{ marginBottom: "0px" }}>
            <label htmlFor="Product-code" className="form-label mb-0" style={{ width: "120px", whiteSpace: "nowrap" }}>
              Sản phẩm
            </label>
            <input
              type="text"
              className="form-control"
              id="Product-code"
              placeholder="mã hàng"
              autoComplete="off"
              style={{ width: "150px" }}
            />
            <input
              type="text"
              className="form-control flex-grow-1"
              id="Product-name"
              placeholder="tên hàng"
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  );
}