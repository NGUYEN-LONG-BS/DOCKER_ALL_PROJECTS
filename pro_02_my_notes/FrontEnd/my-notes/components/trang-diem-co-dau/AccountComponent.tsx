"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

interface AccountComponentProps {
  isLoggedIn?: boolean
  userName?: string
  onLogin?: () => void
  onLogout?: () => void
}

const AccountComponent: React.FC<AccountComponentProps> = ({
  isLoggedIn = false,
  userName = "",
  onLogin,
  onLogout,
}) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const accountRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleAccountClick = () => {
    if (isLoggedIn) {
      setShowDropdown(!showDropdown)
    } else {
      if (onLogin) {
        onLogin()
      }
    }
  }

  const handleLogout = () => {
    setShowDropdown(false)
    if (onLogout) {
      onLogout()
    }
  }

  return (
    <div className="account-section me-4 position-relative" ref={accountRef}>
      <div className="d-flex align-items-center" onClick={handleAccountClick} style={{ cursor: "pointer" }}>
        <i className="fas fa-user-circle fs-5 me-2 text-danger"></i>
        <div className="account-text">
          {isLoggedIn ? (
            <>
              <div className="account-login">
                <span className="text-danger small">Xin chào, {userName}</span>
              </div>
              <div className="account-dropdown d-flex align-items-center">
                <span className="small text-muted">Tài khoản</span>
                <i className="fas fa-chevron-down ms-1 small text-muted"></i>
              </div>
            </>
          ) : (
            <>
              <div className="account-login">
                <span className="text-danger small">Đăng nhập / Đăng ký</span>
              </div>
              <div className="account-dropdown d-flex align-items-center">
                <span className="small text-muted">Tài khoản</span>
                <i className="fas fa-chevron-down ms-1 small text-muted"></i>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Dropdown Menu */}
      {showDropdown && isLoggedIn && (
        <div
          className="account-dropdown-menu position-absolute bg-white shadow rounded mt-2 py-2"
          style={{
            top: "100%",
            right: "0",
            minWidth: "200px",
            zIndex: 1100,
            border: "1px solid #dee2e6",
          }}
        >
          <a href="#" className="dropdown-item px-3 py-2 d-block text-decoration-none text-dark">
            <i className="fas fa-user me-2"></i>
            Thông tin cá nhân
          </a>
          <a href="#" className="dropdown-item px-3 py-2 d-block text-decoration-none text-dark">
            <i className="fas fa-shopping-bag me-2"></i>
            Đơn hàng của tôi
          </a>
          <a href="#" className="dropdown-item px-3 py-2 d-block text-decoration-none text-dark">
            <i className="fas fa-heart me-2"></i>
            Yêu thích
          </a>
          <hr className="my-1" />
          <button
            className="dropdown-item px-3 py-2 d-block w-100 text-start border-0 bg-transparent text-danger"
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt me-2"></i>
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  )
}

export default AccountComponent
