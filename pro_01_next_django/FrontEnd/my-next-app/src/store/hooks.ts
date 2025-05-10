import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';   // Import hooks cơ bản từ react-redux
import type { RootState, AppDispatch } from './store';   // Import các kiểu type của RootState và AppDispatch từ file store.ts

// Tạo custom hook cho dispatch với type an toàn
// Giúp bạn có thể dùng `dispatch(someAction())` mà có IntelliSense và kiểm tra type
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Tạo custom hook cho selector với type an toàn
// Giúp bạn có thể dùng `useAppSelector(state => state.product)` và được gợi ý đầy đủ
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;