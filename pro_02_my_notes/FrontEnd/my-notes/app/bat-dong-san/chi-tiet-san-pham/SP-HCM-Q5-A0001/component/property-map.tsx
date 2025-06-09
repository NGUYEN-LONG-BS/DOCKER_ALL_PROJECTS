import Logo from "../../../home/component/Logo";

export default function PropertyMap() {
  return (
    <div className="card mt-4">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <Logo />
          <h5 className="fw-bold ms-3 mb-0">Xem trên bản đồ</h5>
        </div>
        <div className="map-container">
          <div className="map-placeholder">
            <div className="map-icon">🗺️</div>
            <div>Bản đồ vị trí</div>
            <div className="small">Đường Mỹ Đình, Phường Mỹ Đình 1, Nam Từ Liêm, Hà Nội</div>
          </div>
        </div>

        <div className="property-meta">
          <div className="meta-item">
            <div className="meta-label">Ngày đăng</div>
            <div className="meta-value">06/06/2025</div>
          </div>
          <div className="meta-item">
            <div className="meta-label">Ngày hết hạn</div>
            <div className="meta-value">16/06/2025</div>
          </div>
          <div className="meta-item">
            <div className="meta-label">Mã tin</div>
            <div className="meta-value">43180567</div>
          </div>
        </div>
      </div>
    </div>
  )
}
