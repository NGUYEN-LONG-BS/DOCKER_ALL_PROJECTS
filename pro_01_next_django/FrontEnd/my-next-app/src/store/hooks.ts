// src/store/hooks.ts
// 1 file hooks.ts để định nghĩa các custom hooks useAppDispatch và useAppSelector.
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store'; // Import từ file store.ts

// Custom hook cho dispatch với type an toàn
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom hook cho selector với type an toàn
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
