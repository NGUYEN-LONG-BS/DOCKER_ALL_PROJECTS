// src/components/ReduxProvider.tsx

// 1. Mục đích

// * Tệp này định nghĩa một component React tên là ReduxProvider, 
// có nhiệm vụ bao bọc các component con (children) bằng <Provider> từ react-redux.

// * <Provider> là một thành phần quan trọng trong Redux, giúp kết nối Redux store với cây component React, 
// cho phép các component truy cập store thông qua các hook như useAppDispatch và useAppSelector.

"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}