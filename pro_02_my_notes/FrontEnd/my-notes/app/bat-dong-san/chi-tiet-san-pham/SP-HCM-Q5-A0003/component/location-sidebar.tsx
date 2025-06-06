import type { LocationSuggestion } from "../data/property-data"

interface LocationSidebarProps {
  suggestions: LocationSuggestion[]
  relatedProperties: string[]
  supportServices: string[]
}

export default function LocationSidebar({ suggestions, relatedProperties, supportServices }: LocationSidebarProps) {
  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h6 className="sidebar-title">Bạn nhà riêng tại Quận Nam Từ Liêm</h6>
        <div className="location-list">
          {suggestions.map((item, index) => (
            <div key={index} className="location-item">
              <a href="#" className="location-link">
                {item.district}
              </a>
              <span className="location-count">({item.count})</span>
            </div>
          ))}
          <button className="expand-btn">Xem thêm ▼</button>
        </div>
      </div>

      <div className="sidebar-section">
        <h6 className="sidebar-title">Bất động sản nổi bật</h6>
        <div className="location-list">
          {relatedProperties.slice(0, 10).map((property, index) => (
            <div key={index} className="location-item">
              <a href="#" className="location-link">
                {property}
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <h6 className="sidebar-title">Hỗ trợ tiện ích</h6>
        <div className="location-list">
          {supportServices.map((service, index) => (
            <div key={index} className="location-item">
              <a href="#" className="location-link">
                {service}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
