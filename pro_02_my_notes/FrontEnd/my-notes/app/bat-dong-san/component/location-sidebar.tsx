"use client"

import React, { useState } from "react"
import type { typeDanhSachSanPham } from "../data/sideBar-data"

interface LocationSidebarProps {
  suggestions: typeDanhSachSanPham[]
  canHoChungCuDucHoaLongAns: typeDanhSachSanPham[]
  relatedProperties: string[]
  supportServices: string[]
}

export default function LocationSidebar({ suggestions, canHoChungCuDucHoaLongAns, relatedProperties, supportServices }: LocationSidebarProps) {
  const [showAllLand, setShowAllLand] = useState(false)
  const [showAllApartment, setShowAllApartment] = useState(false)
  const [showAllRent, setShowAllRent] = useState(false)
  const [showAllPolicy, setShowAllPolicy] = useState(false)
  
  const landLimit = 0
  const apartmentLimit = 0
  const rentLimit = 0
  const policyLimit = 0
  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h6 className="sidebar-title" style={{cursor: 'pointer'}} onClick={() => setShowAllLand(v => !v)}>
          Đất nền và nhà riêng {suggestions.length > landLimit && (showAllLand ? "▲" : "▼")}
        </h6>
        <div className="location-list">
          {(showAllLand ? suggestions : suggestions.slice(0, landLimit)).map((item: typeDanhSachSanPham, index: number) => (
            <div key={index} className="location-item">
              <a href="#" className="location-link">
                {item.tenPhanLoai}
              </a>
              <span className="location-count">({item.soSanPham})</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <h6 className="sidebar-title" style={{cursor: 'pointer'}} onClick={() => setShowAllApartment(v => !v)}>
          Chung cư - căn hộ {canHoChungCuDucHoaLongAns.length > apartmentLimit && (showAllApartment ? "▲" : "▼")}
        </h6>
        <div className="location-list">
          {(showAllApartment ? canHoChungCuDucHoaLongAns : canHoChungCuDucHoaLongAns.slice(0, apartmentLimit)).map((item: typeDanhSachSanPham, index: number) => (
            <div key={index} className="location-item">
              <a href="#" className="location-link">
                {item.tenPhanLoai}
              </a>
              <span className="location-count">({item.soSanPham})</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <h6 className="sidebar-title" style={{cursor: 'pointer'}} onClick={() => setShowAllRent(v => !v)}>
          Cho thuê - kinh doanh - nhà trọ {relatedProperties.length > rentLimit && (showAllRent ? "▲" : "▼")}
        </h6>
        <div className="location-list">
          {(showAllRent ? relatedProperties : relatedProperties.slice(0, rentLimit)).map((property: string, index: number) => (
            <div key={index} className="location-item">
              <a href="#" className="location-link">
                {property}
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <h6 className="sidebar-title" style={{cursor: 'pointer'}} onClick={() => setShowAllPolicy(v => !v)}>
          Chính sách - quy quạch {supportServices.length > policyLimit && (showAllPolicy ? "▲" : "▼")}
        </h6>
        <div className="location-list">
          {(showAllPolicy ? supportServices : supportServices.slice(0, policyLimit)).map((service: string, index: number) => (
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
