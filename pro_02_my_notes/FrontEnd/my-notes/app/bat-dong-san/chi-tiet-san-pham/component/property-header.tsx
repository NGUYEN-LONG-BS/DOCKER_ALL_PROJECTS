import type { ContactInfo } from "../data/property-data"

interface PropertyHeaderProps {
  contact: ContactInfo
}

export default function PropertyHeader({ contact }: PropertyHeaderProps) {
  return (
    <div className="property-header">
      <div className="container-fluid">
        <div className="row align-items-center py-2">
          <div className="col-md-8">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 small">
                <li className="breadcrumb-item">
                  <a href="home" className="text-decoration-none">
                    Home
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#" className="text-decoration-none">
                    Hà Nội
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#" className="text-decoration-none">
                    Nam Từ Liêm
                  </a>
                </li>
                <li className="breadcrumb-item active">Nhà riêng tại đường Mỹ Đình</li>
              </ol>
            </nav>
          </div>
          <div className="col-md-4">
            <div className="contact-info justify-content-end">
              <img src={contact.avatar || "/placeholder.svg"} alt={contact.name} className="contact-avatar" />
              <div className="contact-details me-3">
                <div className="contact-name">{contact.name}</div>
                <div className="contact-status">{contact.lastSeen}</div>
              </div>
              <button className="btn btn-outline-primary btn-sm me-2">💬 Chat qua Zalo</button>
              <button className="btn btn-info btn-sm text-white">📞 {contact.phone} • Hiện số</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
