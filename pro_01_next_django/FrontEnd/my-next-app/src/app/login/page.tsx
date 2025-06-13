// Khai báo đây là Client Component để sử dụng các tính năng phía client như hooks
"use client"

import type React from "react" // Nhập type React để định kiểu cho TypeScript
import { useState, useEffect } from "react" // Nhập useState, useEffect để quản lý trạng thái và hiệu ứng
import Image from "next/image" // Nhập Image từ Next.js để hiển thị hình ảnh tối ưu
import Link from "next/link" // Nhập Link từ Next.js để điều hướng phía client
import { useRouter } from "next/navigation" // Nhập useRouter để xử lý điều hướng
import "bootstrap/dist/css/bootstrap.min.css" // Nhập CSS của Bootstrap để định dạng giao diện
import { API_CHECK_LOGIN } from "@/api/api"

// Định nghĩa component LoginPage
export default function LoginPage() {
  // Khởi tạo trạng thái cho form
  const [isLogin, setIsLogin] = useState(true) // Quản lý chế độ: true (đăng nhập), false (đăng ký)
  const [loginId, setLoginId] = useState("") // Lưu giá trị tên đăng nhập hoặc email
  const [password, setPassword] = useState("") // Lưu giá trị mật khẩu
  const [name, setName] = useState("") // Lưu giá trị họ tên (dùng khi đăng ký)
  const [showPassword, setShowPassword] = useState(false) // Quản lý trạng thái hiển thị/ẩn mật khẩu
  const [error, setError] = useState("") // Lưu thông báo lỗi nếu đăng nhập thất bại

  // Hàm kiểm tra thông tin đăng nhập bằng cách gọi API
  const checkLogin = async (loginId: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(API_CHECK_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login_id: loginId,
          pass_field: password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Lỗi khi gọi API")
      }

      return data.result // Trả về true nếu thông tin đăng nhập hợp lệ, false nếu không
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Đã có lỗi xảy ra. Vui lòng thử lại."
      setError(errorMessage)
      return false
    }
  }

  // Hàm xử lý khi submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Ngăn chặn hành vi mặc định của form (tải lại trang)
    setError("")
    // In dữ liệu form ra console để kiểm tra
    console.log(isLogin ? "Login" : "Subscribe", { loginId, password, name })

    // Ghi log loginId và password
    console.log("Login Info:", { loginId, password })

    // Nếu ở chế độ đăng nhập, chuyển hướng đến trang inventory-management
    if (isLogin) {
      // Kiểm tra thông tin đăng nhập
      const isValid = await checkLogin(loginId, password)

      if (isValid) {
        // Nếu đăng nhập thành công, set cookie isAuthenticated=true cho middleware đọc được
        document.cookie = "isAuthenticated=true; path=/; max-age=86400";
        // Lưu user_id vào localStorage để Navbar dùng fetch quyền
        if (typeof window !== 'undefined') {
          localStorage.setItem('user_id', loginId);
        }
        // Chuyển hướng đến trang inventory-management (full reload để middleware chạy)
        window.location.href = "/home";
      } else {
        // Nếu đăng nhập thất bại, hiển thị lỗi
        setError("Tên đăng nhập hoặc mật khẩu không đúng.")
      }
    } else {
      // Xử lý đăng ký (chưa triển khai API đăng ký)
      // console.log("Đăng ký:", { name, loginId, password })
      console.log("Đăng ký")
      // Bạn có thể thêm logic gọi API đăng ký ở đây
    }
  }

  // Ẩn popup sau 3 giây nếu có lỗi
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError("") , 3000)
      return () => clearTimeout(timer)
    }
  }, [error])

  // Thêm style cho hiệu ứng fade in/out
  if (typeof window !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = `
      .fade-popup-in { opacity: 1; transition: opacity 0.5s; }
      .fade-popup-out { opacity: 0; transition: opacity 0.5s; }
    `;
    document.head.appendChild(style);
  }

  return (
    // Container chính chiếm toàn bộ chiều cao màn hình
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Phần hiển thị hình ảnh (chỉ hiển thị trên màn hình lớn hơn md) */}
        <div className="col-md-6 d-none d-md-flex bg-primary p-0 position-relative">
          {/* Hình ảnh nền, sử dụng Next.js Image để tối ưu */}
          <Image
            src="/images/loginVisual.jpg" // Đường dẫn đến hình ảnh trong thư mục public
            alt="Login visual" // Văn bản mô tả cho hình ảnh
            fill // Chiếm toàn bộ không gian của div cha
            style={{ objectFit: "cover" }} // Đảm bảo hình ảnh bao phủ toàn bộ khu vực
            priority // Tải hình ảnh trước để ưu tiên hiển thị
          />
          {/* Văn bản chào mừng nằm ở góc dưới */}
          <div className="position-absolute text-white p-5" style={{ bottom: 0, zIndex: 1 }}>
            <h2 className="fw-bold">Welcome to TUAN AN GROUP</h2>
            <p className="lead">Đồng Hành Cùng Thành Công Của Khách Hàng</p>
          </div>
          {/* Lớp phủ tối để làm nổi bật văn bản */}
          <div className="position-absolute bg-dark w-100 h-100" style={{ opacity: 0.3 }}></div>
        </div>

        {/* Phần form đăng nhập/đăng ký */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          {/* Card chứa form, có bóng và padding */}
          <div className="card border-0 shadow-sm p-4 w-100" style={{ maxWidth: "450px" }}>
            <div className="card-body">
              {/* Tiêu đề và mô tả của form */}
              <div className="text-center mb-4">
                <h1 className="h3 fw-bold">{isLogin ? "Login" : "Create Account"}</h1>
                <p className="text-muted">
                  {isLogin ? "Sign in to access your account" : "Subscribe to get started with our service"}
                </p>
              </div>

              {/* Hiển thị thông báo lỗi dạng popup nếu có */}
              {error && (
                <div
                  style={{
                    position: 'fixed',
                    top: 32,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 9999,
                    minWidth: 260,
                    background: '#ffebee',
                    color: '#c0392b',
                    border: '1px solid #e57373',
                    borderRadius: 12,
                    padding: '12px 32px',
                    fontWeight: 600,
                    fontSize: 15,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
                    textAlign: 'center',
                    opacity: 1,
                    transition: 'opacity 0.5s',
                    pointerEvents: 'none',
                  }}
                  className={error ? 'fade-popup-in' : 'fade-popup-out'}
                  role="alert"
                >
                  {error}
                </div>
              )}

              {/* Form xử lý đăng nhập hoặc đăng ký */}
              <form onSubmit={handleSubmit}>
                {/* Trường nhập họ tên, chỉ hiển thị khi đăng ký */}
                {!isLogin && (
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)} // Cập nhật trạng thái name
                      required
                    />
                  </div>
                )}

                {/* Trường nhập tên đăng nhập hoặc email */}
                <div className="mb-3">
                  <label htmlFor="loginId" className="form-label">
                    {isLogin ? "Username or Email" : "Email address"}
                  </label>
                  <input
                    type={isLogin ? "text" : "email"} // text cho đăng nhập, email cho đăng ký
                    className="form-control"
                    id="loginId"
                    placeholder={isLogin ? "Enter your username or email" : "Enter your email"}
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)} // Cập nhật trạng thái loginId
                    required
                  />
                </div>

                {/* Trường nhập mật khẩu */}
                <div className="mb-4 position-relative">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"} // Hiển thị hoặc ẩn mật khẩu
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} // Cập nhật trạng thái password
                      required
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)} // Chuyển đổi trạng thái showPassword
                      // aria-label={showPassword ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"} // Hỗ trợ trợ năng
                    >
                      {showPassword ? (
                        // Biểu tượng "eye-slash" khi mật khẩu hiển thị
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye-slash"
                          viewBox="0 0 16 16"
                        >
                          {/* Vẽ viền ngoài của mắt và một phần đường gạch chéo */}
                          <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                          {/* Vẽ phần đồng tử và tương tác với đường gạch chéo */}
                          <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                          {/* Hoàn thiện viền mắt và vẽ đường gạch chéo */}
                          <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                        </svg>
                      ) : (
                        // Biểu tượng "eye" khi mật khẩu ẩn
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye"
                          viewBox="0 0 16 16"
                        >
                          {/* Vẽ viền ngoài của mắt */}
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                          {/* Vẽ đồng tử */}
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Các tùy chọn bổ sung chỉ hiển thị ở chế độ đăng nhập */}
                {isLogin && (
                  <div className="d-flex justify-content-between mb-4">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="remember" />
                      <label className="form-check-label" htmlFor="remember">
                        Remember me
                      </label>
                    </div>
                    <Link href="#" className="text-decoration-none">
                      Forgot password?
                    </Link>
                  </div>
                )}

                {/* Nút submit form */}
                <button type="submit" className="btn btn-primary w-100 py-2 mb-3">
                  {isLogin ? "Sign In" : "Create Account"}
                </button>

                {/* Liên kết chuyển đổi giữa đăng nhập và đăng ký */}
                <div className="text-center">
                  <p>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <a
                      href="#"
                      className="text-decoration-none"
                      onClick={(e) => {
                        e.preventDefault() // Ngăn tải lại trang
                        setIsLogin(!isLogin) // Chuyển đổi chế độ đăng nhập/đăng ký
                      }}
                    >
                      {isLogin ? "Sign up" : "Sign in"}
                    </a>
                  </p>
                </div>
              </form>

              {/* Dòng phân cách cho tùy chọn đăng nhập bằng mạng xã hội */}
              <div className="my-4 d-flex align-items-center">
                <hr className="flex-grow-1" />
                <span className="px-2 text-muted">or continue with</span>
                <hr className="flex-grow-1" />
              </div>

              {/* Nút đăng nhập bằng Google và Facebook */}
              <div className="d-grid gap-2">
                <button className="btn btn-outline-secondary">
                  {/* Biểu tượng Google */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-google me-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                  </svg>
                  Google
                </button>
                <button className="btn btn-outline-secondary">
                  {/* Biểu tượng Facebook */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-facebook me-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                  Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
