import type { ContactInfo } from "../../../data/SP-HCM-Q5-A0001-data"
import Logo from "../../../home/component/Logo"
import Breadcrumb, { BreadcrumbItem } from "./Breadcrumb"

interface PropertyHeaderProps {
  contact: ContactInfo
}

export default function PropertyHeader({ contact }: PropertyHeaderProps) {
  return (
    <div className="property-header">
      <div className="container-fluid">
        <div className="row align-items-center py-2">
          <div className="col-md-2 d-flex align-items-center">
            <Logo />
          </div>
          <div className="col-md-6">
            <Breadcrumb
              items={[
                { label: "Home", link: "home" },
                { label: "Long An", link: "home/long-an" },
                { label: "Đức Hoà", link: "home/long-an/duc-hoa" },
                { label: "Khu dân cư Đức Hoà Hạ", link: "home/long-an/duc-hoa/khu-dan-cu-duc-hoa-ha" },
                { label: "SP-LA-bella-T8-61", active: true },
              ]}
            />
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
