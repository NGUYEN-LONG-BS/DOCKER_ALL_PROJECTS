import type React from "react"

const LogoComponent: React.FC = () => {
  return (
    <a className="navbar-brand d-flex align-items-center" href="#">
      <div className="logo-container d-flex align-items-center">
        <div className="logo-icon me-2">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M8 24C8 20.6863 10.6863 18 14 18H18C21.3137 18 24 20.6863 24 24V26H8V24Z" fill="#28a745" />
            <path
              d="M16 16C18.2091 16 20 14.2091 20 12C20 9.79086 18.2091 8 16 8C13.7909 8 12 9.79086 12 12C12 14.2091 13.7909 16 16 16Z"
              fill="#28a745"
            />
            <path
              d="M6 12C6 8.68629 8.68629 6 12 6H20C23.3137 6 26 8.68629 26 12V14H6V12Z"
              fill="#28a745"
              opacity="0.6"
            />
          </svg>
        </div>
        <span className="logo-text fw-bold fs-4" style={{ color: "#dc3545" }}>
          BOMBIG
        </span>
      </div>
    </a>
  )
}

export default LogoComponent
