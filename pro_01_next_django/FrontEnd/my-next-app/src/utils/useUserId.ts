// utils/useUserId.ts
import { useAppSelector } from "@/store/store"; // Sử dụng useAppSelector thay vì useSelector

export const useUserId = () => {
  const userId = useAppSelector((state) => state.user.userId);
  if (userId) {
    return userId;
  }
  // Nếu Redux chưa có userId, lấy từ localStorage
  if (typeof window !== 'undefined') {
    const localUserId = localStorage.getItem('user_id');
    if (localUserId) {
      return localUserId;
    }
  }
  return 'unknown';
};