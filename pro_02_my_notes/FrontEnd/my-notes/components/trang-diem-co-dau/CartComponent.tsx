"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface CartComponentProps {
  cartItems?: CartItem[]
  onCartClick?: () => void
  onRemoveItem?: (itemId: number) => void
}

const CartComponent: React.FC<CartComponentProps> = ({ cartItems = [], onCartClick, onRemoveItem }) => {
  const [showCartDropdown, setShowCartDropdown] = useState<boolean>(false)
  const cartRef = useRef<HTMLDivElement>(null)

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setShowCartDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleCartClick = () => {
    setShowCartDropdown(!showCartDropdown)
    if (onCartClick) {
      onCartClick()
    }
  }

  const handleRemoveItem = (itemId: number) => {
    if (onRemoveItem) {
      onRemoveItem(itemId)
    }
  }

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("vi-VN").format(price) + " đ"
  }

  return (
    <div className="cart-section-new d-flex align-items-center position-relative" ref={cartRef}>
      <div className="d-flex align-items-center" onClick={handleCartClick} style={{ cursor: "pointer" }}>
        <div className="cart-icon-new position-relative me-2">
          <i className="fas fa-shopping-cart fs-5"></i>
          <span className="cart-badge-new">{totalItems}</span>
        </div>
        <span className="cart-text">Giỏ hàng</span>
      </div>

      {/* Cart Dropdown */}
      {showCartDropdown && cartItems.length > 0 && (
        <div
          className="cart-dropdown-menu position-absolute bg-white shadow rounded mt-2 p-3"
          style={{
            top: "100%",
            right: "0",
            minWidth: "350px",
            maxHeight: "400px",
            overflowY: "auto",
            zIndex: 1100,
            border: "1px solid #dee2e6",
          }}
        >
          <h6 className="fw-bold mb-3">Giỏ hàng của bạn</h6>

          {cartItems.map((item) => (
            <div key={item.id} className="cart-item d-flex align-items-center mb-3 pb-3 border-bottom">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="cart-item-image me-3"
                style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }}
              />
              <div className="cart-item-info flex-grow-1">
                <h6 className="mb-1 small">{item.name}</h6>
                <p className="mb-1 small text-muted">Số lượng: {item.quantity}</p>
                <p className="mb-0 small text-danger fw-bold">{formatPrice(item.price * item.quantity)}</p>
              </div>
              <button className="btn btn-sm btn-outline-danger" onClick={() => handleRemoveItem(item.id)}>
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))}

          <div className="cart-total mt-3 pt-3 border-top">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-bold">Tổng cộng:</span>
              <span className="fw-bold text-danger fs-5">{formatPrice(totalPrice)}</span>
            </div>
            <div className="d-grid gap-2">
              <button className="btn btn-danger">Xem giỏ hàng</button>
              <button className="btn btn-outline-danger">Thanh toán</button>
            </div>
          </div>
        </div>
      )}

      {/* Empty Cart Message */}
      {showCartDropdown && cartItems.length === 0 && (
        <div
          className="cart-dropdown-menu position-absolute bg-white shadow rounded mt-2 p-3 text-center"
          style={{
            top: "100%",
            right: "0",
            minWidth: "250px",
            zIndex: 1100,
            border: "1px solid #dee2e6",
          }}
        >
          <i className="fas fa-shopping-cart fs-1 text-muted mb-3"></i>
          <p className="text-muted">Giỏ hàng của bạn đang trống</p>
          <button className="btn btn-danger btn-sm" onClick={() => setShowCartDropdown(false)}>
            Tiếp tục mua sắm
          </button>
        </div>
      )}
    </div>
  )
}

export default CartComponent
