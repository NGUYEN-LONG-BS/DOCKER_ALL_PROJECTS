"use client"

import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/store/store";
import { logout } from "@/features/userSlice";
import { resetReduxStore } from "@/utils/resetReduxStore";

export default function LogoutButton() {
  const router = useRouter()
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    // Xóa cookie xác thực (nếu dùng cookie)
    document.cookie = "isAuthenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    // Xoá toàn bộ Redux store về initialState
    resetReduxStore();
    dispatch(logout()); // Reset userId trong Redux
    // Có thể thêm các bước xóa localStorage/sessionStorage nếu cần
    // localStorage.removeItem('token')
    // sessionStorage.removeItem('token')
    router.push("/login")
  }

  return (
    <button
      className="logout-btn-custom"
      onClick={handleLogout}
      style={{
        background: '#ffe5e5', // đỏ nhạt
        color: '#c0392b', // chữ đỏ đậm
        border: 'none',
        borderRadius: '20px',
        padding: '6px 20px',
        fontWeight: 600,
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        transition: 'background 0.2s',
        cursor: 'pointer',
        marginLeft: 8
      }}
      onMouseOver={e => (e.currentTarget.style.background = '#ffd6d6')}
      onMouseOut={e => (e.currentTarget.style.background = '#ffe5e5')}
    >
      Logout
    </button>
  )
}
