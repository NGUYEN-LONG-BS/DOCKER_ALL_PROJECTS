"use client";
import React, { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from 'react-redux';
import { logout } from '@/features/userSlice';

interface UserInactivityProviderProps {
  children: React.ReactNode;
  timeoutMinutes?: number; // default 10
}

const UserInactivityProvider: React.FC<UserInactivityProviderProps> = ({ children, timeoutMinutes = 10 }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Hàm sign out
  const handleSignOut = () => {
    // Xóa thông tin đăng nhập ở localStorage/sessionStorage nếu có
    // localStorage.removeItem('user');
    // Xóa cookie isAuthenticated để middleware chặn truy cập
    document.cookie = 'isAuthenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    dispatch(logout()); // Redux: clear user info toàn app
    router.push("/login");
    // alert("Bạn đã bị đăng xuất do không hoạt động trong " + timeoutMinutes + " phút.");
  };

  // Reset timer mỗi khi có thao tác
  const resetInactivityTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      handleSignOut();
    }, timeoutMinutes * 60 * 1000);
  };

  useEffect(() => {
    // Lắng nghe sự kiện hoạt động của user trên toàn app
    resetInactivityTimer();
    const events = ["mousemove", "keydown", "mousedown", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetInactivityTimer));
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      events.forEach((event) => window.removeEventListener(event, resetInactivityTimer));
    };
    // eslint-disable-next-line
  }, []);

  return <>{children}</>;
};

export default UserInactivityProvider;
