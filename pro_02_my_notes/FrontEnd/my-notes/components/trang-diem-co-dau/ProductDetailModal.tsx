"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import type { Product } from "@/types/trang-diem-co-dau"

interface ProductDetailModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onAddToCart: (product: Product, quantity: number, note: string) => void
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState<number>(1)
  const [note, setNote] = useState<string>("")
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)

  // Sample additional images for demo
  const additionalImages = [
    "/trang-diem-co-dau/placeholder.svg?height=150&width=150",
    "/trang-diem-co-dau/placeholder.svg?height=150&width=150",
    "/trang-diem-co-dau/placeholder.svg?height=150&width=150",
    "/trang-diem-co-dau/placeholder.svg?height=150&width=150",
    "/trang-diem-co-dau/placeholder.svg?height=150&width=150",
    "/trang-diem-co-dau/placeholder.svg?height=150&width=150",
  ]

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 100) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      onAddToCart(product, quantity, note)
      onClose()
    }
  }

  const handleContact = () => {
    // Implement contact functionality
    console.log("Contact for product:", product?.id)
    alert("Chức năng liên hệ sẽ được triển khai!")
  }

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("vi-VN").format(price) + " đ"
  }

  const getTotalPrice = (): number => {
    return product ? product.price * quantity : 0
  }

  if (!isOpen || !product) return null

  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div className="product-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        {/* Modal Header - Product Image */}
        <div className="modal-header-custom">
          <Image
            src={product.image || "/trang-diem-co-dau/placeholder.svg"}
            alt={product.title}
            width={600}
            height={400}
            className="product-image-main"
          />
        </div>

        {/* Modal Body */}
        <div className="modal-body-custom">
          <h2 className="product-title-modal">{product.title}</h2>

          <div className="product-control">
            <div className="price-box">
              <span className="current-price">{formatPrice(product.price)}</span>
            </div>

            <div className="quantity-control">
              <button
                className="quantity-btn minus"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                className="quantity-input"
                type="number"
                min="1"
                max="100"
                value={quantity}
                onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value) || 1)}
              />
              <button
                className="quantity-btn plus"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= 100}
              >
                +
              </button>
            </div>
          </div>

          <p className="product-description">
            Trang điểm cô dâu siêu nhẹ nhàng, khôi đầu cho muôn vàn may mắn, lưu giữ khoảnh khắc thiêng thần của thanh
            xuân. Nàng dâu vô cùng hài lòng, tự tin, tươi tắn.
          </p>
        </div>

        {/* Notes Section */}
        <div className="note-section">
          <p className="note-title">GHI CHÚ</p>
          <textarea
            className="note-textarea"
            placeholder="Nhập thông tin cần lưu ý..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {/* Additional Images Gallery */}
        <div className="image-gallery">
          {additionalImages.map((img, index) => (
            <Image
              key={index}
              src={img || "/trang-diem-co-dau/placeholder.svg"}
              alt={`${product.title} ${index + 1}`}
              width={120}
              height={120}
              className={`gallery-image ${selectedImageIndex === index ? "active" : ""}`}
              onClick={() => setSelectedImageIndex(index)}
            />
          ))}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer-custom">
          <div className="total-price">
            <span className="total-label">Thành tiền</span>
            <span className="total-amount">{formatPrice(getTotalPrice())}</span>
          </div>

          <div className="modal-actions">
            <button className="btn-contact" onClick={handleContact}>
              Liên hệ ngay
            </button>
            <button className="btn-add-cart" onClick={handleAddToCart}>
              <i className="fas fa-shopping-cart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailModal
