// utils/useUserId.ts
import { useSelector } from 'react-redux';

export const useUserId = () => {
  const userInfo = useSelector((state: any) => state.user.userInfo);
  console.log("Current userInfo in Redux:", userInfo); // Log userInfo for debugging
  console.log("Does userInfo contain userId?", userInfo?.userId ? "Yes" : "No"); // Check if userId exists
  return userInfo?.userId || 'unknown'; // Return user ID or fallback to "unknown"
};