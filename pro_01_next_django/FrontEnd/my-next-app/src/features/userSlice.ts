import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  isAuthenticated: boolean;
  userInfo: any; // Bạn có thể thay bằng kiểu dữ liệu user thực tế
  userId: string | null; // Thêm userId để lưu ID người dùng
}

const initialState: UserState = {
  isAuthenticated: false,
  userInfo: null,
  userId: null, // Khởi tạo userId là null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
      state.userId = action.payload.userId; // Lưu userId khi đăng nhập
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userInfo = null;
      state.userId = null; // Xóa userId khi đăng xuất
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
