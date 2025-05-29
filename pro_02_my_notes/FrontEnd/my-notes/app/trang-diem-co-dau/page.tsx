"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { products, features, navigationItems } from "@/data/trang-diem-co-dau/products"
import type { Product } from "@/types/trang-diem-co-dau"
import LogoComponent from "@/components/trang-diem-co-dau/LogoComponent"
import SearchFilterComponent from "@/components/trang-diem-co-dau/SearchFilterComponent"
import AccountComponent from "@/components/trang-diem-co-dau/AccountComponent"
import CartComponent from "@/components/trang-diem-co-dau/CartComponent"
import NavigationComponent from "@/components/trang-diem-co-dau/NavigationComponent"
import ProductDetailModal from "@/components/trang-diem-co-dau/ProductDetailModal"
import "./styles.css"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  note?: string
}

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [email, setEmail] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [userName, setUserName] = useState<string>("Nguyễn Văn A")
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Cô dâu lung linh",
      price: 500000,
      quantity: 1,
      image: "/trang-diem-co-dau/placeholder.svg?height=50&width=50",
    },
  ])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const productsPerPage = 8

  // Filter products based on search term
  const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()))

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Newsletter subscription:", email)
    setEmail("")
    alert("Đăng ký thành công!")
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    setCurrentPage(1) // Reset to first page when searching
  }

  const handleFilter = () => {
    console.log("Filter clicked")
    // Implement filter logic here
  }

  const handleLogin = () => {
    console.log("Login clicked")
    // Implement login logic here
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    console.log("Logout clicked")
    setIsLoggedIn(false)
  }

  const handleCartClick = () => {
    console.log("Cart clicked")
    // Implement cart navigation here
  }

  const handleRemoveCartItem = (itemId: number) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId))
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const handleAddToCart = (product: Product, quantity: number, note: string) => {
    const existingItem = cartItems.find((item) => item.id === product.id)

    if (existingItem) {
      // Update existing item
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                note: note || item.note,
              }
            : item,
        ),
      )
    } else {
      // Add new item
      const newItem: CartItem = {
        id: product.id,
        name: product.title,
        price: product.price,
        quantity,
        image: product.image,
        note,
      }
      setCartItems([...cartItems, newItem])
    }

    alert(`Đã thêm ${product.title} vào giỏ hàng!`)
  }

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("vi-VN").format(price) + " đ"
  }

  return (
    <>
      {/* Bootstrap CSS */}
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />

      <div className="min-vh-100">
        {/* Header */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
          <div className="container">
            <div className="row w-100 align-items-center">
              {/* Logo */}
              <div className="col-lg-2 col-md-3">
                <LogoComponent />
              </div>

              {/* Search Bar */}
              <div className="col-lg-6 col-md-5">
                <SearchFilterComponent onSearch={handleSearch} onFilter={handleFilter} />
              </div>

              {/* Right side - Account and Cart */}
              <div className="col-lg-4 col-md-4">
                <div className="d-flex align-items-center justify-content-end">
                  {/* Account Section */}
                  <AccountComponent
                    isLoggedIn={isLoggedIn}
                    userName={userName}
                    onLogin={handleLogin}
                    onLogout={handleLogout}
                  />

                  {/* Cart Section */}
                  <CartComponent
                    cartItems={cartItems}
                    onCartClick={handleCartClick}
                    onRemoveItem={handleRemoveCartItem}
                  />
                </div>
              </div>
            </div>

            {/* Mobile toggle */}
            <button
              className="navbar-toggler d-lg-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>

        {/* Navigation Menu - Now using the NavigationComponent */}
        <NavigationComponent items={navigationItems} />

        {/* Hero Banner */}
        <section className="hero-banner">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1 className="display-4 fw-bold mb-4">Dịch Vụ Trang Điểm Chuyên Nghiệp</h1>
                <p className="lead">Tạo nên vẻ đẹp hoàn hảo cho những khoảnh khắc đặc biệt</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-5">
          <div className="container">
            <div className="row">
              {features.map((feature) => (
                <div key={feature.id} className="col-lg-3 col-md-6">
                  <div className="feature-card">
                    <div className="feature-icon">{feature.icon}</div>
                    <h5 className="feature-title">{feature.title}</h5>
                    <p className="text-muted">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-5">
          <div className="container">
            <h2 className="section-title">CÁC NÀNG THƠ CỦA CHÚNG MÌNH</h2>
            {searchTerm && (
              <p className="text-center text-muted mb-4">
                Tìm thấy {filteredProducts.length} kết quả cho "{searchTerm}"
              </p>
            )}
            <div className="row">
              {currentProducts.map((product: Product) => (
                <div key={product.id} className="col-lg-3 col-md-6">
                  <div className="product-card" onClick={() => handleProductClick(product)}>
                    <Image
                      src={product.image || "/trang-diem-co-dau/placeholder.svg"}
                      alt={product.title}
                      width={300}
                      height={250}
                      className="product-image"
                    />
                    <div className="product-info">
                      <h5 className="product-title">{product.title}</h5>
                      <p className="product-price">{formatPrice(product.price)}</p>
                      <button className="btn btn-detail">
                        <i className="fas fa-eye me-2"></i>
                        CHI TIẾT
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination-container">
                <nav>
                  <ul className="pagination">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                        <button className="page-link" onClick={() => handlePageChange(page)}>
                          {page}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="newsletter-section">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h3 className="newsletter-title">ĐĂNG KÝ NHẬN TIN</h3>
                <p className="text-muted mb-4">Nhận thông tin về các dịch vụ mới nhất</p>
                <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Nhập email của bạn..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button className="btn btn-subscribe" type="submit">
                      ĐĂNG KÝ
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 mb-4">
                <h5>VỀ CHÚNG TÔI</h5>
                <p className="text-muted">
                  BOMBIG là studio trang điểm chuyên nghiệp với đội ngũ makeup artist giàu kinh nghiệm, mang đến vẻ đẹp
                  hoàn hảo cho mọi khách hàng.
                </p>
                <div className="social-icons">
                  <a href="#">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-tiktok"></i>
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <h5>LIÊN KẾT</h5>
                <a href="#">Về chúng tôi</a>
                <a href="#">Dịch vụ</a>
                <a href="#">Bảng giá</a>
                <a href="#">Liên hệ</a>
                <a href="#">Blog</a>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <h5>DANH MỤC</h5>
                <a href="#">Cô dâu</a>
                <a href="#">Sự kiện</a>
                <a href="#">Đi tệc - Đi chơi</a>
                <a href="#">Kỷ yếu - Tốt nghiệp</a>
                <a href="#">Mẫu ảnh - Thời trang</a>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <h5>LIÊN HỆ</h5>
                <p className="text-muted">
                  <i className="fas fa-map-marker-alt me-2"></i>
                  123 Đường ABC, Quận 1, TP.HCM
                </p>
                <p className="text-muted">
                  <i className="fas fa-phone me-2"></i>
                  0123 456 789
                </p>
                <p className="text-muted">
                  <i className="fas fa-envelope me-2"></i>
                  info@bombig.com
                </p>
              </div>
            </div>
            <div className="copyright">
              <p>&copy; 2024 BOMBIG. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Product Detail Modal */}
        <ProductDetailModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
        />
      </div>

      {/* Bootstrap JS */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" async></script>
    </>
  )
}

export default Dashboard
