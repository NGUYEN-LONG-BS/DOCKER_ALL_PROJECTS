import type { PropertyData } from "../data/SP-HCM-Q5-A0001-data"

interface PropertyDetailsProps {
  property: PropertyData
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  return (
    <div className="card">
      <div className="card-body">
        <h1 className="property-title">{property.title}</h1>
        <div className="property-address">{property.address}</div>

        <div className="property-stats">
          <div className="stat-item">
            <div className="stat-label">Mức giá</div>
            <div className="stat-value price-highlight">{property.price}</div>
            <div className="stat-sub">~246,43 triệu/m²</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Diện tích</div>
            <div className="stat-value">{property.area}</div>
            <div className="stat-sub">Mặt tiền 4 m</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Phòng ngủ</div>
            <div className="stat-value">{property.bedrooms} PN</div>
          </div>
        </div>

        <div className="action-buttons">
          <button className="action-btn">🔗</button>
          <button className="action-btn">⚠️</button>
          <button className="action-btn">❤️</button>
        </div>

        <div className="price-trend">
          <span className="trend-badge">21%</span>
          <span className="trend-text">Giá tại khu vực này đã tăng trong 1 năm qua.</span>
          <a href="#" className="trend-link">
            Xem lịch sử giá ❯
          </a>
        </div>

        <div className="mt-4">
          <h5 className="fw-bold mb-3">Thông tin mô tả</h5>
          <div className="property-description text-muted">{property.description}</div>
          <button className="btn btn-info btn-sm mt-2">Hiện số</button>
        </div>
      </div>
    </div>
  )
}
