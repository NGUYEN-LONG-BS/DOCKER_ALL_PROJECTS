// utils/useUserId.ts
import { useSelector } from 'react-redux';

export const useUserId = () => {
  const userInfo = useSelector((state: any) => state.user.userInfo);
  return userInfo?.userId || 'unknown'; // Return user ID or fallback to "unknown"
};