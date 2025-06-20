// utils/useUserId.ts
import { useAppSelector } from "@/store/store"; // Sử dụng useAppSelector thay vì useSelector

export const useUserId = () => {
  const userId = useAppSelector((state) => state.user.userId); // Truy cập trực tiếp userId từ Redux state
  console.log("Current userId in Redux:", userId); // Log userId để kiểm tra
  return userId || 'unknown'; // Trả về userId hoặc giá trị mặc định 'unknown'
};