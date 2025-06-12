"use client"

import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    // Xóa cookie xác thực (nếu dùng cookie)
    // Chỉ xóa được cookie nếu cookie không có httpOnly, hoặc dùng API logout server-side
    document.cookie = "isAuthenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    // Có thể thêm các bước xóa localStorage/sessionStorage nếu cần
    // localStorage.removeItem('token')
    // sessionStorage.removeItem('token')
    router.push("/login")
  }

  return (
    <button className="btn btn-link nav-link" onClick={handleLogout} style={{cursor: 'pointer'}}>
      Logout
    </button>
  )
}
